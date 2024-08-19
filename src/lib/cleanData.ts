import { WeatherApiCurrentData } from './types';

type SimplifiedWeatherData = {
  city: string;
  temperature: number;
  condition: string;
  rainChance: number;
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
    temperature: current.temp_c,
    condition: current.condition.text,
    rainChance: current.precip_mm || 0, 
  };

  return simplifiedData;
};
