"use client";
import { HourlyForecastData } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import IconComponent from "../ui/icon-component";

interface HourlyForecastProps {
  data: HourlyForecastData[];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  function extractHoursFromDate(dt: number): string {
    const date = new Date(dt * 1000);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return `${hours}${ampm}`;
  }

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    safeDisplacement: 2,
  });

  // Get the current time epoch
  const currentTimeEpoch = Math.floor(Date.now() / 1000);
  const currentHour = new Date(currentTimeEpoch * 1000).getHours();

  // Sort data to ensure the current time is first
  const sortedData = data.sort((a, b) => a.time_epoch - b.time_epoch);
  const firstDataPoint = sortedData.findIndex(
    (item) => new Date(item.time_epoch * 1000).getHours() === currentHour
  );
  const alignedData =
    firstDataPoint >= 0
      ? sortedData
          .slice(firstDataPoint)
          .concat(sortedData.slice(0, firstDataPoint))
      : sortedData;

  // Extract a general weather description from the API data
  const generalDescription =
    data.length > 0 && data[0].condition
      ? data[0].condition.text
      : "No weather description available";

  return (
    <>
      <Card
        ref={ref}
        {...events}
        tabIndex={0}
        className="order-first col-span-2 h-48 flex cursor-grab touch-auto touch-pan-x select-none scroll-px-0.5 flex-row items-center justify-between gap-12 overflow-hidden overscroll-contain scroll-smooth p-6 ring-offset-background transition-colors scrollbar-hide hover:overflow-hidden focus:scroll-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:order-2 lg:order-3"
      >
        <CardHeader className="absolute top-2  w-full text-left text-sm font-bold text-neutral-600 dark:text-neutral-400">
          {generalDescription}
        </CardHeader>
        {alignedData && Array.isArray(alignedData) ? (
          alignedData.slice(0, 12).map((item: HourlyForecastData, i) => (
            <div
              key={item.time_epoch}
              className="flex h-full flex-col justify-between"
            >
              <div className="flex justify-center text-sm text-neutral-600 dark:text-neutral-400">
                {i === 0 ? "Now" : extractHoursFromDate(item.time_epoch)}
              </div>
              <div className="flex h-full items-center justify-center">
                {item.condition ? (
                  <IconComponent
                    weatherCode={item.condition.code}
                    x={item.is_day ? "d" : "n"}
                    className="h-8 w-8"
                  />
                ) : (
                  <div className="h-8 w-8">N/A</div>
                )}
              </div>
              <div className="flex justify-center">
                {item.temp_c !== undefined
                  ? `${Math.floor(item.temp_c)}°`
                  : "N/A"}
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </Card>
    </>
  );
}
