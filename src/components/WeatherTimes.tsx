import React from 'react';
//@ts-ignore
import { WiDaySunny, WiDayCloudy, WiCloud, WiCloudy, WiFog, WiRainMix, WiRain, WiShowers, WiSnow, WiSnowflakeCold, WiDayRainMix, WiDaySnow } from 'weather-icons-react';

interface WeatherTimesProps {
  times: { time: string; temperature: number; weatherCondition: string }[];
}

const WeatherTimes: React.FC<WeatherTimesProps> = ({ times }) => {
  const getWeatherIcon = (condition: string) => {
    console.log("Weather condition:", condition);  
    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return <WiDaySunny size={24} color="#fff" />;
      case 'Partly cloudy':
      case 'Partly Cloudy':
        return <WiDayCloudy size={24} color="#fff" />;
      case 'Cloudy':
        return <WiCloud size={24} color="#fff" />;
      case 'Overcast':
        return <WiCloudy size={24} color="#fff" />;
      case 'Mist':
      case 'Fog':
        return <WiFog size={24} color="#fff" />;
      case 'Patchy rain possible':
      case 'Patchy rain nearby':
        return <WiDayRainMix size={24} color="#fff" />;
      case 'Light rain':
      case 'Patchy light rain':
      case 'Light rain shower':
        
        return <WiRain size={24} color="#fff" />;
      case 'Moderate rain':
      case 'Moderate rain at times':
        return <WiShowers size={24} color="#fff" />;
      case 'Heavy rain':
      case 'Heavy rain at times':
        return <WiRainMix size={24} color="#fff" />;
      case 'Patchy snow possible':
      case 'Patchy light snow':
        return <WiDaySnow size={24} color="#fff" />;
      case 'Light snow':
        return <WiSnow size={24} color="#fff" />;
      case 'Moderate snow':
        return <WiSnowflakeCold size={24} color="#fff" />;
      case 'Heavy snow':
        return <WiSnow size={24} color="#fff" />;
      default:
        return <WiDaySunny size={24} color="#fff" />;
    }
  };

  return (
    <div className="w-full flex gap-6 overflow-scroll">
      {times.map((weather, index) => (
        <div key={index} className="text-white text-center">
          <div className="text-xs font-bold mt-4">{weather.time}</div>
          <div className="h-8 w-8 mx-auto mt-4">{getWeatherIcon(weather.weatherCondition)}</div>
          <div className="text-lg my-4">{weather.temperature}°</div>
        </div>
      ))}
    </div>
  );
};

export default WeatherTimes;
