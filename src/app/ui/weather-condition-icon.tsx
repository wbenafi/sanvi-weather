import {
  Cloud,
  CloudSun,
  Droplet,
  Droplets,
  Sun,
  Umbrella,
} from "lucide-react";
import { type WeatherCondition } from "~/types/weather-condition";

export default function WeatherConditionIcon({
  condition,
}: {
  condition: WeatherCondition;
}) {
  switch (condition) {
    case "Soleado":
      return <Sun className="size-full text-yellow-500" size={24} />;
    case "Parcialmente Nublado":
      return <CloudSun className="size-full text-yellow-500" size={24} />;
    case "Nublado":
      return <Cloud className="size-full text-yellow-500" size={24} />;
    case "Lluvia Ligera":
      return <Droplet className="size-full text-sky-500" size={24} />;
    case "Lluvia Moderada":
      return <Droplets className="size-full text-sky-500" size={24} />;
    case "Lluvia Intensa":
      return <Droplets className="size-full text-sky-500" size={24} />;
    case "Tormentoso":
      return <Umbrella className="size-full text-sky-500" size={24} />;
    default:
      return <Sun className="size-full text-yellow-500" size={24} />;
  }
}
