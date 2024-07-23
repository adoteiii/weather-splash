import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HourlyForecastData } from "@/lib/types";

interface HumidityWidgetProps {
  data: HourlyForecastData[];
}

export default function HumidityWidget({ data }: HumidityWidgetProps) {
  console.log("HumidityWidget data:", data);

  if (!data || data.length === 0) {
    console.log("No data available for HumidityWidget");
    return (
      <Card className="order-8 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Humidity
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
    console.log("No current hour data available for HumidityWidget");
    return (
      <Card className="order-8 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Humidity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No current hour data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  const humidity = currentHourData.humidity;
  let humidityMessage = "";

  if (humidity < 40) {
    humidityMessage = "Low humidity. It might feel dry.";
  } else if (humidity < 70) {
    humidityMessage = "Moderate humidity. Comfortable conditions.";
  } else {
    humidityMessage = "High humidity. It might feel humid and uncomfortable.";
  }

  console.log(`Current Hour: Humidity: ${humidity}% - ${humidityMessage}`);

  return (
    <Card className="order-8 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <i>
          <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-black dark:fill-white"
              >
                <path d="M16.59 7.41L6.30996 17.69C5.82996 18.17 5.00996 18.06 4.71996 17.45C4.19996 16.38 3.89996 15.17 3.89996 13.9C3.87996 8.38 9.47996 3.66 11.38 2.21C11.75 1.93 12.25 1.93 12.61 2.21C13.48 2.87 15.11 4.24 16.64 6.04C16.98 6.44 16.96 7.04 16.59 7.41Z" />
                <path
                  opacity="0.4"
                  d="M20.1 13.9098C20.1 18.3698 16.47 21.9998 12 21.9998C10.21 21.9998 8.53996 21.4198 7.18996 20.4198C6.69996 20.0598 6.65996 19.3398 7.08996 18.9098L17.16 8.83977C17.63 8.36977 18.42 8.46978 18.74 9.04978C19.56 10.5598 20.11 12.1998 20.1 13.9098Z"
                />
              </svg>
          </i>
          Humidity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{humidity}%</p>
      </CardContent>
      <CardFooter>
        <p>{humidityMessage}</p>
      </CardFooter>
    </Card>
  );
}
