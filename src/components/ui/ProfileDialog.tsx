import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Edit, Camera } from "lucide-react"; // Add Camera icon import
import toast from "react-hot-toast";
import { AuthorizationContext } from "@/lib/userContext";
import { uploadImage } from "@/lib/firebase/storage";
import { updateProfile } from "@/lib/firebase/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Button } from "./button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUnits } from "@/redux/features/unitSlice";
import { UnitData } from "@/types/data";
import { writeToDoc } from "@/lib/firebase/firestore";
import { setUserLocation } from "@/redux/features/userLocationSlice";
import { FiMapPin } from "react-icons/fi";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
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

const ProfileDialog: React.FC<ProfileDialogProps> = ({ open, onClose }) => {
  const { user } = useContext(AuthorizationContext);
  const units = useAppSelector((state) => state.UnitReducer.value);
  const dispatch = useDispatch<AppDispatch>();
  const data = useAppSelector((state) => state.DataReducer.value);
  const location = useAppSelector((state) => state.UserLocationReducer.value);
  const [search, setSearch] = useState(location);
  const [searchResults, setSearchResults] = useState<
    SearchResult | null | undefined
  >();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectItem = (item: string) => {
    setSearchResults(null);
    // update user loc
    
    writeToDoc('location', user?.uid, {city: item}).then(()=>{
      dispatch(setUserLocation(item));
    })
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

  const handleUnitChange = (
    temperature: string | undefined,
    pressure: string | undefined,
    visibility: string | undefined
  ) => {
    const unit = {
      temperature: temperature || units.temperature,
      pressure: pressure || units.pressure,
      visibilityUnit: visibility || units.visibilityUnit,
    };
    dispatch(setUnits(unit as UnitData));
    if (!user?.uid) {
      return;
    }
    writeToDoc("preferences", user?.uid, unit);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Manage your profile settings</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center w-full h-full">
  <div className="relative w-24 h-24">
    <Image
      alt="profile image full"
      width={800}
      height={800}
      className="w-24 h-24 rounded-full object-cover"
      src={user?.photoURL || "/assets/person-fill-1.svg"}
    />
    <div className="absolute inset-0 flex items-center justify-center bg-[#010101] bg-opacity-40 rounded-full">
      <Camera className="text-white" size={48} />
      <input
        type="file"
        onChange={(e) => {
          if (e.currentTarget.files?.[0] && user?.uid) {
            uploadImage(
              "profile/" + user.uid,
              e.currentTarget.files?.[0],
              (progress) => {
                console.log(progress, "progress");
                toast(`Uploading ${progress * 100}%`, {
                  id: "upload-toaster",
                });
              },
              (error) => {},
              (fp, url) => updateProfile(user, undefined, url)
            );
          }
        }}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>
</div>
        <div className="relative mt-10 px-20 flex gap-2 flex-col">
          <p className="text-md font-semibold">User Location</p>
          <div className="flex gap-3 items-center">
            <Edit className="text-current" />
            <Input
              placeholder="Enter Location"
              type="text"
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
          <div className="absolute z-50 top-full w-auto left-[100px]  mt-1 bg-gray-900 rounded-md shadow-lg overflow-scroll ">
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
        <div className="my-8 px-20 flex gap-2 flex-col">
          <p className="text-md font-semibold">User Preferences</p>
          <div className="flex items-center gap-6 flex-wrap">
            <Select
              value={units.temperature}
              onValueChange={(e) => handleUnitChange(e, undefined, undefined)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Temperature Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C">°C</SelectItem>
                <SelectItem value="F">°F</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={units.pressure}
              onValueChange={(e) => handleUnitChange(undefined, e, undefined)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pressure Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inHg">inHg</SelectItem>
                <SelectItem value="hPa">hPa</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={units.visibilityUnit}
              onValueChange={(e) => handleUnitChange(undefined, undefined, e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Visibility Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">km</SelectItem>
                <SelectItem value="mi">mi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
