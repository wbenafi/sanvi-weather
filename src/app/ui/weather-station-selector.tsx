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
  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPlaceChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="place-select"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Seleccionar estación meteorológica
      </label>
      <select
        id="place-select"
        value={selectedPlaceId}
        onChange={handlePlaceChange}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Seleccione una estación</option>
        {Object.keys(REGION_NAMES).map((region) => (
          <optgroup
            key={region}
            label={REGION_NAMES[region as keyof typeof REGION_NAMES]}
          >
            {places
              .filter((place) => place.region === region)
              .map((place) => (
                <option
                  key={place.id}
                  value={place.id}
                  disabled={place.state !== "Activa"}
                >
                  {place.name} ({place.location})
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
