'use client'

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BentoGrids from "@/components/BentoGrids";
import AlertsModal from "@/components/old/AlertsModal";
import TopBanner from "@/components/TopBanner";
import { useAppSelector } from "@/redux/store";
import ChatBot from "@/components/ChatBot";

const Home: React.FC = () => {
  const [alerts] = useState<any[]>([]); // State to store alerts
  const [showAlertsModal, setShowAlertsModal] = useState(false); // State to control modal visibility
  const data = useAppSelector(state => state.DataReducer.value)
  const [bgImg, setBgImg] = useState("")

  useEffect(() => {
    console.log('f bg url')
    if (!data) {
      setBgImg("")
      return
    }

    const condition = data.current.condition.text.toLowerCase();


    console.log(data.current.condition.text, 'bg url')
    if (data.current.condition.text === "Partly cloudy" || data.current.condition.text === "Cloudy") {
      setBgImg(" dark:bg-[url('/assets/cloudy-bg.png')] bg-[url('/assets/cloudy-light-bg.png')] bg-cover bg-bottom ")
    }
    else if (data.current.condition.text === "Sunny") {
      setBgImg(" dark:bg-[url('/assets/sunny-bg.png')] bg-[url('/assets/sunny-bg.png')] bg-cover  ")
    }
    else if (
    condition.includes("rain") || 
    condition.includes("drizzle")
) {
    setBgImg("dark:bg-[url('/assets/rain-bg.png')] bg-[url('/assets/rain-light-bg.png')] bg-cover");
} 
    
    else {
      setBgImg("")
    }
  }, [data])

  // Prepare weather data for ChatBot
  const weatherData = data ? {
    city: data.location.name,
    temperature: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    condition: data.current.condition.text,
    rainChance: data.forecast.forecastday[0].day.daily_chance_of_rain,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    uvIndex: data.current.uv,
    forecast: data.forecast.forecastday.map(day => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      rainChance: day.day.daily_chance_of_rain,
      windSpeed: day.day.maxwind_kph
    }))
  } : null;

  return (
    <div className={"min-h-screen " + bgImg}>
      <div className="w-full rounded-lg flex flex-col h-fit">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Navbar 
            alerts={alerts}
            onAlertIconClick={() => setShowAlertsModal(true)}
          />
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <TopBanner />
        </div>

        {/* Chat */}
        <div className="fixed bottom-4 right-4 z-50 pr-4 pb-4">
          {weatherData && <ChatBot weatherData={weatherData} />}
        </div>

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids />
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