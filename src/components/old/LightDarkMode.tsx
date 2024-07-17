
import { useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import Image from 'next/image';


const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    // <button onClick={toggleDarkMode}>
    //   {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      
    // </button>
    <button
      onClick={toggleDarkMode}
      className=" flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      <div className="mr-2">
        <Image
          src="/assets/sun.svg"
          alt="Sun Icon"
          width={24}
          height={24}
          className='w-6 h-6'
        />
      </div>
      <div>
        <Image
          src="/assets/moon.svg"
          alt="Moon Icon"
          width={24}
          height={24}
          className='w-6 h-6'
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
