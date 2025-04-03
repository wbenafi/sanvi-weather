"use client";

import { type IMNData } from "~/types/imn-data";
import useFetchData from "../hooks/useFetchData";
import WeatherMainCard from "./weather-main-card";
import { WeatherLastHours } from "./weather-last-hours";
import { WeatherMainCardSkeleton } from "./weather-main-card-skeleton";
import { WeatherLastHoursSkeleton } from "./weather-last-hours-skeleton";

export default function Weather() {
  const { data, loading } = useFetchData<IMNData>("/api/imn-data", {
    cache: "no-store",
  });

  if (!data || loading) {
    return (
      <div className="flex flex-col gap-4">
        <WeatherMainCardSkeleton />
        <WeatherLastHoursSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <WeatherMainCard data={data} />
      <WeatherLastHours data={data.last24Hours} />
    </div>
  );
}
