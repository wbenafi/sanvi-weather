"use client";

import { useMemo, useState } from "react";
import places from "../data/places.json";
import { REGION_NAMES } from "~/utils/constants";

interface WeatherStationSelectorProps {
  selectedPlaceId: string;
  onPlaceChange: (placeId: string) => void;
}

export default function WeatherStationSelector({
  selectedPlaceId,
  onPlaceChange,
}: WeatherStationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const availablePlaces = useMemo(
    () => places.filter((place) => place.state === "Activa"),
    [],
  );

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return availablePlaces;
    }

    return availablePlaces.filter((place) => {
      const stationName = place.name.toLowerCase();
      const stationLocation = place.location.toLowerCase();
      const regionName =
        REGION_NAMES[place.region as keyof typeof REGION_NAMES]?.toLowerCase() ??
        "";

      return (
        stationName.includes(normalizedQuery) ||
        stationLocation.includes(normalizedQuery) ||
        regionName.includes(normalizedQuery)
      );
    });
  }, [availablePlaces, searchQuery]);

  const placesByRegion = useMemo(() => {
    return Object.keys(REGION_NAMES)
      .map((region) => ({
        region,
        regionLabel: REGION_NAMES[region as keyof typeof REGION_NAMES],
        places: filteredPlaces.filter((place) => place.region === region),
      }))
      .filter(({ places }) => places.length > 0);
  }, [filteredPlaces]);

  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPlaceChange(event.target.value);
  };

  return (
    <div className="mb-4 space-y-2">
      <label
        htmlFor="place-search"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Buscar y seleccionar estación meteorológica
      </label>

      <input
        id="place-search"
        type="search"
        placeholder="Buscar por estación, ubicación o región"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      />

      <select
        id="place-select"
        value={selectedPlaceId}
        onChange={handlePlaceChange}
        size={Math.min(10, Math.max(4, filteredPlaces.length))}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {placesByRegion.length === 0 ? (
          <option value="">No se encontraron estaciones activas</option>
        ) : (
          placesByRegion.map(({ region, regionLabel, places }) => (
            <optgroup key={region} label={regionLabel}>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name} ({place.location})
                </option>
              ))}
            </optgroup>
          ))
        )}
      </select>

      <p className="text-xs text-gray-500">
        {filteredPlaces.length} estaciones activas encontradas.
      </p>
    </div>
  );
}
