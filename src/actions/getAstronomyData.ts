// api/gethourlydata.ts
import { AstronomyResponse } from "@/lib/types";

export const getAstronomyData = async ({ lat, lon }: { lat: number; lon: number }): Promise<AstronomyResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${lat},${lon}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch astronomy data");
  }

  const data = await response.json();
  return data as AstronomyResponse;
};
