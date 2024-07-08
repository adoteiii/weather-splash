import React from 'react';

interface MainBentoProps {
  locationName: string;
  temperature: number;
  weatherDescription: string;
  shortNote: string;
}

const MainBento: React.FC<MainBentoProps> = ({ locationName, temperature, weatherDescription, shortNote }) => {
  const getGradientColor = (description: string) => {
    switch (description) {
      case 'Sunny':
      case 'Clear':
        return 'from-yellow-400 to-orange-500';
      case 'Partly cloudy':
        return 'from-gray-300 to-gray-500';
      case 'Cloudy':
        return 'from-gray-400 to-gray-600';
      case 'Overcast':
        return 'from-gray-500 to-gray-700';
      case 'Mist':
        return 'from-gray-600 to-gray-800';
      case 'Patchy rain possible':
      case 'Light rain':
      case 'Moderate rain':
      case 'Heavy rain':
        return 'from-blue-400 to-blue-600';
      case 'Patchy snow possible':
      case 'Light snow':
      case 'Moderate snow':
      case 'Heavy snow':
        return 'from-blue-100 to-blue-300';
      default:
        return 'from-blue-200 to-blue-400';
    }
  };

  return (
    <div className="flex justify-center items-center h-[184px]">
      <div className={`w-64 h-full rounded-3xl bg-gradient-to-b ${getGradientColor(weatherDescription)} flex flex-col justify-between p-4`}>
        <div className="text-white text-2xl font-medium text-center">
          My Location
        </div>
        <div className="text-white text-5xl font-normal flex flex-col items-center">
          <span className="text-xs font-bold">{locationName.toUpperCase()}</span>
          <span>{temperature}°</span>
        </div>
        <div className="text-white text-base font-normal text-center">
          {shortNote}
        </div>
      </div>
    </div>
  );
};

export default MainBento;
