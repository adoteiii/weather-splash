import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { AirQualityData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface AirPollutionProps {
  data: AirQualityData;
  className?: ClassNameValue;
}

// Function to get air quality description based on AQI value
const getAirQualityDescription = (aqi: number): string => {
  if (aqi === 1) return "Air quality is good.";
  if (aqi === 2) return "Air quality is moderate.";
  if (aqi === 3) return "Air quality is unhealthy for sensitive groups.";
  if (aqi === 4) return "Air quality is unhealthy.";
  if (aqi === 5) return "Air quality is very unhealthy.";
  return "Air quality is hazardous.";
};

const AirPollution: React.FC<AirPollutionProps> = ({ data, className }) => {
  const aqi = data["us-epa-index"];

  return (
    <Card
      className={cn(
        "order-2 col-span-2 flex h-48 flex-col justify-between",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          <i>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 invert dark:invert-0"
            >
              {/* SVG path data */}
            </svg>
          </i>
          Air pollution
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <Progress aria-label="Air pollution" value={aqi * 20} />
      </CardContent>
      <CardFooter>
        <p>{getAirQualityDescription(aqi)}</p>
      </CardFooter>
    </Card>
  );
};

export default AirPollution;
