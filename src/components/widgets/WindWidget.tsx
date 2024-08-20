import { useAppSelector } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Compass from "../ui/compass";
import { HourlyForecastData } from "@/lib/types";

interface WindWidgetProps {
  data: HourlyForecastData[];
  timezone: string;  // Add this prop
}

export default function WindWidget({ data, timezone }: WindWidgetProps) {
  const units = useAppSelector((state) => state.UnitReducer.value);

  // Get the current time in the specified timezone
  const currentDate = new Date();
  // const localTime = currentDate.getTime();
  
  const targetTime = new Date(currentDate.toLocaleDateString('en-US', {timeZone: timezone}).valueOf());
  const currentHour = targetTime.getHours();

  // Find the forecast data for the current hour
  const currentHourData = data.find(hour => new Date(hour.time).getHours() === currentHour) || data[0];

  return (
    <Card className="order-4 h-48 xl:order-3">
      <CardHeader>
        <CardTitle>
          <i>
          <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 stroke-black dark:stroke-white"
            >
              <path
                d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.4"
                d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 9.00012H9.31C10.8 9.00012 12 7.79012 12 6.31012C12 4.82012 10.79 3.62012 9.31 3.62012C7.82 3.62012 6.62 4.83012 6.62 6.31012V6.69012"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          Wind
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-0">
        <Compass 
          speed={units.wind === 'kph' ? currentHourData.wind_kph : currentHourData.wind_mph}
          deg={currentHourData.wind_degree}
        />
      </CardContent>
    </Card>
  );
}