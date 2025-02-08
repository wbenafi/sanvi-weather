import { type IMNData } from "~/types/imn-data";
import { getLastHourPrecipitation } from "~/utils/get-last-hour-precipiration";
import { getWeatherCondition } from "~/utils/get-weather-condition";
import WeatherConditionIcon from "./weather-condition-icon";
import { Droplets, ThermometerIcon, Umbrella } from "lucide-react";
import Card from "./card";

export default function WeatherMainCard({ data }: { data: IMNData }) {
  const lastHourPrecipitation = getLastHourPrecipitation(data.last24Hours);

  const condition = getWeatherCondition(
    lastHourPrecipitation,
    parseFloat(data.currentWeather.relative_humidity ?? "0"),
  );

  return (
    <Card>
      <div className="mb-8 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-bold">
            {data.currentWeather.temp
              ? Math.floor(parseFloat(data.currentWeather.temp))
              : 0}
            °C
          </h2>
          <p className="mt-2 text-2xl text-gray-600">{condition}</p>
        </div>
        <div className="size-36 md:size-20">
          <WeatherConditionIcon condition={condition} />
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <p className="col-span-1 flex items-center text-lg">
          <ThermometerIcon className="mr-2 flex-shrink-0 text-primary" />
          <span>
            Min: <b>{data.currentWeather.min_temp}</b>°C
          </span>
        </p>
        <p className="col-span-1 flex items-center text-lg">
          <ThermometerIcon className="mr-2 flex-shrink-0 text-primary" />{" "}
          <span>
            Max: <b>{data.currentWeather.max_temp}</b>°C
          </span>
        </p>
        <div className="col-span-1 flex items-center text-lg">
          <Droplets className="mr-2 flex-shrink-0 text-primary" size={24} />
          <span>Humedad: {data.currentWeather.relative_humidity}%</span>
        </div>
        <div className="col-span-1 flex items-center text-lg">
          <Umbrella className="mr-2 flex-shrink-0 text-primary" size={24} />
          <span>Lluvia: {data.currentWeather.precipitation_since_7am} mm</span>
        </div>
      </div>
    </Card>
  );
}
