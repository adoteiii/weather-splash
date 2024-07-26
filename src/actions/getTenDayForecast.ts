import { TenDayForecastData } from "@/lib/types";

export async function getTenDayForecast({ lat, lon }: { lat: number; lon: number }): Promise<TenDayForecastData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from WeatherAPI");
  }

  const data = await response.json();
  
  // Log the entire API response
  console.log('API response data:', data);
  
  // Log the length of the forecastday array
  console.log('Number of forecast days:', data.forecast.forecastday.length);

  return data as TenDayForecastData;
}
