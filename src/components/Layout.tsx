"use client";

import { fetchAndReturn, fetchAndReturnOrderedLimit, fetchDoc } from "@/lib/firebase/fetchData";
import { writeToDoc } from "@/lib/firebase/firestore";
import { AuthorizationContext } from "@/lib/userContext";
import { setData } from "@/redux/features/dataSlice";
import { setSearchHistory } from "@/redux/features/searchHistorySlice";
import { setUnits } from "@/redux/features/unitSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { UnitData, WeatherData } from "@/types/data";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

export const LayoutManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const searchHistory = useAppSelector(state=>state.SearchHistoryReducer.value)
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
        writeToDoc('searchHistory', v4(), {uid: user.uid, location: data_.location, timestamp: Date.now()})
        dispatch(setSearchHistory([{uid: user.uid, location: data_.location, timestamp: Date.now()}, ...searchHistory]))
      })
      .catch(() => {
        toast.error("Cannot find city");
      });
  }, [dispatch, location]);

  useEffect(()=>{
    if (!user?.uid){
      return
    }
    // get preferences
    fetchDoc('preferences', user?.uid).then((data: UnitData)=>{
      dispatch(setUnits(data))
    })
    // get location history
    fetchAndReturnOrderedLimit('searchHistory', 'uid', '==', user.uid, 'timestamp', 5).then((data)=>{
      dispatch(setSearchHistory(data))
      console.log(data)
    })
  }, [user])
  return <></>;
};
