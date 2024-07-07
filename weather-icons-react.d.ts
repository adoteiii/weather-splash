declare module 'weather-icons-react' {
    import * as React from 'react';
  
    export interface IconProps {
      size?: number;
      color?: string;
    }
  
    export const WiDaySunny: React.FC<IconProps>;
    export const WiDayCloudy: React.FC<IconProps>;
    export const WiCloud: React.FC<IconProps>;
    export const WiCloudy: React.FC<IconProps>;
    export const WiFog: React.FC<IconProps>;
    export const WiRainMix: React.FC<IconProps>;
    export const WiRain: React.FC<IconProps>;
    export const WiShowers: React.FC<IconProps>;
    export const WiSnow: React.FC<IconProps>;
    export const WiSnowflakeCold: React.FC<IconProps>;
    export const WiDayRainMix: React.FC<IconProps>;
    export const WiDaySnow: React.FC<IconProps>;
  }
  