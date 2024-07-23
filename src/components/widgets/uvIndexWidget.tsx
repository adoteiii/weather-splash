import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { HourlyForecastData } from "@/lib/types";

interface UVIndexWidgetProps {
  data: HourlyForecastData[];
}

export default function UVIndexWidget({ data }: UVIndexWidgetProps) {
  console.log("UVIndexWidget data:", data);

  if (!data || data.length === 0) {
    console.log("No data available for UVIndexWidget");
    return (
      <Card className="order-5 flex h-48 flex-col justify-between">
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
            UV Index
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
    console.log("No current hour data available for UVIndexWidget");
    return (
      <Card className="order-5 flex h-48 flex-col justify-between">
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
                  d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            UV Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>No current hour data available</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  const uv = currentHourData.uv;
  let uvDescription = "";

  if (uv <= 2) {
    uvDescription = "Low";
  } else if (uv <= 5) {
    uvDescription = "Moderate";
  } else if (uv <= 7) {
    uvDescription = "High";
  } else {
    uvDescription = "Very High";
  }

  let uvProtectionMessage = "";

  if (uv <= 2) {
    uvProtectionMessage = "No protection needed.";
  } else if (uv <= 5) {
    uvProtectionMessage = "Wear sunscreen.";
  } else {
    uvProtectionMessage = "Take precautions.";
  }

  console.log(`Current Hour: UV Index: ${uv} - ${uvDescription}`);

  return (
    <Card className="order-5 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <i>
            {/* SVG Icon */}
          </i>
          UV Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          {Math.round(uv)}
          <br />
          {uvDescription}
        </p>
        <Progress aria-label="UV Index" value={uv * 10} />
      </CardContent>
      <CardFooter>
        <p>{uvProtectionMessage}</p>
      </CardFooter>
    </Card>
  );
}
