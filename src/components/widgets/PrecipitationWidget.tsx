import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ThreeHourPrecip from "./ThreeHourPrecip";
import { HourlyForecastData } from "@/lib/types";

interface PrecipitationWidgetProps {
  data: HourlyForecastData[];
}

export default function PrecipitationWidget({ data }: PrecipitationWidgetProps) {
  console.log("PrecipitationWidget data:", data);

  if (!data || data.length === 0) {
    console.log("No data available for PrecipitationWidget");
    return (
      <Card className="order-6 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Precipitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  // Get the current hour
  const currentHour = new Date().getHours();

  // Find the data for the current hour
  const currentHourData = data.find(hourData => new Date(hourData.time).getHours() === currentHour);

  if (!currentHourData) {
    console.log("No current hour data available for PrecipitationWidget");
    return (
      <Card className="order-6 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Precipitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No current hour data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  const precip_mm = currentHourData.precip_mm;
  let precipitationDescription = "";

  if (precip_mm <= 0.2) {
    precipitationDescription = "Light rain or drizzle. An umbrella may come in handy.";
  } else if (precip_mm <= 2.5) {
    precipitationDescription = "Moderate rain.";
  } else {
    precipitationDescription = "Heavy rain.";
  }

  console.log(`Current Hour: Precipitation: ${precip_mm} mm - ${precipitationDescription}`);

  return (
    <Card className="order-6 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <i>
          <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              >
                <path
                  d="M16.6102 19.9999C17.9502 20.0099 19.2402 19.5099 20.2302 18.6099C23.5002 15.7499 21.7502 10.0099 17.4402 9.46995C15.9002 0.129949 2.43022 3.66995 5.62022 12.5599"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.27986 12.9698C6.74986 12.6998 6.15986 12.5598 5.56986 12.5698C0.909864 12.8998 0.919864 19.6798 5.56986 20.0098"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8198 9.88998C16.3398 9.62998 16.8998 9.48998 17.4798 9.47998"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 20L7.97021 22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 20L11.9702 22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 16L11.9702 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 16L7.97021 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </i>
          Precipitation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ThreeHourPrecip precip_mm={precip_mm} />
      </CardContent>
      <CardFooter>
        <p>{precipitationDescription}</p>
      </CardFooter>
    </Card>
  );
}
