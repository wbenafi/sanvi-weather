"use client";

import { type IMNData } from "~/types/imn-data";
import useFetchData from "../hooks/useFetchData";
import Loading from "../loading";
import WeatherMainCard from "./weather-main-card";
import { WeatherLastHours } from "./weather-last-hours";

export default function Weather() {
  const { data, loading } = useFetchData<IMNData>("/api/imn-data", {
    cache: "no-store",
  });

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <WeatherMainCard data={data} />
      <WeatherLastHours data={data.last24Hours} />
    </div>
  );
}
