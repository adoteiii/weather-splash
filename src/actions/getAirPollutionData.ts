import { AirPollutionResponse } from "@/lib/types"

export async function getAirPollutionData({ lat, lon }: { lat: number; lon: number }) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from WeatherAPI");
  }

  const data = await response.json();
  console.log('Raw API response:', JSON.stringify(data, null, 2));

  return data as AirPollutionResponse; // Return the raw data for now
}