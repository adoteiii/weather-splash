import React from 'react';

interface Props {
  precip_mm: number;
}

const ThreeHourPrecip: React.FC<Props> = ({ precip_mm }) => {
  return (
    <div>
      <p>
        {precip_mm}mm <br /> in the last 3h
      </p>
    </div>
  );
};

export default ThreeHourPrecip;
