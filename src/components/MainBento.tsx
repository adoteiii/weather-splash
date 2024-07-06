import React from "react";

const MainBento = () => {
  return (
    <div className="flex justify-center items-center h-[184px]">
      <div className="w-64 h-full rounded-3xl bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col justify-between p-4">
        <div className="text-white text-2xl font-medium text-center">
          My Location
        </div>
        
        <div className="text-white text-5xl font-normal flex flex-col items-center">
        <span className="text-xs font-bold ">KUMASI</span>
        <span>32°</span>
          
        </div>
        <div className="text-white text-base font-normal text-center">
          Mostly Cloudy
        </div>
      </div>
    </div>
  );
};

export default MainBento;
