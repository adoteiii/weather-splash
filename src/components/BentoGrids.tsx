import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import WeatherMap from "./widgets/PrecipitationMap";
import TenDayForecast from "./widgets/TenDayForcast";
import HourlyForecast from "./widgets/HourlyForecast";
import AirPollution from "./widgets/AirPollution";
import OtherLargeCities from "@/components/widgets/OtherLargeCities";
import WeatherWidgets from "./widgets/WeatherWidgets";

import { useAppSelector } from "@/redux/store";
import { getTenDayForecast } from "@/actions/getTenDayForecast";
import { getHourlyData } from "@/actions/getHourlyData";
import { getAirPollutionData } from "@/actions/getAirPollutionData";
import { DEFAULT_LOCATION } from "@/lib/config";
import {
  HourlyForecastResponse,
  AirPollutionResponse,
  TenDayForecastData,
  City,
  WeatherApiCurrentData
} from "@/lib/types";
import CurrentWeather from "./widgets/CurrentWeather";
import { ClassNameValue } from 'tailwind-merge';
import { AstronomyData } from '../lib/types';
import { Sun } from "lucide-react";

const BentoGrids: React.FC = () => {
  const [tenDayForecast, setTenDayForecast] = useState<TenDayForecastData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyForecastResponse | null>(null);
  const [airData, setAirData] = useState<AirPollutionResponse | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const data = useAppSelector((state) => state.DataReducer.value) as WeatherApiCurrentData;

  useEffect(() => {
    if (!data) {
      return;
    }
    const fetchForecasts = async () => {
      try {
        const forecastData: TenDayForecastData = await getTenDayForecast({
          lat: data.location.lat,
          lon: data.location.lon,
        });
        setTenDayForecast(forecastData);

        const hourlyData: HourlyForecastResponse = await getHourlyData({
          lat: data.location.lat,
          lon: data.location.lon,
        });
        setHourlyData(hourlyData);

        const airData: AirPollutionResponse = await getAirPollutionData({
          lat: data.location.lat,
          lon: data.location.lon,
        });
        setAirData(airData);

        const cityData: City = {
          id: 0,
          name: data.location.name,
          coord: {
            lon: data.location.lon,
            lat: data.location.lat,
          },
          country: data.location.country,
          population: 0,
          timezone: new Date().getTimezoneOffset() * -60, // Convert to seconds
          sunrise: "",
          sunset: "",
          astronomy: {
            sunrise: "",
            sunset: ""
          }
        };
        setCity(cityData);
      } catch (error) {
        console.error("Failed to fetch forecasts:", error);
      }
    };

    fetchForecasts();
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const hourlyForecastData = hourlyData?.forecast?.forecastday[0]?.hour || [];

  return (
    <div className="relative w-[1260px] h-[600px]">


      <Card className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
            {hourlyForecastData.length > 0 && city && (
              <CurrentWeather data={hourlyForecastData} city={city} />
            )}

            {tenDayForecast ? (
              <TenDayForecast data={tenDayForecast}  />
            ) : (
              <p>Loading 10-day forecast...</p>
            )}
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {hourlyForecastData && airData && city ? (
            <WeatherWidgets data={hourlyForecastData} airQuality={airData} city={city} />
          ) : (
            <p>Loading weather widgets...</p>
          )}

          {hourlyData && hourlyData.forecast && hourlyData.forecast.forecastday[0] ? (
            <HourlyForecast data={hourlyData.forecast.forecastday[0].hour} />
          ) : (
            <p>Loading hourly data...</p>
          )}

            <WeatherMap lat={data.location.lat} lon={data.location.lon} />

          <OtherLargeCities />

        </section>
      </Card>
    </div>
  );
};

export default BentoGrids;
