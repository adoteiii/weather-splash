import { WeatherApiCurrentData } from './types';

type SimplifiedWeatherData = {
  city: string;
  temperature: number;
  condition: string;
  rainChance: number;
  timezone: string
  timeutc: string;
};

export const cleanData = (
  currentData: WeatherApiCurrentData,
  city: string,
): SimplifiedWeatherData => {
  const { location, current } = currentData;

  // Use the provided city if available, otherwise fallback to location.name
  const chosenCity = city || location.name;

  // Simplified data extraction
  const simplifiedData: SimplifiedWeatherData = {
    city: chosenCity,
    timezone: currentData.location.tz_id,
    temperature: current.temp_c,
    timeutc: new Date().toUTCString(),
    condition: current.condition.text,
    rainChance: current.precip_mm || 0, 
  };

  return simplifiedData;
};
