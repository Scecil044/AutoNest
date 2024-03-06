import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopSpecCars from "./TopSpecCars";
import Vehicles from "./Vehicles";
import PopularCars from "../components/PopularCars";
import { useState } from "react";
import { tailChase } from "ldrs";

tailChase.register();

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/cars");
      setLoading(false);
    }, 3000);
    
  };
  return (
    <div className="min-h-screen font-lato">
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="w-full">
          <div className="h-72 w-full md:relative flex justify-between bg-gradient-to-tr from-black to-gray-400 overflow-hidden">
            <div className="text-white font-lato mt-16 ml-5 md:ml-12 flex-1">
              <span className="md:text-[40px] text-[30px] font-serif">
                <h1>Our Statement:</h1>
                <h1>Drive Safe & Clean</h1>
              </span>
              <Link
                to="/cars"
                className=" bg-[#555] py-2 px-2 mt-5 md:mt-10 md:py-3 md:px-6 hover:opacity-85"
              >
                View Inventory
              </Link>
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

          <div>
            <TopSpecCars />
          </div>

          <div>
            <PopularCars />
          </div>

          <div className="my-5 flex justify-center">
            <button
              onClick={handleShowMore}
              className="py-2 px-16 bg-popsicle text-white items-center justify-center shadow-lg hover:opacity-85 transition-all duration-200 flex gap-1"
            >
              {loading && (
                <l-tail-chase
                  size="20"
                  speed="2.1"
                  color="white"
                ></l-tail-chase>
              )}
              Show More...
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
