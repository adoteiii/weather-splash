const Wind: React.FC<{ speed: number }> = ({ speed }) => (
    <div className="h-[120px] bg-[#2e2e2e80] pt-2 rounded-2xl">
      <h1 className="text-center text-white text-xl font-bold">Wind</h1>
         <p className="text-center text-white text-3xl">{speed} mph</p>
    </div>
     );