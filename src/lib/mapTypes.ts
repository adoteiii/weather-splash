export const legendData = {
  temp_new: {
    gradient: ['#00008B', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'],
    min: -40,
    max: 40,
    unit: '°C'
  },
  precipitation_new: {
    gradient: ['#FFFFFF', '#00FFFF', '#0080FF', '#0000FF', '#8000FF'],
    min: 0,
    max: 50,
    unit: 'mm/s'
  },
  wind_new: {
    gradient: ['#FFFFFF', '#00FFFF', '#0080FF', '#0000FF', '#8000FF'],
    min: 0,
    max: 40,
    unit: 'm/s'
  },
  clouds_new: {
    gradient: ['#FFFFFF', '#DDDDDD', '#AAAAAA', '#777777', '#444444'],
    min: 0,
    max: 100,
    unit: '%'
  },
  pressure_new: {
    gradient: ['#8080FF', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00'],
    min: 950,
    max: 1070,
    unit: 'hPa'
  },
};

  export const weatherLayers = [
    { label: 'Temperature (°C)', code: 'temp_new' },
    { label: 'Precipitation Intensity (mm/s)', code: 'precipitation_new' },
    { label: 'Wind Speed and Direction (m/s)', code: 'wind_new' },
    { label: 'Cloudiness (%)', code: 'clouds_new' },
    { label: 'Sea Level Pressure (hPa)', code: 'pressure_new' }
  ];