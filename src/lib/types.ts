
type Coordinates = {
  lon: string;
  lat: string;
};

export type Location = {
  lon: number;
  lat: number;
  city: string;
  coord: Coordinates;
};

export type WeatherApiCurrentData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};


// types.ts
export type HourlyForecastData = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

export type HourlyForecastResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      day: {
        mintemp_c: number;
        maxtemp_c: number;
        mintemp_f: number;
        maxtemp_f: number;
        condition: {
          code: number;
        };
      };
      hour: HourlyForecastData[];
    }[];
  };
};




export type AirQualityData = {
  co: number; // Concentration of CO (Carbon monoxide), μg/m3
  no2: number; // Concentration of NO2 (Nitrogen dioxide), μg/m3
  o3: number; // Concentration of O3 (Ozone), μg/m3
  so2: number; // Concentration of SO2 (Sulphur dioxide), μg/m3
  pm2_5: number; // Concentration of PM2.5 (Fine particles matter), μg/m3
  pm10: number; // Concentration of PM10 (Coarse particulate matter), μg/m3
  us_epa_index: number; // US EPA air quality index
  gb_defra_index: number; // UK Defra air quality index
};

export type AirPollutionResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    air_quality: AirQualityData;
  };
};

type DailyUnits = {
  time: string;
  uv_index_max: string;
};

type DailyData = {
  time: string[];
  uv_index_max: number[];
};

export type UVIndexResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
};

// types.ts
export type AstronomyData = {
  sunrise: string;
  sunset: string;
};

export type AstronomyResponse = {
  astronomy: {
    astro: AstronomyData;
  };
};



export type City = {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: string;
  sunset: string;
   astronomy: AstronomyData;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export interface ForecastData {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [
    {
      id: number;
    }
  ];
}

export interface TenDayForecastData {
  location: {
    localtime: string;
  };
  forecast: {
    forecastday: [
      {
        date_epoch: number;
        day: {
          mintemp_c: number;
          maxtemp_c: number;
          mintemp_f: number;
          maxtemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          maxwind_mph: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          totalprecip_in: number;
          avghumidity: number;
          daily_chance_of_rain: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
          uv: number;
        };
        astro: {
          sunrise: string;
          sunset: string;
          moonrise: string;
          moonset: string;
          moon_phase: string;
        };
      }
    ];
  };
}
