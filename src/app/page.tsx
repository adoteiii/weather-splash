'use client'

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MainBento from "@/components/MainBento";
import BentoGrids from "@/components/BentoGrids";
import AlertsModal from "@/components/AlertsModal";

const Home: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');
  const [temperature, setTemperature] = useState<number>(0);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [shortNote, setShortNote] = useState('');
  const [weatherTimes, setWeatherTimes] = useState([]);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [alerts, setAlerts] = useState<any[]>([]); // State to store alerts
  const [showAlertsModal, setShowAlertsModal] = useState(false); // State to control modal visibility

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
        setTemperature(Math.round(data.current.temp_c));
        setWeatherDescription(data.current.condition.text);
        setShortNote(data.forecast.forecastday[0].day.condition.text);
        setWeatherTimes(data.forecast.forecastday[0].hour
          .filter((hour: { time: string }) => new Date(hour.time).getHours() >= new Date().getHours())
          .slice(0, 10)
          .map((hour: { time: string; temp_c: number; condition: { text: string } }) => ({
            time: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit' }),
            temperature: Math.round(hour.temp_c),
            weatherCondition: hour.condition.text,
          })));
        setLat(data.location.lat);
        setLon(data.location.lon);
        setAlerts(data.alerts?.alert || []); // Set alerts state
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
            alerts={alerts} // Pass alerts to Navbar
            onAlertIconClick={() => setShowAlertsModal(true)} // Show modal on alert icon click
          />
        </div>
        {/* MainBento */}
        <div className="flex justify-center mt-6">
          <MainBento 
            locationName={locationName}
            temperature={temperature}
            weatherDescription={weatherDescription}
            shortNote={shortNote}
          />
        </div>

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids 
            locationName={locationName}
            temperature={temperature}
            weatherDescription={weatherDescription}
            shortNote={shortNote}
            weatherTimes={weatherTimes}
            lat={lat}
            lon={lon}
          />
        </div>

        {/* Alerts Modal */}
        {showAlertsModal && (
          <AlertsModal 
            alerts={alerts} 
            onClose={() => setShowAlertsModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;