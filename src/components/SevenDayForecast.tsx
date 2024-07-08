import React from 'react';

interface SevenDayForecastProps {
  sevenDayForecast: {
    day: string;
    minTemperature: number;
    maxTemperature: number;
    weatherCondition: string;
    weatherIcon: string;
    precipitation: number;
  }[];
}

const SevenDayForecast: React.FC<SevenDayForecastProps> = ({ sevenDayForecast }) => {
  return (
    <div className="text-white p-4">
      <h3 className="text-sm font-bold mb-2">7-Day Weather Forecast</h3>
      <div className="divide-y divide-gray-700">
        {sevenDayForecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-[2px]">
            <p className="text-white">{day.day}</p>
            <div className="px-4  items-center">
              <img src={day.weatherIcon} alt={day.weatherCondition} className="w-6 h-6" />
              {day.precipitation > 50 && (
                <p className="text-cyan-200 font-bold text-[10px] ml-1">{day.precipitation}%</p>
              )}
            </div>
            <p className="text-gray-300">{day.minTemperature}°</p>
            <div className="w-full h-1 bg-gray-600 mx-2 relative">
              <div
                className="h-1 bg-orange-500 absolute"
                style={{
                  left: `${((day.minTemperature - 20) / (35 - 20)) * 100}%`,
                  right: `${((35 - day.maxTemperature) / (35 - 20)) * 100}%`,
                }}
              />
            </div>
            <p className="text-gray-300">{day.maxTemperature}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenDayForecast;
