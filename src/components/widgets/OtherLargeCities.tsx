"use client";

import { setLocation } from "@/redux/features/locationSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function OtherLargeCities() {
  const dispatch = useDispatch<AppDispatch>();
  const searchHistory = useAppSelector(
    (state) => state.SearchHistoryReducer.value
  );
  const handleClick = (item: {
    city: string;
    country: string;
    coord: {
      lat: string;
      lon: string;
    };
  }) => {
    console.log("new", item);
    dispatch(setLocation(item.city));
  };
  return (
    <div className="relative order-last hidden h-[25rem] w-full flex-col justify-between lg:block">
      <h3 className="py-3 font-semibold">Recent History</h3>
      <div className="flex flex-col space-y-3.5">
        {searchHistory.length > 0 ? (
          searchHistory
            .map((item) => {
              return {
                city: item.location.name,
                country: item.location.country,
                coord: {
                  lat: item.location.lat.toString(),
                  lon: item.location.lon.toString(),
                },
              };
            })
            .map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleClick(item);
                }}
                className="rounded-lg border bg-card px-6 py-4 text-card-foreground shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {item.city}
              </button>
            ))
        ) : (
          <div>
            <p className="text-sm italic py-3">Nothing to show yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
