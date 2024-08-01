import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { useTheme } from 'next-themes'
import { darkThemeStyles, lightThemeStyles } from '@/lib/themeStyles';
import { weatherLayers } from '@/lib/mapTypes';
import {Legend} from '../ui/Legend'

/// <reference types="@types/google.maps" />


interface WeatherMapProps {
  lat: number;
  lon: number;
}

const OPENWEATHERMAP_TOKEN = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;



// const weatherLayers = [
//   { label: 'Temperature (°C)', code: 'temp_new' },
//   { label: 'Precipitation Intensity (mm/s)', code: 'precipitation_new' },
//   { label: 'Wind Speed and Direction (m/s)', code: 'wind_new' },
//   { label: 'Cloudiness (%)', code: 'clouds_new' },
//   { label: 'Sea Level Pressure (hPa)', code: 'pressure_new' }
// ];





const loadGoogleMapsScript = (url: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${url}`));
    document.head.appendChild(script);
  });
};

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon }) => {
  const { theme } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [layer, setLayer] = useState('precipitation_new');

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat, lng: lon },
          zoom: 8,
          disableDefaultUI: true,
          styles: theme === 'dark' ? darkThemeStyles : lightThemeStyles,
        });

        const weatherLayer = new google.maps.ImageMapType({
          getTileUrl: (coord: google.maps.Point, zoom: number) => {
            return `https://tile.openweathermap.org/map/${layer}/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHERMAP_TOKEN}`;
          },
          tileSize: new google.maps.Size(256, 256),
          opacity: 0.8,
        });

        newMap.overlayMapTypes.insertAt(0, weatherLayer);
        setMap(newMap);
        setLoading(false);
      }
    };

    loadGoogleMapsScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`)
      .then(initMap)
      .catch((error) => {
        console.error('Error loading Google Maps script', error);
        setLoading(false);
      });
  }, [layer, theme]);

  useEffect(() => {
    if (map) {
      map.setCenter({ lat, lng: lon });
    }
  }, [lat, lon, map]);

  useEffect(() => {
    if (map) {
      const weatherLayer = new google.maps.ImageMapType({
        getTileUrl: (coord: google.maps.Point, zoom: number) => {
          return `https://tile.openweathermap.org/map/${layer}/${zoom}/${coord.x}/${coord.y}.png?appid=${OPENWEATHERMAP_TOKEN}`;
        },
        tileSize: new google.maps.Size(256, 256),
        opacity: 1,
      });

      map.overlayMapTypes.clear();
      map.overlayMapTypes.insertAt(0, weatherLayer);
    }
  }, [layer, map]);

  return (
    <Card className="order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain p-0 md:p-0 xl:col-span-3">
      <div className="absolute right-0 z-10 m-2">
        <Select value={layer} onValueChange={setLayer}>
          <SelectTrigger aria-label="Map layer" className="w-fit">
            <SelectValue placeholder="Map Layers" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {weatherLayers.map((tile) => (
                <SelectItem key={tile.code} value={tile.code}>
                  {tile.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <div className="loader"></div>
            <p>Loading map...</p>
          </div>
        )}
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        <Legend layer={layer} />
      </div>
    </Card>
  );
};

export default WeatherMap;


