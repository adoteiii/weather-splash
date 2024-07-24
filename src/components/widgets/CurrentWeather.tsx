import React from "react";
import { Card } from "@/components/ui/card";
import { City, HourlyForecastData } from "@/lib/types";
import Clock from "../ui/clock";
import IconComponent from "../ui/icon-component";
import { useAppSelector } from "@/redux/store";

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
  const units = useAppSelector(state=>state.UnitReducer.value)
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
          <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 h-4 w-4 fill-none stroke-black dark:stroke-white"
            >
              <path
                d="M7.39993 6.32003L15.8899 3.49003C19.6999 2.22003 21.7699 4.30003 20.5099 8.11003L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23003 7.39993 6.32003Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1101 13.6501L13.6901 10.0601"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {units.temperature === 'C'? Math.round(currentHourData.temp_c): Math.round(currentHourData.temp_f)}&deg;
      </div>
      <div>
        <IconComponent
          weatherCode={currentHourData.condition.code}
          x={currentHourData.is_day ? "d" : "n"}
          className="h-9 w-9"
        />
        <div className="font-semibold">{currentHourData.condition.text}</div>
        <div className="flex gap-2 dark:text-neutral-500">
          <span>H: {units.temperature === 'C'? Math.round(currentHourData.temp_c): Math.round(currentHourData.temp_f)}&deg;</span>
          <span>L: {units.temperature === 'C'? Math.round(currentHourData.temp_c): Math.round(currentHourData.temp_f)}&deg;</span>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
