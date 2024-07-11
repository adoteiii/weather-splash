"use client";

import { setLocation } from "@/redux/features/locationSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface InputProps {

}

type SearchResult = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}[];

const Input: React.FC<InputProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const location = useAppSelector((state) => state.LocationReducer.value);
  const [search, setSearch] = useState(location);
  const [searchResults, setSearchResults] = useState<SearchResult|null|undefined>();
  
  const selectItem = (item: string) => {
    console.log('item setting', item)
    setSearchResults(null)
    dispatch(setLocation(item));
    // 
    setSearch(item)
  };

  const querySearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${search}&days=7`
    )
      .then(async (data) => {
        let res = await data.json();
        console.log(res);
        setSearchResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!search || search.length < 3) {
      return;
    }
    if (searchResults===null){
      setSearchResults(undefined)
      return
    }
    

    const timeoutId = setTimeout(querySearch, 1200)
    return ()=>{
      clearTimeout(timeoutId)
    }
  }, [search]);
  return (
    <div className="flex w-full justify-between items-center flex-1 sm:w-auto gap-4 sm:mt-0 flex-wrap sm:flex-nowrap">
      <div className="flex flex-col">
        <div className="relative flex justify-between bg-[#2e2e2e] rounded-3xl h-8 items-center px-4 py-2">
          <img
            className="w-4 h-4"
            alt="Magnifyingglass"
            src="/assets/magnifyingglass-1.svg"
          />
          <input
            type="text"
            placeholder="Search City..."
            onKeyDown={()=>{

            }}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="ml-2 bg-transparent border-none text-white text-xs focus:outline-none flex-1"
          />
          
        </div>
        {searchResults && (
          <div  className="absolute z-50 min-h-[150px] max-h-[200px] overflow-scroll  mt-10 w-full bg-black/90 border-b-2 px-2 py-2 border-gray-800">
            {searchResults.map((res) => (
              <p onClick={(e)=>{
                e.preventDefault()
                selectItem(res.name)
              }} className="px-3 border-b-[0.1px] border-b-white/10 py-2 hover:bg-white/10 hover:cursor-pointer" key={res.id}>{res.name}</p>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center flex-1 sm:mt-0 h-8 items-center px-2 text-white">
        <img className="w-4 h-4" alt="location" src="/assets/layer-1.svg" />
        {data?.location?.name && (
          <span className="ml-2 text-xs">{data.location.name}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
