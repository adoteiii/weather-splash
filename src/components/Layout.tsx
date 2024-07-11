"use client";

import { setData } from "@/redux/features/dataSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const LayoutManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const location = useAppSelector((state) => state.LocationReducer.value);

  const fetchData = async () => {
    let url: string = `http://api.weatherapi.com/v1/forecast.json?key=${
      process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY
    }&q=${
      location
    }&days=7&aqi=yes&alerts=yes`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    // fetch the data
    fetchData()
      .then((data) => {
        dispatch(setData(data));
      })
      .catch(() => {
        toast.error("Cannot find city");
      });
  }, [dispatch, location]);
  return <></>;
};
