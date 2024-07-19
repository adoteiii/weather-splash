import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Compass from "../ui/compass";
import { HourlyForecastData } from "@/lib/types";

interface WindWidgetProps {
  data: HourlyForecastData[];
}

export default function WindWidget({ data }: WindWidgetProps) {
  return (
    <Card className="order-4 h-48 xl:order-3">
      <CardHeader>
        <CardTitle>
          <i>
            {/* SVG Icon */}
          </i>
          Wind
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-0">
        <Compass speed={data[0].wind_kph} deg={data[0].wind_degree} />
      </CardContent>
    </Card>
  );
}
