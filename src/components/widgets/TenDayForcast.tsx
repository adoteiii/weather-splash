import React from "react";
import { HourlyForecastResponse, HourlyForecastData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TemperatureRange } from "../ui/temperature-range";
import IconComponent from "../ui/icon-component";
import { Separator } from "../ui/separator";
import { useAppSelector } from "@/redux/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TenDayForecastData } from "@/lib/types";
import { CalendarRange } from 'lucide-react';
// Helper function to convert Unix timestamp to abbreviated weekday name
const getAbbreviatedDay = (dateEpoch: number): string => {
  const date = new Date(dateEpoch * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

interface TenDayForecastProps {
  data: TenDayForecastData;
}

export default function TenDayForecast({ data }: TenDayForecastProps) {
  const units = useAppSelector(state => state.UnitReducer.value)

  const temperatures = data.forecast.forecastday.map((item) => ({
    min: units.temperature === 'C' ? item.day.mintemp_c : item.day.mintemp_f,
    max: units.temperature === 'C' ? item.day.maxtemp_c : item.day.maxtemp_f,
  }));
  const minTemperature = Math.min(...temperatures.map((temp) => temp.min));
  const maxTemperature = Math.max(...temperatures.map((temp) => temp.max));


  return (
    <Card className="h-[38rem] overflow-hidden">
      <CardHeader>
        <CardTitle>
          <i>
            <CalendarRange />
          </i>
          10-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-2rem)] overflow-y-auto space-y-2 text-base font-normal md:mb-1">
        {data.forecast.forecastday.map((item, i) => (
          <Popover key={item.date_epoch}>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                  <p className="min-w-[3rem] font-medium text-sm">
                    {i === 0 ? "Today" : getAbbreviatedDay(item.date_epoch)}
                  </p>
                  <IconComponent
                    weatherCode={item.day.condition.code}
                    x={data.location.localtime.includes("d") ? "d" : "n"}
                    className="h-8 w-8"
                  />
                  <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
                    <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                      <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                        {Math.floor(units.temperature === 'C' ? item.day.mintemp_c : item.day.mintemp_f)}&deg;
                      </p>
                      <TemperatureRange
                        min={minTemperature}
                        max={maxTemperature}
                        value={[units.temperature === 'C' ? item.day.mintemp_c : item.day.mintemp_f, units.temperature === 'C' ? item.day.maxtemp_c : item.day.maxtemp_f]}
                      />
                      <p className="flex w-[3rem] min-w-fit justify-end">
                        {Math.floor(units.temperature === 'C' ? item.day.maxtemp_c : item.day.maxtemp_f)}&deg;
                      </p>
                    </div>
                  </div>
                </div>
                {i !== data.forecast.forecastday.length - 1 && <Separator className="mt-3" />}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {new Date(item.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.day.condition.text}</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <span>Temperature</span>
                      <span>
                        {units.temperature === "C"
                          ? `${Math.floor(item.day.mintemp_c)}°C - ${Math.floor(item.day.maxtemp_c)}°C`
                          : `${Math.floor(item.day.mintemp_f)}°F - ${Math.floor(item.day.maxtemp_f)}°F`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg Temperature</span>
                      <span>
                        {units.temperature === "C"
                          ? `${Math.floor(item.day.avgtemp_c)}°C`
                          : `${Math.floor(item.day.avgtemp_f)}°F`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wind</span>
                      <span>
                        {units.wind === "mph"
                          ? `${item.day.maxwind_mph} mph`
                          : `${item.day.maxwind_kph} km/h`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Precipitation</span>
                      <span>
                        {units.precipitation === "in"
                          ? `${item.day.totalprecip_in} in`
                          : `${item.day.totalprecip_mm} mm`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Humidity</span>
                      <span>{item.day.avghumidity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Chance of Rain</span>
                      <span>{item.day.daily_chance_of_rain}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>UV Index</span>
                      <span>{item.day.uv}</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <h5 className="font-medium">Astronomical Info</h5>
                    <div className="flex justify-between items-center">
                      <span>Sunrise</span>
                      <span>{item.astro.sunrise}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sunset</span>
                      <span>{item.astro.sunset}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Moon Phase</span>
                      <span>{item.astro.moon_phase}</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
          </Popover>
        ))}
      </CardContent>
    </Card>
  );
}