"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Sun, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { type IMNData } from "~/types/imn-data";
dayjs.extend(customParseFormat);

const chartConfig = {
  temp: {
    label: "Temperatura",
    color: "#4cd4ab",
  },
} satisfies ChartConfig;

export function WeatherLastHours({ data }: { data: IMNData["last24Hours"] }) {
  const reversedData = [...(data ?? [])].reverse();

  const chartData = reversedData.map((item) => ({
    hour: dayjs(item.Fecha.replaceAll(".", ""), "DD/MM/YYYY hh:mm a").format(
      "h a",
    ),
    temp: parseFloat(item.Temp),
  }));

  return (
    <Card className="md:min-w-[480px]">
      <CardHeader>
        <CardTitle>Temperatura</CardTitle>
        <CardDescription>Últimas 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="temp"
              type="natural"
              stroke={chartConfig.temp.color}
              strokeWidth={2}
              dot={false}
            />
            <YAxis
              dataKey="temp"
              tickFormatter={(value) => `${value}°C`}
              tickLine={false}
              axisLine={false}
              domain={[
                (dataMin: number) => dataMin - 3,
                (dataMax: number) => dataMax + 3,
              ]}
              width={40}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        </div>
        <div className="text-muted-foreground leading-none">
        </div>
      </CardFooter> */}
    </Card>
  );
}
