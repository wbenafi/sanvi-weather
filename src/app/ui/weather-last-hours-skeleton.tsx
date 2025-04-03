import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function WeatherLastHoursSkeleton() {
  return (
    <Card className="min-w-[75vw] md:min-w-[480px]">
      <CardHeader>
        <CardTitle>Temperatura</CardTitle>
        <CardDescription>Últimas 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
} 