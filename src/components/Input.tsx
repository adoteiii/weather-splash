"use client";

import { setLocation } from '@/redux/features/locationSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface InputProps {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

const Input: React.FC<InputProps> = ({ handleSearch }) => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useAppSelector((state)=>state.DataReducer.value)
  const location = useAppSelector(state=>state.LocationReducer.value)
  const [search, setSearch] = useState(location)

  const selectItem = (item: string)=>{
    dispatch(setLocation(item))
  }

  useEffect(()=>{
    if (!search || search.length < 3){
      return
    }
    
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${search}&days=7`
    ).then(async (data)=>{
      let res = await data.json()
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    });

  }, [search])
  return (
    <div className="flex justify-around items-center flex-1 sm:w-auto mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
      <div className="flex justify-between w-full sm:w-[280px] bg-[#2e2e2e] rounded-3xl h-8 items-center px-4 py-2">
        <img className="w-4 h-4" alt="Magnifyingglass" src="/assets/magnifyingglass-1.svg" />
        <input
          type="text"
          placeholder="Search City..."
          onKeyDown={handleSearch}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="ml-2 bg-transparent border-none text-white text-xs focus:outline-none flex-1"
        />
        <button onClick={(e) => handleSearch(e)} className=" pr-4 text-xs text-white">
          Search
        </button>
      </div>

      <div className="flex justify-center w-full sm:w-[280px] mt-4 sm:mt-0 h-8 items-center px-2 text-white">
        <img className="w-4 h-4" alt="location" src="/assets/layer-1.svg" />
        {data?.location?.name && (
          <span className="ml-2 text-xs">{data.location.name}</span>
        )}
      </div>
    </div>
  );
}

export default Input;
