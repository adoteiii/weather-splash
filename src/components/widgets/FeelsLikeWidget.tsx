import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HourlyForecastData } from "@/lib/types";

interface FeelsLikeWidgetProps {
  data: HourlyForecastData[];
}

export default function FeelsLikeWidget({ data }: FeelsLikeWidgetProps) {
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
        <p>{Math.floor(data[0].feelslike_c)}&deg;</p>
      </CardContent>
      <CardFooter>
        <p>
          {data[0].feelslike_c < data[0].temp_c
            ? "Feels colder than the actual temperature."
            : data[0].feelslike_c > data[0].temp_c
            ? "Feels warmer than the actual temperature."
            : "Feels like the actual temperature."}
        </p>
      </CardFooter>
    </Card>
  );
}
