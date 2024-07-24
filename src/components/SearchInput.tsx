"use client";
import { FiMapPin } from 'react-icons/fi';
import { setLocation } from "@/redux/features/locationSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from 'next-themes';
import { Input } from './ui/input';

interface SearchInputProps {}

type SearchResult = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}[];

const SearchInput: React.FC<SearchInputProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const location = useAppSelector((state) => state.LocationReducer.value);
  const [search, setSearch] = useState(location);
  const [searchResults, setSearchResults] = useState<SearchResult | null | undefined>();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  const selectItem = (item: string) => {
    setSearchResults(null);
    dispatch(setLocation(item));
    // setSearch(item);
    // setShowSuggestions(false); // Hide suggestions on selection
  };

  useEffect(()=>{
    if (search!==location){
      setSearch(location)
      setShowSuggestions(false)
    }
  }, [location])

  const querySearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY}&q=${search}&days=7`
    )
      .then(async (data) => {
        let res = await data.json();
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
    if (searchResults === null) {
      setSearchResults(undefined);
      return;
    }

    const timeoutId = setTimeout(querySearch, 1200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div className="flex w-full justify-between items-center flex-1 sm:w-auto gap-4 sm:mt-0 flex-wrap sm:flex-nowrap">
      <div className="flex flex-col">
        <div className="relative flex justify-between">
          {/* <img
            className="w-4 h-4"
            alt="Magnifyingglass"
            src="/assets/magnifyingglass-1.svg"
          /> */}
          <Input
            type="text"
            placeholder="Search City..."
            onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
            onBlur={() => setShowSuggestions(false)} // Hide suggestions on blur
            value={search}
            onChange={(e) => {
              setShowSuggestions(true)
              setSearch(e.currentTarget.value)}}
           
          />
        </div>
        {showSuggestions && searchResults && (
          <div className="absolute overflow-scroll z-50 min-h-[150px] max-h-[200px] sm:w-[400px] w-full rounded-2xl mt-10 bg-black/90 border-b-2 px-2 py-2 border-gray-800 suggestion-box">
            {searchResults.map((res) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectItem(res.name);
                }}
                className="px-3 gap-2 flex flex-col border-b-[0.1px] border-b-white/10 border-t-[0.1px] border-t-white/10 py-2 hover:bg-white/10 hover:cursor-pointer"
                key={res.id}
              >
                <h1>{res.name}</h1>
                <div className="flex gap-2 items-center">
                  <FiMapPin />
                  <p>{res.region}, {res.country}</p>
                </div>
              </div>
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

export default SearchInput;
