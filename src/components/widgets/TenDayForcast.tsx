import { ForecastData, TenDayForecastData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { convertToDate } from "@/lib/dateUtils";
import { TemperatureRange } from "../ui/temperature-range";
import IconComponent from "../ui/icon-component";
import { Separator } from "../ui/separator";

interface TenDayForecastProps {
  data: TenDayForecastData;
}

export default function TenDayForecast({ data }: TenDayForecastProps) {
  const temperatures = data.forecast.forecastday.map((item) => ({
    min: item.day.mintemp_c,
    max: item.day.maxtemp_c,
  }));
  const minTemperature = Math.min(...temperatures.map((temp) => temp.min));
  const maxTemperature = Math.max(...temperatures.map((temp) => temp.max));

  return (
    <Card className="h-fit shrink-0">
      <CardHeader>
        <CardTitle>
          <i>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 invert dark:invert-0"
            >
              <path
                d="M8 2V5"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V5"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 9.08984H20.5"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6947 13.7002H15.7037"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.6947 16.7002H15.7037"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 13.7002H12.0045"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 16.7002H12.0045"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 13.7002H8.30329"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.29431 16.7002H8.30329"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          10-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-base font-normal md:mb-1">
        {data.forecast.forecastday.map((item, i) => (
          <div key={item.date_epoch}>
            <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
              <p className="min-w-[3rem] font-medium">
                {i === 0
                  ? "Today"
                  : convertToDate(data.location.localtime, item.date_epoch, "short")}
              </p>
              <IconComponent
                weatherCode={item.day.condition.code}
                x={data.location.localtime.includes("d") ? "d" : "n"}
                className="h-8 w-8"
              />
              <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
                <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                  <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                    {Math.floor(item.day.mintemp_c)}&deg;
                  </p>
                  <TemperatureRange
                    min={minTemperature}
                    max={maxTemperature}
                    value={[item.day.mintemp_c, item.day.maxtemp_c]}
                  />
                  <p className="flex w-[3rem] min-w-fit justify-end">
                    {Math.floor(item.day.maxtemp_c)}&deg;
                  </p>
                </div>
              </div>
            </div>
            {i !== data.forecast.forecastday.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
