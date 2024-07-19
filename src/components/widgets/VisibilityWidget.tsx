import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HourlyForecastData } from "@/lib/types";

interface VisibilityWidgetProps {
  data: HourlyForecastData[];
}

export default function VisibilityWidget({ data }: VisibilityWidgetProps) {
  console.log("VisibilityWidget data:", data);

  if (!data || data.length === 0) {
    console.log("No data available for VisibilityWidget");
    return (
      <Card className="order-9 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Visibility
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
    console.log("No current hour data available for VisibilityWidget");
    return (
      <Card className="order-9 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Visibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No current hour data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  const vis_km = currentHourData.vis_km;
  let visibilityDescription = "";

  if (vis_km >= 10) {
    visibilityDescription = "It's perfectly clear right now.";
  } else if (vis_km >= 5) {
    visibilityDescription = "Good visibility.";
  } else {
    visibilityDescription = "Poor visibility. Exercise caution while driving or moving around.";
  }

  console.log(`Current Hour: Visibility: ${vis_km} km - ${visibilityDescription}`);

  return (
    <Card className="order-9 flex h-48 flex-col justify-between">
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
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
          </i>
          Visibility
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{vis_km} km</p>
      </CardContent>
      <CardFooter>
        <p>{visibilityDescription}</p>
      </CardFooter>
    </Card>
  );
}
