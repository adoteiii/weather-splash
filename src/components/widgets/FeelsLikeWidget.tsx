import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HourlyForecastData } from "@/lib/types";

interface FeelsLikeWidgetProps {
  data: HourlyForecastData[];
}

export default function FeelsLikeWidget({ data }: FeelsLikeWidgetProps) {
// Get the current hour
const currentHour = new Date().getHours();

// Find the data for the current hour
const currentHourData = data.find(hourData => new Date(hourData.time).getHours() === currentHour);

if (!currentHourData) {
  console.log("No current hour data available for FeelsLike");
  return (
    <Card className="order-8 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <i>
            {/* SVG Icon */}
          </i>
         Feels like
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>No current hour data available</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
const feelsLike = Math.floor(currentHourData.feelslike_c);
const currentTemp = Math.floor(currentHourData.temp_c)
  let feelsLikeMessage = "";
  



  return (
    <Card className="order-7 flex h-48 flex-col justify-between">
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
          Feels like
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{feelsLike}&deg;</p>
      </CardContent>
      <CardFooter>
        <p>
          {feelsLike < currentTemp
            ? "Feels colder than the actual temperature."
            : feelsLike > currentTemp
            ? "Feels warmer than the actual temperature."
            : "Feels like the actual temperature."}
        </p>
      </CardFooter>
    </Card>
  );
}
  

