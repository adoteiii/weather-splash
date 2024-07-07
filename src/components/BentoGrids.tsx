import React from 'react';
import WeatherTimes from './WeatherTimes';

interface BentoGridsProps {
  locationName: string;
  temperature: number | null;
  weatherDescription: string;
  shortNote: string;
  weatherTimes: { time: string; temperature: number; weatherCondition: string }[];
}

const BentoGrids: React.FC<BentoGridsProps> = ({ locationName, temperature, weatherDescription, shortNote, weatherTimes }) => {
  return (
    <div className="relative w-[927px] h-[624px]">
      <div className="w-full h-full top-0 left-0 grid grid-cols-3 grid-rows-3 gap-4 p-4">
        <div className="col-span-2 h-48 bg-[#2e2e2e80] rounded-2xl p-4">
          <div className="text-white  font-normal text-start text-xs">{weatherDescription}</div>
          <WeatherTimes times={weatherTimes} />
        </div>
        <div className="h-96 bg-[#2e2e2e80] rounded-2xl flex justify-center items-center">
          <span className="text-white text-xs font-normal">Precipitation Map</span>
        </div>
        <div className="col-span-1 h-[390px] bg-[#2e2e2e80] rounded-2xl"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
          <div className="h-[120px] bg-[#2e2e2e80] rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrids;
