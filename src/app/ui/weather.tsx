"use client";

import { type IMNData } from "~/types/imn-data";
import useFetchData from "../hooks/useFetchData";
import WeatherMainCard from "./weather-main-card";
import { WeatherLastHours } from "./weather-last-hours";
import { WeatherMainCardSkeleton } from "./weather-main-card-skeleton";
import { WeatherLastHoursSkeleton } from "./weather-last-hours-skeleton";
import WeatherStationSelector from "./weather-station-selector";
import places from "../data/places.json";
import { useEffect, useState } from "react";
import { DEFAULT_PLACE_ID } from "~/utils/constants";

export default function Weather() {
  const [selectedPlaceId, setSelectedPlaceId] = useState(DEFAULT_PLACE_ID);
  const [apiUrl, setApiUrl] = useState("/api/imn-data");

  // Fetch data with the current API URL
  const { data, loading } = useFetchData<IMNData>(apiUrl, {
    cache: "no-store",
  });

  // Update API URL when selected place changes
  useEffect(() => {
    const newUrl = selectedPlaceId
      ? `/api/imn-data?placeId=${selectedPlaceId}`
      : "/api/imn-data";

    setApiUrl(newUrl);
  }, [selectedPlaceId]);

  const handlePlaceChange = (placeId: string) => {
    setSelectedPlaceId(placeId);
  };

  // Find the current selected place object
  const currentPlace = selectedPlaceId
    ? places.find((place) => place.id === selectedPlaceId)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <WeatherStationSelector
        selectedPlaceId={selectedPlaceId}
        onPlaceChange={handlePlaceChange}
      />

      {currentPlace && (
        <div className="mb-2 text-sm text-gray-800">
          <h3 className="text-xl font-bold">{currentPlace.name}</h3>
          <h5 className="text-sm text-gray-600">{currentPlace.location}</h5>
        </div>
      )}

      {!data || loading ? (
        <>
          <WeatherMainCardSkeleton />
          <WeatherLastHoursSkeleton />
        </>
      ) : (
        <>
          <WeatherMainCard data={data} />
          <WeatherLastHours data={data.last24Hours} />
        </>
      )}
    </div>
  );
}
