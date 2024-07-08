import React, { useEffect, useState } from "react";
import WeatherTimes from "./WeatherTimes";
import PrecipitationMap from "./PrecipitationMap";
import SevenDayForecast from "./SevenDayForecast";

interface BentoGridsProps {
  locationName: string;
  temperature: number | null;
  weatherDescription: string;
  shortNote: string;
  weatherTimes: {
    time: string;
    temperature: number;
    weatherCondition: string;
  }[];
  lat: number;
  lon: number;
}

const BentoGrids: React.FC<BentoGridsProps> = ({
  locationName,
  temperature,
  weatherDescription,
  shortNote,
  weatherTimes,
  lat,
  lon,
}) => {
  const [sevenDayForecast, setSevenDayForecast] = useState<any[]>([]);

  useEffect(() => {
    const fetchSevenDayForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${lat},${lon}&days=7`
        );
        const data = await response.json();
        const forecast = data.forecast.forecastday.map((day: any) => ({
          day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            new Date(day.date)
          ),
          minTemperature: Math.round(day.day.mintemp_c),
          maxTemperature: Math.round(day.day.maxtemp_c),
          weatherCondition: day.day.condition.text,
          weatherIcon: `https:${day.day.condition.icon}`,
          precipitation: day.day.daily_chance_of_rain,
        }));
        setSevenDayForecast(forecast);
      } catch (error) {
        console.error("Error fetching the 7-day forecast:", error);
      }
    };

    if (lat !== 0 && lon !== 0) {
      fetchSevenDayForecast();
    }
  }, [lat, lon]);

  return (
    <div className="relative w-[927px] h-[624px]">
      <div className="w-full h-full top-0 left-0 grid grid-cols-3 grid-rows-3 gap-4 p-4">
        <div className="col-span-2 h-48 bg-[#2e2e2e80] rounded-2xl p-4">
          <div className="text-white font-normal text-start text-xs">
            {weatherDescription}
          </div>
          <WeatherTimes times={weatherTimes} />
        </div>
        <div className="h-96 bg-[#2e2e2e80] rounded-2xl relative overflow-hidden">
          <div className="absolute top-2 left-2 text-sm font-bold z-10 text-white">
            <h3>Precipitation Map</h3>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <PrecipitationMap lat={lat} lon={lon} />
          </div>
        </div>
        <div className="col-span-1 h-[390px] bg-[#2e2e2e80] rounded-2xl overflow-y-auto">
          <SevenDayForecast sevenDayForecast={sevenDayForecast} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrids;
