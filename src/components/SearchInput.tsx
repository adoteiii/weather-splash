"use client";
import { FiMapPin } from "react-icons/fi";
import { setLocation } from "@/redux/features/locationSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";

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
  const [searchResults, setSearchResults] = useState<
    SearchResult | null | undefined
  >();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  const selectItem = (item: string) => {
    setSearchResults(null);
    dispatch(setLocation(item));
    // setSearch(item);
    // setShowSuggestions(false); // Hide suggestions on selection
  };

  useEffect(() => {
    if (search !== location) {
      setSearch(location);
      setShowSuggestions(false);
    }
  }, [location]);

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
              setShowSuggestions(true);
              setSearch(e.currentTarget.value);
            }}
          />
        </div>
        {showSuggestions && searchResults && (
          <div className="absolute z-50 top-24 w-48  mt-1 bg-gray-900 rounded-md shadow-lg overflow-hidden">
            {searchResults.map((res) => (
              <div
                key={res.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectItem(res.name);
                }}
                className="px-3 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-150 ease-in-out"
              >
                <h3 className="text-sm font-medium text-white">{res.name}</h3>
                <div className="flex items-center mt-0.5 text-xs text-gray-400">
                  <FiMapPin className="mr-1" size={10} />
                  <span>
                    {res.region}, {res.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center flex-1 sm:mt-0 h-8 items-center px-2 text-gray-800 dark:text-gray-200">
        <img
          className="w-6 h-6 dark:invert"
          alt="location"
          src="/assets/locationcircle.svg"
        />
        {data?.location?.name && (
          <span className="ml-2 text-sm">{data.location.name}</span>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
