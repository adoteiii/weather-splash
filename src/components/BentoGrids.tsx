import React, { useEffect, useState } from "react";
import WeatherTimes from "./WeatherTimes";
import PrecipitationMap from "./PrecipitationMap";
import SevenDayForecast from "./SevenDayForecast";
import { useAppSelector } from "@/redux/store";

const BentoGrids: React.FC = () => {
  const [sevenDayForecast, setSevenDayForecast] = useState<any[]>([]);
  const data = useAppSelector((state) => state.DataReducer.value);
  useEffect(() => {
    if (!data) {
      return;
    }
    const fetchSevenDayForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${data.location.lat},${data.location.lon}&days=7`
        );
        const result = await response.json();
        const forecast = result.forecast.forecastday.map((day: any) => ({
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

    if (!!data) {
      fetchSevenDayForecast();
    }
  }, [data]);

  return data ? (
    <div className="relative w-[927px] h-[624px]">
      {/* {JSON.stringify(data)} */}
      <div className="w-full h-full top-0 left-0 grid sm:grid-cols-3 sm:grid-rows-3 grid-cols-1  gap-4 p-4">
        <div className="col-span-2 h-48 bg-[#2e2e2e80] rounded-2xl p-4">
          <div className="text-white font-normal text-start text-xs">
            {data.current.condition.text}
          </div>
          
          <WeatherTimes
            times={[...data.forecast.forecastday[0].hour]
              .sort((a, b) => a.time_epoch - b.time_epoch)
              .filter((hour)=>hour.time_epoch*1000 >= Date.now().valueOf())
              // .filter((hour) => (hour.time_epoch) >= new Date().getTime())
              .slice(0, 10)
              .map(
                (hour: {
                  time: string;
                  temp_c: number;
                  condition: { text: string };
                }) => ({
                  time: new Date(hour.time).toLocaleTimeString([], {
                    hour: "2-digit",
                  }),
                  temperature: Math.round(hour.temp_c),
                  weatherCondition: hour.condition.text,
                })
              )}
          />
        </div>

        <div className="h-96 bg-[#2e2e2e80] rounded-2xl relative overflow-hidden">
          <div className="absolute top-2 left-2 text-sm font-bold z-10 text-white">
            <h3>Precipitation Map</h3>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <PrecipitationMap lat={data.location.lat} lon={data.location.lon} />
          </div>
        </div>
        <div className="col-span-1 h-[390px] bg-[#2e2e2e80] rounded-2xl overflow-y-auto">
          <SevenDayForecast sevenDayForecast={sevenDayForecast} />
        </div>

        <div className="grid grid-cols-2 col-span-2 sm:col-span-1 gap-4">
          {[...data.forecast.forecastday]?.slice(-7, -1).map((fd) => {
            return (
              <div className="h-[120px] bg-[#2e2e2e80] pt-2 rounded-2xl">
                <h1 className="px-3 pb-3">{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            new Date(fd.date))}</h1>
                <h1 className="text-sm text-center">Wind Speed</h1>
                <p className="font-bold text-center">{fd.day.maxwind_kph} KPH</p>
                
              </div>
            );
          })}

          {/* <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div> */}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default BentoGrids;
