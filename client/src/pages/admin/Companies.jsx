import { IoCarSportOutline } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";

export default function Companies() {
  return (
    <div className="min-h-screen font-lato">
      <div className="p-5 bg-white border-gray-300 shadow-lg">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
          <div className="md:w-[280px] w-full shadow-md p-5 border-gray-300 border-2">
            <h2 className="text-xl font-bold">Overview</h2>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Company Name:</h2>
              <h1 className="text-md  text-darkGreen">Shellby Motors</h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Location:</h2>
              <h1 className="text-md  text-darkGreen">Westlands(Nairobi)</h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Model:</h2>
              <h1 className="text-md  text-darkGreen">Car Yard</h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Website:</h2>
              <h1 className="text-md  text-darkGreen">www.carsoko.com</h1>
            </span>
          </div>
          <div className="flex-1 shadow-md p-5 border-gray-300 border-2 items-start">
            <div className="flex flex-col md:flex-row md:gap-5 gap-3">
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
                <div className="border-l-4 border-pink-600 p-5 flex">
                  <div className="flex-1 flex-col">
                    <IoCarSportOutline className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                    <p>Listed cars</p>
                  </div>
                  <div className="flex-1 border-l-4">
                    <h1 className="text-center font-bold text-3xl">234</h1>
                  </div>
                </div>
              </div>
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
                <div className="border-l-4 border-pink-600 p-5 flex">
                  <div className="flex-1 flex-col">
                    <FaFlagCheckered className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                    <p>Flagged</p>
                  </div>
                  <div className="flex-1 border-l-4">
                    <h1 className="text-center font-bold text-3xl">116</h1>
                  </div>
                </div>
              </div>
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
                <div className="border-l-4 border-pink-600 p-5 flex">
                  <div className="flex-1 flex-col">
                    <IoBarChartSharp className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                    <p>Sales Closed</p>
                  </div>
                  <div className="flex-1 border-l-4">
                    <h1 className="text-center font-bold text-3xl">11</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5">
              <div className="logo flex gap-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png"
                  alt="logo"
                  className="object-cover h-16 w-16 rounded-full"
                />
                <div>
                  <p className="text-sm">
                    Ford Motors was founded by Henry Ford and incorporated on
                    June 16, 1903. The company sells automobiles and commercial
                    vehicles under the Ford brand, and luxury cars under its
                    Lincoln brand. Ford also owns a 32% stake in China's
                    Jiangling Motors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
