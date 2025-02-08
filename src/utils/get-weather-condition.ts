import { type WeatherCondition } from "~/types/weather-condition";

/**
 * Determines the current weather condition based on the last hour's precipitation and humidity.
 *
 * @param lastHourPrecipitation - The precipitation in millimeters measured in the last hour.
 * @param humidity - The relative humidity percentage (0 to 100).
 * @returns A string describing the weather condition.
 */
export function getWeatherCondition(lastHourPrecipitation: number, humidity: number): WeatherCondition {
    // Case 1: No measurable precipitation.
    if (lastHourPrecipitation <= 0) {
      // When there is no rain, humidity can help indicate the cloud cover or fog.
      if (humidity < 60) {
        return "Soleado";          // Clear skies with low humidity.
      } else if (humidity < 80) {
        return "Parcialmente Nublado";  // Some clouds, moderate humidity.
      } else {
        return "Nublado";         // Overcast conditions.
      }
    }
    
    // Case 2: Some measurable precipitation.
    else {
      // The precipitation amount determines the base condition.
      if (lastHourPrecipitation <= 3) {
        return "Lluvia Ligera";
      } else if (lastHourPrecipitation <= 7) {
        return "Lluvia Moderada";
      } else if (lastHourPrecipitation <= 30) {
        return "Lluvia Intensa";
      } else {
        return "Tormentoso";  // Extreme precipitation suggests storm conditions.
      }
    }
}