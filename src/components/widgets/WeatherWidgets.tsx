import AirPollution from "./AirPollution";
import SunsetWidget from "./SunsetWidget";
import WindWidget from "./WindWidget";
import UVIndexWidget from "./uvIndexWidget";
import PrecipitationWidget from "./PrecipitationWidget";
import FeelsLikeWidget from "./FeelsLikeWidget";
import HumidityWidget from "./HumidityWidget";
import VisibilityWidget from "./VisibilityWidget";
import PreasureWidget from "./PressureWidget"
import { HourlyForecastData, AirPollutionResponse, City } from "@/lib/types";
import PressureWidget from "./PressureWidget";

interface WeatherWidgetsProps {
  data: HourlyForecastData[];
  airQuality: AirPollutionResponse;
  city: City;
}

export default function WeatherWidgets({ data, airQuality, city }: WeatherWidgetsProps) {
  return (
    <>
      <AirPollution data={airQuality.current.air_quality} className="col-span-2" />
      <SunsetWidget city={city} />
      <WindWidget data={data} />
      <UVIndexWidget data={data} />
      <PrecipitationWidget data={data} />
      <FeelsLikeWidget data={data} />
      <HumidityWidget data={data} />
      <VisibilityWidget data={data} />
      <PressureWidget data={data}/>

    </>
  );
}
