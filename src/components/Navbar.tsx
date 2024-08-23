import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
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
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut } from "@/lib/firebase/auth";
import ProfileDialog from "./ui/ProfileDialog";
import { useTheme } from 'next-themes';
import WeatherNotifications from './widgets/WeatherNotifications'
import { Location, WeatherApiCurrentData } from "@/lib/types";

interface NavbarProps {
  alerts: any[];
  onAlertIconClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ alerts, onAlertIconClick }) => {
  const data = useAppSelector((state) => state.DataReducer.value) as WeatherApiCurrentData;
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user, loading } = useContext(AuthorizationContext);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const currentLocation: Location | null = data && data.location ? {
    lon: data.location.lon,
    lat: data.location.lat,
    city: data.location.name,
    coord: {
      lon: data.location.lon.toString(),
      lat: data.location.lat.toString()
    }
  } : null;

  return data !== undefined ? (
    <>
      <ProfileDialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} />
      <nav className="top-0 py-3 z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left section */}
            <div className="flex items-center">
              <Link href="/" className="hover:cursor-pointer">
                <Image
                  height={32}
                  width={32}
                  src="https://firebasestorage.googleapis.com/v0/b/weather-splash.appspot.com/o/logo%2FWeatherSplashLogo.svg?alt=media&token=d140e155-96f1-42ac-b149-cd33fcce04c5"
                  alt="Logo"
                  unoptimized
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>
              
             {/* Middle section */}
            <div className="flex-1 mx-4 max-w-xl hidden md:block">
              <SearchInput />
            </div>
            
             {/* Right section */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <ModeToggle />
                {currentLocation && (
                  <div className="relative">
                    <WeatherNotifications location={currentLocation} />
                  </div>
                )}
              </div>
              
                {/* User menu */}
              <div className="hidden md:block">
                {!loading && user === null ? (
                  <Popover>
                    <PopoverTrigger>
                      <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                        <img
                          className="w-6 h-6 cursor-pointer"
                          alt="person"
                          src={theme === 'dark' ? '/assets/person-fill-1.svg' : '/assets/person.fill.svg'}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0" align="end">
                      <div className="flex flex-col">
                        <Link href="/login" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleMenuClick}>
                          Login
                        </Link>
                        <Link href="/signup" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleMenuClick}>
                          Sign up
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="rounded-full inline-flex items-center justify-center  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-accent hover:text-accent-foreground ">
                        <Image
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                          alt="profile photo"
                          src={user?.photoURL || '/assets/person-fill-1.svg'}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setProfileDialogOpen(true)}>
                        <Button variant="outline" size="lg" className="h-10 w-full" >Profile</Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut}>
                      <Button variant="outline" size="lg" className="h-10 mt-2 w-full bg-red-600" >Logout</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <SearchInput />
              <div className="flex items-center justify-between">
                <ModeToggle />
                {currentLocation && <WeatherNotifications location={currentLocation} />}
              </div>
              
              {!loading && user === null ? (
                <div className="grid gap-2">
                  <Button onClick={() => { handleMenuClick(); setMenuOpen(false); }}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button onClick={() => { handleMenuClick(); setMenuOpen(false); }}>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Button variant="outline" onClick={() => { setProfileDialogOpen(true); setMenuOpen(false); }}>
                    Profile
                  </Button>
                  <Button variant="outline" onClick={() => { signOut(); setMenuOpen(false); }}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  ) : (
    <div></div>
  );
};

export default Navbar;