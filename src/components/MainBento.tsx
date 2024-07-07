import React from 'react';

interface MainBentoProps {
  locationName: string;
  temperature: number | null;
  weatherDescription: string;
}

const MainBento: React.FC<MainBentoProps> = ({ locationName, temperature, weatherDescription }) => {
  return (
    <div className="flex justify-center items-center h-[184px]">
      <div className="w-64 h-full rounded-3xl bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col justify-between p-4">
        <div className="text-white text-2xl font-medium text-center">
          My Location
        </div>
        <div className="text-white text-5xl font-normal flex flex-col items-center">
          <span className="text-xs font-bold ">{locationName.toUpperCase()}</span>
          <span>{temperature}°</span>
        </div>
        <div className="text-white text-base font-normal text-center">
          {weatherDescription}
        </div>
      </div>
    </div>
  );
};

export default MainBento;
