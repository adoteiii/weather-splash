import React, {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "./Input";
import { useAppSelector } from "@/redux/store";
import { ModeToggle } from "./ui/ModeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { AuthorizationContext } from "@/lib/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Edit, Settings } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut, updateProfile } from "@/lib/firebase/auth";
import { uploadImage } from "@/lib/firebase/storage";
import toast from "react-hot-toast";

interface NavbarProps {
  alerts: any[];
  onAlertIconClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ alerts, onAlertIconClick }) => {
  const data = useAppSelector((state) => state.DataReducer.value);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [billingDialogOpen, setBillingDialogOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);
  const handleSearch = () => {
    console.log("event");
  };

  const { user, loading } = useContext(AuthorizationContext);
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (
        !profileDialogOpen ||
        dropdown.current.contains(target) ||
        trigger?.current?.contains(target)
      )
        return;
      setProfileDialogOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [profileDialogOpen]);

  return data !== undefined ? (
    <>
      {profileDialogOpen && (
        <div className="fixed left-0 h-screen flex justify-center items-center w-full top-0 bg-black/60 z-[2000] ">
          <div
            ref={dropdown}
            className="dark:bg-black bg-white w-full max-w-[800px] rounded-xl border p-5"
          >
            <div className="relative flex w-full items-center justify-center">
              <Image
                alt="profile image full"
                width={800}
                height={800}
                className="w-64 h-64 rounded-full object-cover"
                src={user?.photoURL || "/assets/person-fill-1.svg"}
              ></Image>
              <input
                type="file"
                onChange={(e) => {
                  if (e.currentTarget.files?.[0] && user?.uid) {
                    uploadImage(
                      "profile/" + user.uid,
                      e.currentTarget.files?.[0],
                      (progress) => {
                        console.log(progress, "prgress");
                        toast(`Uploading ${progress * 100}%`, {
                          id: "upload-toaster",
                        });
                      },
                      (error) => {},
                      (fp, url) => updateProfile(user, undefined, url)
                    );
                  }
                }}
                className="absolute h-full opacity-0 bg-transparent text-transparent "
              ></input>
            </div>
            <div className="mt-10 px-20 flex gap-2 flex-col">
              <p className="text-md font-bold">User Location</p>
              <div className="flex gap-3 items-center">
                <Edit className="text-gray-400"></Edit>
                <input
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-2"
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="my-8 px-20 flex gap-2 flex-col">
              <p className="text-md font-bold">User Preferences</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <p>Temperature Units</p>
                </div>
                <div>
                  <p>Pressure Units</p>
                </div>
                <div>
                  <p>Length Units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav className="top-0 py-3 z-[1000] w-full">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Link href="/" className="hover:cursor-pointer">
              <Image
                height={32}
                width={32}
                src="/assets/weatherSplashLogo.svg"
                alt="Logo"
                unoptimized
                className="h-8 w-auto cursor-pointer ml-4 sm:ml-0 sm:justify-center"
              />
            </Link>

            <div className="flex justify-around gap-4 sm:gap-0 items-center w-full sm:w-auto sm:mt-0 flex-wrap sm:flex-nowrap">
              <Input />

              <div className="flex justify-center w-full sm:w-auto sm:mt-0 h-8 items-center px-8 text-white">
                <ModeToggle />
              </div>

              <div className="relative flex justify-center w-full sm:w-auto  sm:mt-0 h-8 items-center px-2 text-white">
                <img
                  className="w-4 h-4"
                  alt="notifications"
                  src="assets/notification-bell.png"
                  onClick={onAlertIconClick}
                />
                {alerts.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {alerts.length}
                  </span>
                )}
              </div>

              <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-white">
                {/* <Link href="/signup" className="w-4 h-4">
               
            </Link> */}

                {!loading && user === null ? (
                  <Popover>
                    <PopoverTrigger>
                      <img
                        className="w-4 h-4"
                        alt="person"
                        src="assets/person-fill-1.svg"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-4">
                        <Button>
                          <Link href="/login" className="">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Login
                              </h4>
                            </div>
                          </Link>
                        </Button>

                        <Button>
                          <Link href="/signup" className="">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Sign up
                              </h4>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline">
                        <Image
                          width={40}
                          height={40}
                          className="w-6 h-6 rounded-full"
                          alt="profile photo"
                          src={user?.photoURL || "/assets/person-fill-1.svg"}
                        ></Image>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel style={{ padding: "4px" }}>
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        ref={trigger}
                        className="group-hover:cursor-pointer"
                        onClick={() => {
                          setProfileDialogOpen(true);
                        }}
                        style={{ padding: "4px" }}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setBillingDialogOpen(true);
                        }}
                        style={{ padding: "4px" }}
                      >
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        style={{ padding: "4px" }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  ) : (
    <div></div>
  );
};

export default Navbar;
