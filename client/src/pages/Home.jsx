import Sidebar from "../components/common/Sidebar";
import Vehicles from "./Vehicles";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="w-full">
          <div className="h-96 w-full md:relative flex justify-between bg-gradient-to-tr from-black to-gray-400 overflow-hidden">
            <div className="text-white font-lato mt-16 ml-5 md:ml-12 flex-1">
              <span className="md:text-[40px] text-[30px] font-serif">
                <h1>Our Statement:</h1>
                <h1>Drive Safe & Clean</h1>
              </span>
              <button className="flex bg-[#555] py-2 px-2 mt-5 md:mt-10 md:py-3 md:px-6 hover:opacity-85">
                Learn More
              </button>
            </div>
            <div className="">
              <img
                src="/vw.png"
                alt="volkswagen"
                className="object-cover md:h-96 h-72 md:absolute md:right-0"
              />
            </div>
          </div>

          <div>
            <Vehicles />
          </div>
        </main>
      </div>
    </div>
  );
}
