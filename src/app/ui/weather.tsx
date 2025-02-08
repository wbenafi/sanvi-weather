"use client";

import { type IMNData } from "~/types/imn-data";
import useFetchData from "../hooks/useFetchData";
import Loading from "../loading";
import WeatherMainCard from "./weather-main-card";

export default function Weather() {
  const { data, loading } = useFetchData<IMNData>("/api/imn-data", {
    cache: "no-store",
  });

  if (!data || loading) {
    return <Loading />;
  }

  return <WeatherMainCard data={data} />;
}
