import { useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { Callout } from '@tremor/react';
import { cleanData } from '@/lib/cleanData'; // Adjust the path as needed
import { WeatherApiCurrentData, Location } from '@/lib/types';
import { Card, CardHeader, CardDescription }from './ui/card';
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"

const TopBanner: React.FC = () => {
    const data = useAppSelector(state => state.DataReducer.value);
    const [weatherSummary, setWeatherSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const currentLocation: Location | null = data && data.location ? {
        lon: data.location.lon,
        lat: data.location.lat,
        city: data.location.name,
        coord: {
          lon: data.location.lon.toString(),
          lat: data.location.lat.toString()
        }
      } : null;

    useEffect(() => {
        const fetchWeatherSummary = async () => {
            if (data) {
                try {
                    // Assuming data has `currentData` and `city` fields
                    const cleanedData = cleanData(
                        data as WeatherApiCurrentData,
                        currentLocation?.city || '', // Pass the city directly from the data
                    );

                    const response = await fetch('/api/getWeatherSummary', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ weatherData: cleanedData }),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        setWeatherSummary(result.result);
                    } else {
                        setError(result.error || 'Failed to generate weather report');
                    }
                } catch (err) {
                    setError('Failed to fetch weather summary');
                }
            }
        };

        fetchWeatherSummary();
    }, [data]);

    return (
        <div className="w-full max-w-3xl mx-auto">
          <div className=" rounded-lg shadow-sm overflow-hidden">
            <Card >
            <CardHeader>
                Weather Summary
            </CardHeader>
              <div className="space-y-2">
                <CardDescription>
                  {error ? (
                    <span className="text-red-100 text-sm">{error}</span>
                  ) : (
                    <span className="text-sm">
                      {weatherSummary || 'Generating weather summary...'}
                    </span>
                  )}
                </CardDescription>
                <div>
                  <p className="text-xs opacity-75">
                    Powered by WeatherSplash AI
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
};

export default TopBanner;
