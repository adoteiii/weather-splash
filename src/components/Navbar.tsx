import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightDarkMode from './LightDarkMode';

const Navbar:React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationName, setLocationName] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Assuming this function gets called when the search is confirmed
    setLocationName(searchQuery);
    setSearchQuery('');
  };

  return (
    <nav className="top-0 py-3 z-[1000] bg-black w-full">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center flex-wrap">
          <Link href="/" className="hover:cursor-pointer">
            <Image
              height={32}
              width={32}
              src="/assets/isolation-mode.svg"
              alt="Logo"
              unoptimized
              className="h-8 w-auto cursor-pointer ml-4 sm:ml-0 sm:justify-center"
            />
          </Link>

          <div className="flex justify-around items-center w-full sm:w-auto mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
            <div className="flex justify-center w-full sm:w-[280px] bg-[#2e2e2e] rounded-3xl h-8 items-center px-2">
              <img className="w-4 h-4" alt="Magnifyingglass" src="/assets/magnifyingglass-1.svg" />
              <input
                type="text"
                placeholder="Search City..."
                value={searchQuery}
                onChange={handleInputChange}
                className="ml-2 bg-transparent border-none text-white text-xs focus:outline-none w-full"
              />
              <button onClick={handleSearch} className="ml-2 text-xs text-white">
                Search
              </button>
            </div>

            <div className="flex justify-center w-full sm:w-[280px] mt-4 sm:mt-0 h-8 items-center px-2 text-white">
              <img className="w-4 h-4" alt="location" src="/assets/layer-1.svg" />
              {locationName && (
                <span className="ml-2 text-xs">{locationName}</span>
              )}
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-8 text-white">
              <LightDarkMode />
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-white">
              <img className="w-4 h-4" alt="person" src="assets/person-fill-1.svg" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
