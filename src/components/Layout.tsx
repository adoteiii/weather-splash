"use client";

import {  fetchAndReturnOrderedLimit, fetchDoc } from "@/lib/firebase/fetchData";
import { writeToDoc } from "@/lib/firebase/firestore";
import { AuthorizationContext } from "@/lib/userContext";
import { setData } from "@/redux/features/dataSlice";
import { setLocation } from "@/redux/features/locationSlice";
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
    if (!location){
      throw 'No location'
    }
    let url: string = `https://api.weatherapi.com/v1/forecast.json?key=${
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
        if (searchHistory.map((item)=>item.location.name).indexOf(data_.location.name)!==-1){
          return
        }
        
        const uuid = v4()
        writeToDoc('searchHistory', uuid, {uid: user.uid, location: data_.location, timestamp: Date.now()}).then(()=>{
          fetchAndReturnOrderedLimit('searchHistory', 'uid', '==', user.uid, 'timestamp', 5, 'asc').then((data)=>{
            dispatch(setSearchHistory(data.reverse()))
            console.log(data)
          })
        })
        
        
      })
      .catch(() => {
        toast.error("Cannot find city");
      });
  }, [dispatch, location]);

  useEffect(()=>{
    if (loading){
      return
    }
    if (!user?.uid){
      
        dispatch(setLocation('Accra'));
        dispatch(setSearchHistory([]))
        dispatch(setUnits({temperature: 'C', pressure: 'inHg', visibilityUnit: 'km'}))
      
      return
    }
    
    // get preferences
    fetchDoc('preferences', user?.uid).then((data: UnitData)=>{
      dispatch(setUnits(data))
    })
    // get location history
    fetchAndReturnOrderedLimit('searchHistory', 'uid', '==', user.uid, 'timestamp', 5, 'asc').then((data)=>{
      dispatch(setSearchHistory(data.reverse()))
      
      console.log(data)
    })
    fetchDoc('location', user?.uid).then((data)=>{
      dispatch(setLocation(data.city))
    }).catch(()=>{
      dispatch(setLocation('Accra'));
    })
  }, [user, loading])
  return <></>;
};
