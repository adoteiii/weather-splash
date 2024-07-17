import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar2: React.FC = () => {
  return (
    <nav className="top-0 py-4 z-[1000] bg-transparent w-full absolute">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center flex-wrap">
          <Link href="/" legacyBehavior>
            <a className="hover:cursor-pointer">
              <Image
                height={32}
                width={32}
                src="/assets/isolation-mode.svg"
                alt="Logo"
                unoptimized
                className="h-8 w-auto cursor-pointer ml-4 sm:ml-0 sm:justify-center"
              />
            </a>
          </Link>

          <div className="flex justify-around items-center w-full sm:w-auto mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-8 text-white">
              <Link href="/login" legacyBehavior>
                <a className="text-white">Login</a>
              </Link>
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-8 text-white">
              <Link href="/signup" legacyBehavior>
                <a className="text-white">Sign Up</a>
              </Link>
            </div>

            <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0 h-8 items-center px-2 text-white">
              <img className="w-4 h-4" alt="person" src="/assets/person-fill-1.svg" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
