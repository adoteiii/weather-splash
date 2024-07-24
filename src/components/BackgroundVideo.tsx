import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const BackgroundVideo = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-[-1]">
      {resolvedTheme === 'dark' ? (
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.pexels.com/photos/6395415/pexels-photo-6395415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"          
         
          
          
          
          
        />
      ) : (
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"          
          
        />
      )}
    </div>
  );
};

export default BackgroundVideo;
