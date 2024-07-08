"use client";

import React, { useState } from 'react';

interface InputProps {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  locationName: string;
  searchQuery: string;
}

const Input: React.FC<InputProps> = ({ handleSearch, setLocation, locationName, searchQuery }) => {
  return (
    <div className="flex justify-around items-center w-full sm:w-auto mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
      <div className="flex justify-center w-full sm:w-[280px] bg-[#2e2e2e] rounded-3xl h-8 items-center px-2">
        <img className="w-4 h-4" alt="Magnifyingglass" src="/assets/magnifyingglass-1.svg" />
        <input
          type="text"
          placeholder="Search City..."
          onKeyDown={handleSearch}
          value={searchQuery}
          onChange={(e) => setLocation(e.target.value)}
          className="ml-2 bg-transparent border-none text-white text-xs focus:outline-none w-full"
        />
        <button onClick={(e) => handleSearch(e)} className="ml-2 text-xs text-white">
          Search
        </button>
      </div>

      <div className="flex justify-center w-full sm:w-[280px] mt-4 sm:mt-0 h-8 items-center px-2 text-white">
        <img className="w-4 h-4" alt="location" src="/assets/layer-1.svg" />
        {locationName && (
          <span className="ml-2 text-xs">{locationName}</span>
        )}
      </div>
    </div>
  );
}

export default Input;
