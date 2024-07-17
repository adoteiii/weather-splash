const Humidity: React.FC<{ humidity: number }> = ({ humidity }) => (
    <div className="h-[120px] bg-[#2e2e2e80] pt-2 rounded-2xl">
      <h1 className="text-center text-white text-xl font-bold">Humidity</h1>
      <p className="text-center text-white text-3xl">{humidity}%</p>
      <p className="text-center text-white text-sm">The dew point is 22° right now.</p>
    </div>
  );