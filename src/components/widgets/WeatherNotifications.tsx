import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bell } from "lucide-react";
import { Location } from "@/lib/types";
import { Button } from "../ui/button";

// Define a new type for weather alerts
type WeatherAlert = {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
};

type WeatherAlertResponse = {
  alerts: {
    alert: WeatherAlert[];
  };
};

// Action to fetch weather alerts
const getWeatherAlerts = async ({ lat, lon }: { lat: number; lon: number }): Promise<WeatherAlertResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_SPLASH_API_KEY;

  if (!apiKey) {
    throw new Error("WeatherAPI key not found in environment variables");
  }

  console.log(`Fetching weather alerts for coordinates: (${lat}, ${lon})`);

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=no&alerts=yes`
  );

  if (!response.ok) {
    console.error("Failed to fetch weather alerts", response.status, response.statusText);
    throw new Error("Failed to fetch weather alerts");
  }

  const data = await response.json();
  console.log("Full API response:", data);
  return data as WeatherAlertResponse;
};

export default function WeatherNotifications({ location }: { location: Location }) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        console.log("Fetching weather alerts...");
        const data = await getWeatherAlerts({ lat: location.lat, lon: location.lon });
        console.log("Alerts received:", data.alerts.alert);
        if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
          setAlerts(data.alerts.alert);
          data.alerts.alert.forEach(alert => {
            console.log(`Alert Received:
              Headline: ${alert.headline}
              Msgtype: ${alert.msgtype}
              Severity: ${alert.severity}
              Urgency: ${alert.urgency}
              Areas: ${alert.areas}
              Category: ${alert.category}
              Certainty: ${alert.certainty}
              Event: ${alert.event}
              Note: ${alert.note}
              Effective: ${alert.effective}
              Expires: ${alert.expires}
              Desc: ${alert.desc}
              Instruction: ${alert.instruction}
            `);
          });
        } else {
          console.log("No weather alerts received.");
        }
      } catch (error) {
        console.error("Error fetching weather alerts:", error);
      }
    };

    fetchAlerts();
    // Set up an interval to fetch alerts periodically (e.g., every 30 minutes)
    const intervalId = setInterval(fetchAlerts, 30 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger onClick={() => setIsOpen(true)}>
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground">
            <Bell width={18} height={18} />
        </div> 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Weather Alerts for {location.city}</AlertDialogTitle>
          <AlertDialogDescription>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} className="mb-4">
                  <span className="font-bold">{alert.event}</span>
                  <span><strong>Severity:</strong> {alert.severity}</span>
                  <span><strong>Areas:</strong> {alert.areas}</span>
                  <span>{alert.desc}</span>
                  <span><strong>Effective:</strong> {new Date(alert.effective).toLocaleString()}</span>
                  <span><strong>Expires:</strong> {new Date(alert.expires).toLocaleString()}</span>
                  {alert.instruction && (
                    <span><strong>Instructions:</strong> {alert.instruction}</span>
                  )}
                </div>
              ))
            ) : (
              <span>No current weather alerts for this location.</span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
