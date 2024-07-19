import React from "react";
import { Card } from "@/components/ui/card";
import { City, HourlyForecastData } from "@/lib/types";
import Clock from "../ui/clock";
import IconComponent from "../ui/icon-component";

// Helper function to find the current hour's data
const findCurrentHourData = (data: HourlyForecastData[]): HourlyForecastData | null => {
  const now = new Date();
  const currentHour = now.getHours();

  // Find the data entry that matches the current hour
  return data.find(entry => new Date(entry.time_epoch * 1000).getHours() === currentHour) || null;
};

interface CurrentWeatherProps {
  data: HourlyForecastData[];
  city: City;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, city }) => {
  const currentHourData = findCurrentHourData(data);
  const now = new Date();

  if (!currentHourData) {
    return <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden md:h-[25rem]">No data available</Card>;
  }

  // Format date to show only the day
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const formattedDate = new Intl.DateTimeFormat(undefined, dateOptions).format(new Date(currentHourData.time_epoch * 1000));

  return (
    <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden md:h-[25rem]">
      <div className="absolute " />
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{formattedDate}</span>
          <Clock initial={now} timezone={city.timezone} />
        </div>
        <div className="text-md mt-2 flex font-bold">
          <span>{city.name}</span>
          <i>
            {/* svg */}
          </i>
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {Math.round(currentHourData.temp_c)}&deg;
      </div>
      <div>
        <IconComponent
          weatherCode={currentHourData.condition.code}
          x={currentHourData.is_day ? "d" : "n"}
          className="h-9 w-9"
        />
        <div className="font-semibold">{currentHourData.condition.text}</div>
        <div className="flex gap-2 dark:text-neutral-500">
          <span>H: {Math.round(currentHourData.temp_c)}&deg;</span>
          <span>L: {Math.round(currentHourData.temp_c)}&deg;</span>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
