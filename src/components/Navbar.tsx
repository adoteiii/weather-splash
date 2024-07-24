import React, {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useState,
  useRef,
} from "react";
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

interface NavbarProps {
  alerts: any[];
  onAlertIconClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ alerts, onAlertIconClick }) => {
  const data = useAppSelector((state) => state.DataReducer.value);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [billingDialogOpen, setBillingDialogOpen] = useState(false);
  const dropdown = useRef<any>(null);
  const trigger = useRef<any>(null);

  const { user, loading } = useContext(AuthorizationContext);

  return data !== undefined ? (
    <>
      <ProfileDialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} />
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
              <SearchInput />

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
                              <span className="font-medium leading-none">
                                Login
                              </span>
                            </div>
                          </Link>
                        </Button>

                        <Button>
                          <Link href="/signup" className="">
                            <div className="space-y-2">
                              <span className="font-medium leading-none">
                                Sign up
                              </span>
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
