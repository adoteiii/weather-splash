"use client";

import { writeToDoc } from "@/lib/firebase/firestore";
import { AuthorizationContext } from "@/lib/userContext";
import { setData } from "@/redux/features/dataSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { WeatherData } from "@/types/data";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

export const LayoutManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const location = useAppSelector((state) => state.LocationReducer.value);
  const {user, loading} = useContext(AuthorizationContext)
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
      .then((data_: WeatherData) => {
        dispatch(setData(data_));
        if (!user?.uid){
          return
        }
        writeToDoc('searchHistory', v4(), {uid: user.uid, location: data_.location})
      })
      .catch(() => {
        toast.error("Cannot find city");
      });
  }, [dispatch, location]);
  return <></>;
};
