import { type WeatherCondition } from "~/types/weather-condition";

export function getWeatherCondition(
  lastHourPrecipitation: number,
): WeatherCondition {
  if (lastHourPrecipitation === 0) {
    return "Soleado";
  } else if (lastHourPrecipitation > 0 && lastHourPrecipitation <= 1) {
    return "Parcialmente Nublado";
  } else if (lastHourPrecipitation > 1 && lastHourPrecipitation <= 3) {
    return "Nublado";
  } else if (lastHourPrecipitation > 3 && lastHourPrecipitation <= 7) {
    return "Lluvia Ligera";
  } else if (lastHourPrecipitation > 7 && lastHourPrecipitation <= 15) {
    return "Lluvia Moderada";
  } else if (lastHourPrecipitation > 15 && lastHourPrecipitation <= 30) {
    return "Lluvia Intensa";
  } else {
    return "Tormentoso";
  }
}
