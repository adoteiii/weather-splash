"use client";

import { OTHER_LARGE_CITIES } from "@/lib/config";
import { setLocation } from "@/redux/features/locationSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function OtherLargeCities() {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (item: {
    city: string;
    country: string;
    coord: {
      lat: string;
      lon: string;
    };
  }) => {
    console.log('new', item)
    dispatch(setLocation(item.city))
  };
  return (
    <div className="relative order-last hidden h-[25rem] w-full flex-col justify-between lg:block">
      <h3 className="py-3 font-semibold">Other large cities</h3>
      <div className="flex flex-col space-y-3.5">
        {OTHER_LARGE_CITIES.map((item) => (
          <button
            key={item.city}
            onClick={() => {
              handleClick(item);
            }}
            className="rounded-lg border bg-card px-6 py-4 text-card-foreground shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
}
