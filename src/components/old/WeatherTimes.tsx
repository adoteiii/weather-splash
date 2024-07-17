import React from 'react';

interface WeatherTimesProps {
  times: { time: string; temperature: number; weatherCondition: string }[];
}

const WeatherTimes: React.FC<WeatherTimesProps> = ({ times }) => {
  const getWeatherIconUrl = (condition: string) => {
    const conditionMap: { [key: string]: string } = {
      'Sunny': '113', // example icon code for sunny
      'Clear': '113',
      'Partly cloudy': '116',
      'Partly Cloudy': '116',
      'Cloudy': '119',
      'Overcast': '122',
      'Mist': '143',
      'Fog': '248',
      'Patchy rain possible': '176',
      'Patchy rain nearby': '176',
      'Light rain': '296',
      'Patchy light rain': '293',
      'Light rain shower': '353',
      'Moderate rain': '302',
      'Moderate rain at times': '299',
      'Heavy rain': '308',
      'Heavy rain at times': '305',
      'Patchy snow possible': '179',
      'Patchy light snow': '323',
      'Light snow': '326',
      'Moderate snow': '329',
      'Heavy snow': '332',
    };
    
    const iconCode = conditionMap[condition] || '113'; // default to sunny if not found
    return `https://cdn.weatherapi.com/weather/64x64/day/${iconCode}.png`;
  };

  return (
    <div className="w-full flex gap-6 overflow-hidden suggestion-box">
      {times.map((weather, index) => (
        <div key={index} className="text-white text-center">
          <div className="text-xs font-bold mt-4">{weather.time}</div>
          <div className="h-8 w-8 mx-auto mt-4">
            <img src={getWeatherIconUrl(weather.weatherCondition)} alt={weather.weatherCondition} />
          </div>
          <div className="text-lg my-4">{weather.temperature}°</div>
        </div>
      ))}
    </div>
  );
};

export default WeatherTimes;
