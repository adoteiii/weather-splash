import React from 'react';

interface UVIndexProps {
  index: number;
}

const UVIndex: React.FC<UVIndexProps> = ({ index }) => (
  <div className="h-[120px] bg-[#2e2e2e80] pt-2 rounded-2xl">
    <h1 className="text-center text-white text-xl font-bold">UV Index</h1>
    <p className="text-center text-white text-3xl">{index}</p>
    <p className="text-center text-white text-sm">Low for the rest of the day.</p>
  </div>
);

export default UVIndex;
