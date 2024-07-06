"use client"
import { useState } from "react";

import Navbar from "@/components/Navbar";
import MainBento from "@/components/MainBento";
import BentoGrids from "@/components/BentoGrids";



const Home = () => {
  const[data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_SPLASH_API_KEY}q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async = (e) => {
    if (e.key === "Enter"){
      e.preventDefault()
      try{
        const response = await fetch(url)
        if(!response.ok){
          throw new Error()
        }
      }
    }
  }


  return (
    <div className="bg-auto h-full">
      <div className="w-full rounded-lg flex flex-col h-fit">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Navbar />
        </div>
        
        {/* MainBento */}
        <div className="flex justify-center mt-6">
          <MainBento />
        </div>

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids />
        </div>
      </div>
    </div>
  );
}

export default Home;
