export type IMNData = {
  currentWeather: {
    temp: string | null;
    min_temp: string | null;
    max_temp: string | null;
    precipitation_since_7am: string | null;
    precipitation_yesterday: string | null;
    relative_humidity: string | null;
  };
  last24Hours:
    | {
        Fecha: string;
        Temp: string;
        Lluvia: string;
      }[]
    | null;
};
