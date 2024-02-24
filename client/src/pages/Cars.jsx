import CarsCard from "../components/CarsCard";
import Sidebar from "../components/common/Sidebar";

export default function Cars() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="flex w-full">
          <div className="hidden md:flex md:w-[300px] transition-all duration-150">
            one
          </div>
          <div className="flex-1">
            <div className="h-72 p-2 bg-gradient-to-tr from-black to-gray-400"></div>
            <CarsCard />
          </div>
        </main>
      </div>
    </div>
  );
}
