import React, { KeyboardEvent, MouseEvent, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from './Input';
import { useAppSelector } from '@/redux/store';
import { ModeToggle } from "./ui/ModeToggle"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button';
import { AuthorizationContext } from '@/lib/userContext';




interface NavbarProps {

  alerts: any[];
  onAlertIconClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ alerts, onAlertIconClick }) => {
  const data = useAppSelector(state=>state.DataReducer.value)

  const handleSearch = ()=>{
    console.log('event')
  }

  const {user, loading} = useContext(AuthorizationContext)

  return (
    data!==undefined?<nav className="top-0 py-3 z-[1000] w-full">
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
            <Input 
              
            
            />

            <div className="flex justify-center w-full sm:w-auto sm:mt-0 h-8 items-center px-8 text-white">
              <ModeToggle />
              
            </div>

            <div className="relative flex justify-center w-full sm:w-auto  sm:mt-0 h-8 items-center px-2 text-white">
              <img className="w-4 h-4" alt="notifications" src="assets/notification-bell.png" onClick={onAlertIconClick} />
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {alerts.length}
                </span>
              )}
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-white">
            {/* <Link href="/signup" className="w-4 h-4">
               
            </Link> */}
            {(!loading && user===null)?<Popover>
              <PopoverTrigger><img className="w-4 h-4" alt="person" src="assets/person-fill-1.svg" /></PopoverTrigger>
              <PopoverContent>
              <div className="grid gap-4">
             
              <Button>
              <Link href="/login" className="">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Login</h4>
                </div>
                </Link>
                </Button>
               
                
                <Button>
                <Link href="/signup" className="">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Sign up</h4>
                  </div>
                </Link>
                </Button>
              </div>
              
              </PopoverContent>

              </Popover>: <Image width={40} height={40} className='w-6 h-6 rounded-full' alt='profile photo' src={user?.photoURL||'/assets/person-fill-1.svg'}></Image>}
             
            
            </div>
          </div>
        </div>
      </div>
    </nav>:<div></div>
  );
};

export default Navbar;
