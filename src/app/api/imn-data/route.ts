import { JSDOM } from "jsdom";
import type { IMNData } from "~/types/imn-data";
import { NextRequest } from "next/server";
import places from "~/app/data/places.json";

// Default URL if no place is specified
const DEFAULT_PLACE_ID = "san-vicente-ciudad-quesada";

const BASE_URL = "https://www.imn.ac.cr";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get("placeId") ?? DEFAULT_PLACE_ID;

  const place = places.find((p) => p.id === placeId);

  if (!place) {
    return Response.json({ error: "Place not found" }, { status: 404 });
  }

  const url = `${BASE_URL}${place.tablesURI}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "text/html",
      },
      next: { revalidate: 60 * 10 }, // Revalidate every 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.text();

    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Function to extract table data
    const extractTable = (table: HTMLTableElement) => {
      const rows = Array.from(table.querySelectorAll("tr"));
      if (rows.length === 0) return null;
      const headers = Array.from(rows[0]!.querySelectorAll("th")).map(
        (th) => th.textContent?.trim() ?? "",
      );

      const data = rows.slice(1).map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        return headers.reduce(
          (obj, header, index) => {
            obj[header] = cells[index]?.textContent?.trim() ?? "";
            return obj;
          },
          {} as Record<string, string>,
        );
      });
      return { headers, data };
    };

    // Extract all tables
    const tables = Array.from(document.querySelectorAll("table"));
    const extractedData = tables.map(extractTable);

    const [last24Hours, currentWeatherTable1, currentWeatherTable2] =
      extractedData;

    const currentWeather = {
      temp: currentWeatherTable2?.data[0]?.Temp ?? null,
      min_temp: currentWeatherTable1?.data[0]?.Tmin ?? null,
      max_temp: currentWeatherTable1?.data[0]?.Tmax ?? null,
      precipitation_since_7am: currentWeatherTable1?.data[0]?.SUM_lluv ?? null,
      precipitation_yesterday: currentWeatherTable1?.data[0]?.LLUV_ayer ?? null,
      relative_humidity: currentWeatherTable2?.data[0]?.HR ?? null,
    };

    return Response.json({
      currentWeather,
      last24Hours: last24Hours?.data ?? null,
    } as IMNData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return Response.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
