import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopSpecCars from "./TopSpecCars";
import Vehicles from "./Vehicles";
import PopularCars from "../components/PopularCars";
import { useState } from "react";
import { tailChase } from "ldrs";
import { Carousel } from "flowbite-react";
import WelcomeModal from "../components/WelcomeModal";

tailChase.register();

export default function Home() {
  const [openModal, setOpenModal] = useState(true);
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
    <div className="min-h-screen font-lato ">
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="w-full">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
            <Carousel slideInterval={5000}>
              <img
                src="https://imgd-ct.aeplcdn.com/1056x660/cw/ec/41375/BMW-New-X6-Exterior-164773.jpg?v=20193007153007&q=80"
                alt="..."
                className="object-cover w-full h-56 sm:h-64 xl:h-80 2xl:h-96"
              />
              <img
                src="https://wallpapers.com/images/hd/4k-mercedes-benz-with-trees-1xffhdjq8nfhhrwz.jpg"
                alt="..."
                className="object-cover w-full h-56 sm:h-64 xl:h-80 2xl:h-96"
              />
              <img
                src="https://w0.peakpx.com/wallpaper/296/163/HD-wallpaper-mercedes-benz-s-350-d-amg-line.jpg"
                alt="..."
                className="object-cover w-full h-56 sm:h-64 xl:h-80 2xl:h-96"
              />
            </Carousel>
            <div className="w-full inset-0 bg-gradient-to-tr from-black/50 to-indigo-600/50 absolute"></div>
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
      {openModal && (
        <WelcomeModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
