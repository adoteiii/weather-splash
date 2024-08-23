"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IconComponent from "../ui/icon-component";
import { useAppSelector } from "@/redux/store";
import { HourlyForecastData } from "@/lib/types";
import { getTimezone } from 'countries-and-timezones';

interface HourlyForecastPopupProps {
    day: {
      date_epoch: number;
      day: {
        mintemp_c: number;
        maxtemp_c: number;
        mintemp_f: number;
        maxtemp_f: number;
        condition: {
          code: number;
        };
      };
      hour?: HourlyForecastData[]; // Make this optional
    };
    onClose: () => void;
  }

export function HourlyForecastPopup({ day, onClose }: HourlyForecastPopupProps) {
  const units = useAppSelector((state) => state.UnitReducer.value);
  const data = useAppSelector(state=>state.DataReducer.value)
  function extractHoursFromDate(dt: number): string {
    const date = new Date(dt * 1000) 
    // console.log('date')
    // console.log('hf-', (getTimezone(data?.location.tz_id||"Brazil/West")?.utcOffset||0))
    let hours = date.getHours()+ (getTimezone(data?.location.tz_id||"Brazil/West")?.utcOffset||0)/60;
    const ampm = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return `${hours}${ampm}`;
  }

  return (
    <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-3/4 max-w-2xl">
      <CardHeader>
        <CardTitle>{new Date(day.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: data?.location.tz_id||"UTC" })}</CardTitle>
      </CardHeader>
      <CardContent>
        {day.hour ? (
          <div className="space-y-2">
            {day.hour.map((hourData: HourlyForecastData) => (
              <div key={hourData.time_epoch} className="flex items-center justify-between">
                <span>{extractHoursFromDate(hourData.time_epoch)}</span>
                {hourData.condition ? (
                  <IconComponent
                    weatherCode={hourData.condition.code}
                    x={hourData.is_day ? "d" : "n"}
                    className="h-6 w-6"
                  />
                ) : (
                  <span>N/A</span>
                )}
                <span>
                  {units.temperature === "C"
                    ? hourData.temp_c !== undefined
                      ? `${Math.floor(hourData.temp_c)}°`
                      : "N/A"
                    : hourData.temp_f !== undefined
                    ? `${Math.floor(hourData.temp_f)}°`
                    : "N/A"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>Hourly forecast data not available for this day.</div>
        )}
      </CardContent>
      <button onClick={onClose} className="absolute top-2 right-2 p-1">X</button>
    </Card>
  );
}