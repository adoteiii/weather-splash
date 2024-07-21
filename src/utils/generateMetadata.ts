import { Metadata } from "next";

interface SearchParamsProps {
  lat: string;
  lon: string;
}

export async function generateMetadata(searchParams: SearchParamsProps): Promise<Metadata> {
  const { lat, lon } = searchParams;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&days=3`;
  const data = await fetch(url).then((res) => res.json());

  return {
    title: `${data.location.name} - Weather Forecast`,
    description: `${data.location.name} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
  };
}
