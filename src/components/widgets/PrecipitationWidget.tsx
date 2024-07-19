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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
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
