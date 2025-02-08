import { type IMNData } from "~/types/imn-data";

export function getLastHourPrecipitation(
  last24Hours: IMNData["last24Hours"],
): number {
  if (!last24Hours) {
    return 0;
  }

  const lastHour =
    new Date().getMinutes() < 10 ? last24Hours[0] : last24Hours[1];

  return parseFloat(lastHour?.Lluvia ?? "0");
}
