import { TenDayForecastData } from "@/lib/types";

export async function getTenDayForecast({ lat, lon }: { lat: number; lon: number }): Promise<TenDayForecastData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from WeatherAPI");
  }

  const data = await response.json();

  // Transform the data to match your TenDayForecastData type if necessary
  return data as TenDayForecastData;
}
