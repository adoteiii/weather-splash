// getUVData.ts
import { WeatherApiCurrentData } from "@/lib/types";

export async function uvIndex({ lat, lon }: { lat: number; lon: number }): Promise<number | null> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from WeatherAPI");
  }

  const data: WeatherApiCurrentData = await response.json();

  return data.current.uv;
}
