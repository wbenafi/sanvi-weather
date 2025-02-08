
import { JSDOM } from 'jsdom'
import type { IMNData } from '~/types/imn-data'

const IMN_TABLE_URL = "https://www.imn.ac.cr/especial/tablas/sanvicente.html"

export async function GET() {
  const res = await fetch(IMN_TABLE_URL, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
  
  const data = await res.text()
  
  const dom = new JSDOM(data)
  const document = dom.window.document
  
  // Function to extract table data
  const extractTable = (table: HTMLTableElement) => {
    const rows = Array.from(table.querySelectorAll("tr"));
    if (rows.length === 0) return null;
    const headers = Array.from(rows[0]!.querySelectorAll("th")).map(th => th.textContent?.trim() ?? "");
    
    const data = rows.slice(1).map(row => {
      const cells = Array.from(row.querySelectorAll("td"));
      return headers.reduce((obj, header, index) => {
        obj[header] = cells[index]?.textContent?.trim() ?? "";
        return obj;
      }, {} as Record<string, string>);
    });
    return { headers, data };
  };
  
  // Extract all tables
  const tables = Array.from(document.querySelectorAll("table"));
  const extractedData = tables.map(extractTable);
  
  const [
    last24Hours,
    currentWeatherTable1,
    currentWeatherTable2,
  ] = extractedData;

  const currentWeather = {
    temp: currentWeatherTable2?.data[0]?.Temp ?? null,
    min_temp: currentWeatherTable1?.data[0]?.Tmin ?? null,
    max_temp: currentWeatherTable1?.data[0]?.Tmax ?? null,
    precipitation_since_7am: currentWeatherTable1?.data[0]?.SUM_lluv ?? null,
    precipitation_yesterday: currentWeatherTable1?.data[0]?.LLUV_ayer ?? null,
    relative_humidity: currentWeatherTable2?.data[0]?.HR ?? null,
  }
  
  return Response.json({ currentWeather, last24Hours: last24Hours?.data ?? null } as IMNData)
}