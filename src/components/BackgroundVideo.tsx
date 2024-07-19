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
        <video
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/5818973/5818973-uhd_2560_1440_24fps.mp4"          
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <video
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/15204931/15204931-hd_1920_1080_24fps.mp4"          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
};

export default BackgroundVideo;