import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HourlyForecastData } from "@/lib/types";

interface PressureWidgetProps {
  data: HourlyForecastData[];
}

export default function PressureWidget({ data }: PressureWidgetProps) {
  console.log("PressureWidget data:", data);

  if (!data || data.length === 0) {
    console.log("No data available for PressureWidget");
    return (
      <Card className="order-10 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Pressure
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
    console.log("No current hour data available for PressureWidget");
    return (
      <Card className="order-10 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              {/* SVG Icon */}
            </i>
            Pressure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No current hour data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  const pressure_mb = currentHourData.pressure_mb;
  let pressureDescription = "";

  if (pressure_mb < 1010) {
    pressureDescription = "Low pressure. Possible stormy weather.";
  } else if (pressure_mb <= 1020) {
    pressureDescription = "Normal pressure. Stable weather.";
  } else {
    pressureDescription = "High pressure. Fair weather expected.";
  }

  console.log(`Current Hour: Pressure: ${pressure_mb} mb - ${pressureDescription}`);

  return (
    <Card className="order-10 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <i>
            {/* SVG Icon */}
          </i>
          Pressure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{pressure_mb} mb</p>
      </CardContent>
      <CardFooter>
        <p>{pressureDescription}</p>
      </CardFooter>
    </Card>
  );
}
