import { useAppSelector } from '@/redux/store';
import React from 'react';

// interface MainBentoProps {
//   locationName: string;
//   temperature: number;
//   weatherDescription: string;
//   shortNote: string;
// }

const MainBento: React.FC = () => {
  const data = useAppSelector(state=>state.DataReducer.value)
  const units = useAppSelector(state=>state.UnitReducer.value)
  const getGradientColor = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'from-yellow-300 to-orange-400';
      case 'partly cloudy':
        return 'from-blue-200 to-gray-300';
      case 'cloudy':
        return 'from-gray-300 to-gray-500';
      case 'overcast':
        return 'from-gray-400 to-gray-600';
      case 'mist':
      case 'fog':
        return 'from-gray-300 to-gray-500';
      case 'patchy rain possible':
      case 'patchy light rain':
      case 'patchy rain ahead':
        return 'from-blue-200 to-gray-400';
      case 'light rain':
      case 'light drizzle':
        return 'from-blue-300 to-blue-500';
      case 'moderate rain':
        return 'from-blue-400 to-blue-600';
      case 'heavy rain':
        return 'from-blue-600 to-blue-800';
      case 'patchy snow possible':
      case 'light snow':
        return 'from-blue-100 to-gray-300';
      case 'moderate snow':
        return 'from-blue-200 to-gray-400';
      case 'heavy snow':
        return 'from-blue-300 to-gray-500';
      case 'thunderstorm':
      case 'thundery outbreaks possible':
        return 'from-purple-500 to-gray-700';
      case 'blizzard':
        return 'from-blue-200 to-gray-100';
      case 'freezing fog':
        return 'from-blue-100 to-gray-300';
      case 'patchy freezing drizzle possible':
        return 'from-blue-200 to-gray-400';
      default:
        return 'from-blue-200 to-blue-400';
    }
  };

  return (
    
    data?<div className="flex justify-center items-center h-[184px]">
      <div className={`w-64 h-full rounded-3xl bg-gradient-to-b ${getGradientColor(data?.current?.condition?.text)} flex flex-col justify-between p-4`}>
        <div className="text-white text-2xl font-medium text-center">
          My Location
        </div>
        <div className="text-white text-5xl font-normal flex flex-col items-center">
          <span className="text-xs font-bold">{data?.location?.name?.toUpperCase()}</span>
          <span>{Math.round(units.temperature==='C'?data?.current?.temp_c: data?.current?.temp_f)}°</span>
        </div>
        <div className="text-white text-base font-normal text-center">
          {data?.forecast?.forecastday?.[0].day?.condition?.text}
        </div>
      </div>
    </div>:<div></div>
  );
};

export default MainBento;
