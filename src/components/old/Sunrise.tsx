const Sunrise: React.FC<{ sunrise: string; sunset: string }> = ({ sunrise, sunset }) => (
    <div className="h-[120px] bg-[#2e2e2e80] pt-2 rounded-2xl">
      <h1 className="text-center text-white text-xl font-bold">Sunrise</h1>
      <p className="text-center text-white text-3xl">{sunrise}</p>
      <p className="text-center text-white text-sm">Sunset: {sunset}</p>
    </div>
  );
  