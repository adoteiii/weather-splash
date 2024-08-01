import { legendData, weatherLayers } from "@/lib/mapTypes";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

interface LegendProps {
  layer: string;
}

const Legend: React.FC<LegendProps> = ({ layer }) => {
  const legendInfo = legendData[layer as keyof typeof legendData];

  const gradientStyle = {
    background: `linear-gradient(to right, ${legendInfo.gradient.join(', ')})`,
  };

  return (
    <Card className="absolute bottom-2 left-2 z-10 shadow-sm opacity-90" style={{ width: '250px', height: '140px'}}>
      <CardHeader className="">
        <CardTitle className="text-sm font-medium text-left">
          {weatherLayers.find(l => l.code === layer)?.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-2 px-3">
        <div className="w-full h-3 rounded-sm mb-1" style={gradientStyle}></div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{legendInfo.min} </span>
          <span>{legendInfo.max} </span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Legend };