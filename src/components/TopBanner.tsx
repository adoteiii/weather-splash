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

    // const getGradientColor = (description: string = '') => {
    //   switch (description.toLowerCase()) {
    //     case 'sunny':
    //     case 'clear':
    //       return 'from-yellow-300 to-orange-400';
    //     case 'partly cloudy':
    //       return 'from-blue-200 to-gray-300';
    //     case 'cloudy':
    //       return 'from-gray-300 to-gray-500';
    //     case 'overcast':
    //       return 'from-gray-400 to-gray-600';
    //     case 'mist':
    //     case 'fog':
    //       return 'from-gray-300 to-gray-500';
    //     case 'patchy rain possible':
    //     case 'patchy light rain':
    //     case 'patchy rain ahead':
    //       return 'from-blue-200 to-gray-400';
    //     case 'light rain':
    //     case 'light drizzle':
    //       return 'from-blue-300 to-blue-500';
    //     case 'moderate rain':
    //       return 'from-blue-400 to-blue-600';
    //     case 'heavy rain':
    //       return 'from-blue-600 to-blue-800';
    //     case 'patchy snow possible':
    //     case 'light snow':
    //       return 'from-blue-100 to-gray-300';
    //     case 'moderate snow':
    //       return 'from-blue-200 to-gray-400';
    //     case 'heavy snow':
    //       return 'from-blue-300 to-gray-500';
    //     case 'thunderstorm':
    //     case 'thundery outbreaks possible':
    //       return 'from-purple-500 to-gray-700';
    //     case 'blizzard':
    //       return 'from-blue-200 to-gray-100';
    //     case 'freezing fog':
    //       return 'from-blue-100 to-gray-300';
    //     case 'patchy freezing drizzle possible':
    //       return 'from-blue-200 to-gray-400';
    //     default:
    //       return 'from-blue-200 to-blue-400';
    //   }
    // }

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
        setWeatherSummary(null)
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
          <div className="">
            <Card className=''>
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
