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


interface NavbarProps {
  alerts: any[];
  onAlertIconClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ alerts, onAlertIconClick }) => {
  const data = useAppSelector((state) => state.DataReducer.value);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdown = useRef<any>(null);
  const { theme } = useTheme();

  const trigger = useRef<any>(null);

  const { user, loading } = useContext(AuthorizationContext);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return data !== undefined ? (
    <>
      <ProfileDialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} />
      <nav className="top-0 py-3 z-[1000] w-full ">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
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

            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <SearchInput />
              <ModeToggle />
              {/* <div className="relative flex items-center px-2 text-gray-700">
                <img
                  className="w-4 h-4 cursor-pointer"
                  alt="notifications"
                  src="assets/notification-bell.png"
                  onClick={onAlertIconClick}
                />
                {alerts.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {alerts.length}
                  </span>
                )}
              </div> */}
              <div className="flex items-center px-2 text-gray-700">
                {!loading && user === null ? (
                  <Popover>
                    <PopoverTrigger>
                      <img
                        className="w-4 h-4 cursor-pointer"
                        alt="person"
                        src={theme === 'dark' ? '/assets/person-fill-1.svg' : '/assets/person.fill.svg'}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-4">
                        <Button>
                          <Link href="/login" onClick={handleMenuClick}>
                            <span className="font-medium">Login</span>
                          </Link>
                        </Button>
                        <Button>
                          <Link href="/signup" onClick={handleMenuClick}>
                            <span className="font-medium">Sign up</span>
                          </Link>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline" className="p-1 rounded-full">
                        <Image
                          width={40}
                          height={40}
                          className="w-8 h-8 rounded-full"
                          alt="profile photo"
                          src={user?.photoURL || '/assets/person-fill-1.svg'}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel className="px-4 py-2">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        ref={trigger}
                        className="hover:cursor-pointer px-4 py-2"
                        onClick={() => {
                          handleMenuClick();
                          setProfileDialogOpen(true);
                        }}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer px-4 py-2"
                        onClick={() => {
                          handleMenuClick();
                          signOut();
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-4 space-y-1">
                <Link href="/" className="block px-4 py-2 text-gray-700" onClick={handleMenuClick}>
                  Home
                </Link>
                
                <SearchInput />
                <ModeToggle />
                {/* <div className="relative flex items-center px-4 py-2 text-gray-700">
                  <img
                    className="w-4 h-4 cursor-pointer"
                    alt="notifications"
                    src="assets/notification-bell.png"
                    onClick={() => {
                      handleMenuClick();
                      onAlertIconClick();
                    }}
                  />
                  {alerts.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {alerts.length}
                    </span>
                  )}
                </div> */}
                <div className="px-4 py-2">
                  {!loading && user === null ? (
                    <div className="grid gap-4">
                      <Button>
                        <Link href="/login" onClick={handleMenuClick}>
                          <span className="font-medium">Login</span>
                        </Link>
                      </Button>
                      <Button>
                        <Link href="/signup" onClick={handleMenuClick}>
                          <span className="font-medium">Sign up</span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center p-1 rounded-full"
                        onClick={() => {
                          handleMenuClick();
                          setProfileDialogOpen(true);
                        }}
                      >
                        <Image
                          width={40}
                          height={40}
                          className="w-8 h-8 rounded-full"
                          alt="profile photo"
                          src={user?.photoURL || "/assets/person-fill-1.svg"}
                        />
                        <span className="ml-2">Profile</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center p-1 rounded-full"
                        onClick={() => {
                          handleMenuClick();
                          signOut();
                        }}
                      >
                        <span>Logout</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
