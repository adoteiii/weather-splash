import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import PrecipitationMap from "./widgets/PrecipitationMap";
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
} from "@/lib/types";

const BentoGrids: React.FC = () => {
  const [tenDayForecast, setTenDayForecast] =
    useState<TenDayForecastData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyForecastResponse | null>(
    null
  );
  const [airData, setAirData] = useState<AirPollutionResponse | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const data = useAppSelector((state) => state.DataReducer.value);

  useEffect(() => {
    if (!data) {
      return;
    }
    const fetchForecasts = async () => {
      try {
        const forecastData: TenDayForecastData = await getTenDayForecast({
          lat: parseFloat(DEFAULT_LOCATION.coord.lat),
          lon: parseFloat(DEFAULT_LOCATION.coord.lon),
        });
        setTenDayForecast(forecastData);

        const hourlyData: HourlyForecastResponse = await getHourlyData({
          lat: parseFloat(DEFAULT_LOCATION.coord.lat),
          lon: parseFloat(DEFAULT_LOCATION.coord.lon),
        });
        setHourlyData(hourlyData);

        const airData: AirPollutionResponse = await getAirPollutionData({
          lat: parseFloat(DEFAULT_LOCATION.coord.lat),
          lon: parseFloat(DEFAULT_LOCATION.coord.lon),
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
          timezone: 0,
          sunrise: 0,
          sunset: 0,
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

  const hourlyForecastData = hourlyData?.forecast?.forecastday[0]?.hour || null;

  return (
    <div className="relative w-[1200px] h-[700px]">
      <Card className="w-full h-full top-0 left-0 grid sm:grid-cols-3 sm:grid-rows-3 grid-cols-1 gap-4 p-4">
        <div className="col-span-2 h-48 bg-[#2e2e2e80] rounded-2xl ">
          {hourlyData &&
          hourlyData.forecast &&
          hourlyData.forecast.forecastday[0] ? (
            <HourlyForecast data={hourlyData.forecast.forecastday[0].hour} />
          ) : (
            <p>Loading hourly data...</p>
          )}
        </div>

        <div className="h-96 bg-[#2e2e2e80] rounded-2xl relative overflow-hidden">
          <div className="absolute top-2 left-2 text-sm font-bold z-10 text-white">
            <h3>Precipitation Map</h3>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <PrecipitationMap lat={data.location.lat} lon={data.location.lon} />
          </div>
        </div>

        <div className="col-span-1 h-[600px] row-auto bg-[#2e2e2e80] rounded-2xl overflow-hidden">
          {tenDayForecast ? (
            <TenDayForecast data={tenDayForecast} />
          ) : (
            <p>Loading 10-day forecast...</p>
          )}
        </div>

        <div className="grid grid-cols-2 col-span-2 sm:col-span-1 gap-4 ">
          {airData ? (
            <AirPollution data={airData.current.air_quality} />
          ) : (
            <p>Loading air quality data...</p>
          )}
        </div>
      </Card>
      <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {hourlyForecastData && airData && city ? (
          <WeatherWidgets
            data={hourlyForecastData} // Pass the correct hourly data here
            airQuality={airData}
            city={city}
          />
        ) : (
          <p>Loading weather widgets...</p>
        )}
        <OtherLargeCities />
      </section>
    </div>
  );
};

export default BentoGrids;
