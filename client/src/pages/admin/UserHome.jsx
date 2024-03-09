export default function UserHome() {
  return (
    <div className="min-h-screen flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="left flex flex-col gap-5 flex-1">
          <div className="bg-white p-5 shadow-lg w-full"></div>
          <div className="bg-white p-5 shadow-lg w-full"></div>
        </div>

        <div className="right flex flex-col gap-5 flex-1">
          <div className="bg-white p-5 shadow-lg w-full">right one</div>
          <div className="bg-white p-5 shadow-lg w-full">Right two</div>
        </div>
      </div>

      {/* bottom cards */}
      <div className="flex flex-col  md:flex-row gap-5">
        <div className="flex-1">
          <div className="bg-white p-5 shadow-lg"></div>
        </div>
        <div className="w-full md:w-[400px]">
          <div className="bg-white p-5 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
