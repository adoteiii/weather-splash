import React, { useContext, useRef, useState } from "react";
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
  } from "@/components/ui/select"
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUnits } from "@/redux/features/unitSlice";
import { UnitData } from "@/types/data";
import { writeToDoc } from "@/lib/firebase/firestore";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ open, onClose }) => {
  const { user } = useContext(AuthorizationContext);
  const [userLocation, setUserLocation] = useState("");
  const units = useAppSelector(state=>state.UnitReducer.value)
  const dispatch = useDispatch<AppDispatch>()

  const handleUnitChange = (temperature: string|undefined, pressure: string|undefined, visibility: string|undefined) => {
    const unit = {
      temperature: temperature||units.temperature,
      pressure: pressure||units.pressure,
      visibilityUnit: visibility||units.visibilityUnit
    }
    dispatch(setUnits(unit as UnitData))
    if (!user?.uid){
      return
    }
    writeToDoc('preferences', user?.uid, unit)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Manage your profile settings</DialogDescription>
        </DialogHeader>
        <div className="relative flex w-full items-center justify-center">
          <Image
            alt="profile image full"
            width={800}
            height={800}
            className="w-24 h-24 rounded-full object-cover"
            src={user?.photoURL || "/assets/person-fill-1.svg"}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#010101] bg-opacity-50 rounded-full">
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
            className="absolute h-24 w-24 opacity-0 bg-transparent text-transparent"
          />
          </div>
          
        </div>
        <div className="mt-10 px-20 flex gap-2 flex-col">
          <p className="text-md font-semibold">User Location</p>
          <div className="flex gap-3 items-center">
            <Edit className="text-white" />
            <Input
              placeholder="Enter Location"
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="my-8 px-20 flex gap-2 flex-col">
            
          <p className="text-md font-semibold">User Preferences</p>
          <div className="flex items-center gap-6 flex-wrap">
          <Select value={units.temperature} onValueChange={(e)=>handleUnitChange(e, undefined, undefined)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Temperature Unit" />
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="C">°C</SelectItem>
                <SelectItem value="F">°F</SelectItem>
             </SelectContent>
          </Select>
          <Select value={units.pressure} onValueChange={(e)=>handleUnitChange(undefined, e, undefined)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pressure Unit" />
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="inHg">inHg</SelectItem>
                <SelectItem value="hPa">hPa</SelectItem>
             </SelectContent>
          </Select>
          <Select value={units.visibilityUnit} onValueChange={(e)=>handleUnitChange(undefined, undefined, e)}>
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
          <Button
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
