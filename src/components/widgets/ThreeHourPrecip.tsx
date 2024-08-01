// import React from 'react';

// interface Props {
//   precip_mm: number;
// }

// const ThreeHourPrecip: React.FC<Props> = ({ precip_mm }) => {
//   return (
//     <div>
//       <p>
//         {precip_mm}mm <br /> in the last 3h
//       </p>
//     </div>
//   );
// };

// export default ThreeHourPrecip;
import React from 'react';
import { UnitData } from '@/types/data';
import { useAppSelector } from '@/redux/store';

interface Props {
  precip_mm: number;
  precip_in: number;
}

const ThreeHourPrecip: React.FC<Props> = ({ precip_mm, precip_in }) => {
  const units = useAppSelector(state => state.UnitReducer.value)
  return (
    <div>
      <p>
      {units.precipitation === "in"
      ? `${precip_in} in`
      : `${precip_mm} mm`} <br /> in the last 3h
      </p>
    </div>
  );
};

export default ThreeHourPrecip;
