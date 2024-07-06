import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const LightDarkMode: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      <div className="mr-2">
        <Image
          src="/assets/sun.svg"
          alt="Sun Icon"
          width={24}
          height={24}
        />
      </div>
      <div>
        <Image
          src="/assets/moon.svg"
          alt="Moon Icon"
          width={24}
          height={24}
        />
      </div>
    </button>
  );
};

export default LightDarkMode;
