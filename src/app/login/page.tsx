import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar2 from '@/components/Navbar2';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop:blur-md ">
      <Navbar2 />
      <div className="flex flex-col md:flex-row justify-between items-center p-12"></div>
      <div className="">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
          autoPlay
          muted
          src="/assets/WeatherSplashBG.mp4"
          loop
          playsInline
          preload="metadata"
          
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-lg max-w-md w-full backdrop-blur">
        <h2 className="text-center text-xl font-medium mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-full text-sm bg-transparent backdrop-blur shadow-sm"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-full text-sm bg-transparent backdrop-blur shadow-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-full text-sm font-medium"
          >
            LOGIN
          </button>
          <div className="flex justify-between text-sm mt-4">
            <a href="#" className="text-white">Forgot Password?</a>
            <a href="#" className="text-white">Sign Up</a>
          </div>
        </form>
        <div className="flex items-center mt-6">
          <div className="flex-grow border-t border-gray-300 opacity-20"></div>
        </div>

        <div className="flex justify-center mt-6">
          <span className="flex-shrink mx-4 text-white">OR LOGIN WITH</span>
        </div>
        <div className="flex justify-center mt-4">
          <button className="text-white rounded-lg">
            <Image
              height={64}
              width={64}
              src="/assets/google_icon.svg"
              alt="Google Logo"
              unoptimized
              className="h-8 w-auto cursor-pointer ml-4 sm:ml-0 sm:justify-center"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
