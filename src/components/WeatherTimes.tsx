import React from 'react';

interface WeatherTimesProps {
  times: { time: string; temperature: number; weatherCondition: string }[];
}

const WeatherTimes: React.FC<WeatherTimesProps> = ({ times }) => {


  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return '/assets/sunny.svg'; 
      case 'Partly cloudy':
        return '/assets/partly_cloudy.svg'; 
      case 'Cloudy':
        return '/assets/cloudy.svg'; 
      case 'Overcast':
        return '/assets/overcast.svg'; 
      case 'Mist':
        return '/assets/mist.svg'; 
      case 'Patchy rain possible':
        return '/assets/patchy_rain.svg'; 
      case 'Light rain':
        return '/assets/light_rain.svg'; 
      case 'Moderate rain':
        return '/assets/moderate_rain.svg'; 
      case 'Heavy rain':
        return '/assets/heavy_rain.svg'; 
      case 'Patchy snow possible':
        return '/assets/patchy_snow.svg'; 
      case 'Light snow':
        return '/assets/light_snow.svg'; 
      case 'Moderate snow':
        return '/assets/moderate_snow.svg'; 
      case 'Heavy snow':
        return '/assets/heavy_snow.svg'; 
      default:
        return '/assets/sun.svg'; 
    }
  };

  return (
    <div className="w-full flex justify-between">
        
      {times.map((weather, index) => (
        <div key={index} className="text-white text-center">
          <div className="text-xs font-bold mt-4">{weather.time}</div>
          <img src={getWeatherIcon(weather.weatherCondition)} alt={weather.weatherCondition} className="h-8 w-8 mx-auto mt-4" />
          <div className="text-lg my-4">{weather.temperature}°</div>
        </div>
      ))}
    </div>
  );
};

export default WeatherTimes;
