// api/gethourlydata.ts
import { HourlyForecastResponse } from "@/lib/types";

export const getHourlyData = async ({ lat, lon }: { lat: number; lon: number }): Promise<HourlyForecastResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&hours=24`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hourly data");
  }

  const data = await response.json();
  return data as HourlyForecastResponse;
};
