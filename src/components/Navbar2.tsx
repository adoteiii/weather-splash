import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useTheme } from 'next-themes';

const Navbar2: React.FC = () => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="top-0 py-4 z-[1000] bg-transparent w-full absolute">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center flex-wrap">
          <Link href="/" legacyBehavior>
            <a className="hover:cursor-pointer">
              <Image
                height={32}
                width={32}
                src="/assets/WeatherSplashLogo.svg"
                alt="Logo"
                unoptimized
                className="h-8 w-auto cursor-pointer ml-4 sm:ml-0 sm:justify-center"
              />
            </a>
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

          <div className="hidden sm:flex justify-around items-center w-full sm:w-auto mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-8 text-gray-800 dark:text-gray-200">
              <Link href="/login" legacyBehavior>
                <a className="text-gray-800 dark:text-gray-200">Login</a>
              </Link>
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-8 text-gray-800 dark:text-gray-200">
              <Link href="/signup" legacyBehavior>
                <a className="text-gray-800 dark:text-gray-200">Sign Up</a>
              </Link>
            </div>
            
            <div className='px-4'>
              <ModeToggle />
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-gray-800 dark:text-gray-200">
              <img 
                className="w-4 h-4" 
                alt="person" 
                src={theme === 'dark' ? '/assets/person-fill-1.svg' : '/assets/person.fill.svg'} 
              />
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden mt-4">
            <div className="pt-2 pb-4 space-y-1">
              <Link href="/" className="block px-4 py-2 text-gray-800 dark:text-gray-200" onClick={handleMenuClick}>
                Home
              </Link>
              <Link href="/login" className="block px-4 py-2 text-gray-800 dark:text-gray-200" onClick={handleMenuClick}>
                Login
              </Link>
              <Link href="/signup" className="block px-4 py-2 text-gray-800 dark:text-gray-200" onClick={handleMenuClick}>
                Sign Up
              </Link>
              <div className='px-4 py-2'>
                <ModeToggle />
              </div>
              <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-gray-800 dark:text-gray-200">
                <img 
                  className="w-4 h-4" 
                  alt="person" 
                  src={theme === 'dark' ? '/assets/person-fill-1.svg' : '/assets/person.fill.svg'} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;
