import { useAppSelector } from '@/redux/store';
import React from 'react';
import { useTheme } from 'next-themes';

import rainLightSVG from '/public/assets/weather/rain-light.svg';
import rainDarkSVG from '/public/assets/weather/rain-dark.svg';
import sunnyLightSVG from '/public/assets/weather/sunny-light.svg';
import sunnyDarkSVG from '/public/assets/weather/sunny-dark.svg';
import cloudyLightSVG from '/public/assets/weather/cloudy-light.svg';
import cloudyDarkSVG from '/public/assets/weather/cloudy-dark.svg';
import defaultLightSVG from '/public/assets/weather/default-light.svg';
import defaultDarkSVG from '/public/assets/weather/default-dark.svg';

const BackgroundSVG: React.FC = () => {
  const data = useAppSelector((state) => state.DataReducer.value);
  const units = useAppSelector((state) => state.UnitReducer.value);
  const { theme } = useTheme();

  const getWeather = (description: string = '') => {
    switch (description.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'sunny';
      case 'partly cloudy':
      case 'cloudy':
      case 'overcast':
      case 'mist':
      case 'fog':
        return 'cloudy';
      case 'patchy rain possible':
      case 'patchy light rain':
      case 'patchy rain ahead':
      case 'light rain':
      case 'light drizzle':
      case 'moderate rain':
      case 'heavy rain':
        return 'rain';
      default:
        return 'default';
    }
  }

  const weather = getWeather(data?.current?.condition?.text);

  console.log('BackgroundSVG', { weather, theme });

  return (
    <div className="absolute inset-0 z-[-1]">
      {weather === 'rain' ? (
        <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
          {theme === 'light' ? (
            <image href={rainLightSVG} />
          ) : (
            <image href={rainDarkSVG} />
          )}
        </svg>
      ) : weather === 'sunny' ? (
        <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
          {theme === 'light' ? (
            <image href={sunnyLightSVG} />
          ) : (
            <image href={sunnyDarkSVG} />
          )}
        </svg>
      ) : weather === 'cloudy' ? (
        <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
          {theme === 'light' ? (
            <image href={cloudyLightSVG} />
          ) : (
            <image href={cloudyDarkSVG} />
          )}
        </svg>
      ) : (
        <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
          {theme === 'light' ? (
            <image href={defaultLightSVG} />
          ) : (
            <image href={defaultDarkSVG} />
          )}
        </svg>
      )}
    </div>
  );
};

export default BackgroundSVG;