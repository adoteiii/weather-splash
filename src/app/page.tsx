"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MainBento from "@/components/MainBento";
import BentoGrids from "@/components/BentoGrids";

const Home = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherDescription, setWeatherDescription] = useState('');

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'click') {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocationName(data.location.name);
        setTemperature(data.current.temp_c);
        setWeatherDescription(data.current.condition.text);
        setLocation('');
        setError('');
      } catch (error) {
        setError('City not found');
        setData({});
      }
    }
  };

  return (
    <div className="bg-auto h-full">
      <div className="w-full rounded-lg flex flex-col h-fit">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Navbar 
            handleSearch={handleSearch}
            setLocation={setLocation}
            locationName={locationName}
            searchQuery={location}
          />
        </div>
        
        {/* MainBento */}
        <div className="flex justify-center mt-6">
          <MainBento 
            locationName={locationName}
            temperature={temperature}
            weatherDescription={weatherDescription}
          />
        </div>

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids />
        </div>
      </div>
    </div>
  );
};

export default Home;
