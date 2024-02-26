import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "flowbite-react";
import TermsAndConditions from "../components/common/TermsAndConditions";

export default function ViewCar() {
  const { slug } = useParams();
  const [vehicle, setVehicle] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(1);

  //function to handle tabls
  const handleTabs = (tabIndex) => {
    setIsActive(tabIndex);
  };
  // Fetch specific vehicle
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`/api/vehicles/get/vehicles?slug=${slug}`);
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data.message);
          return;
        }
        setVehicle(data.vehicles[0]);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [slug]);

  return (
    <div className="min-h-screen font-lato">
      <div className="hidden md:flex p-5 gap-8">
        <div className="flex-1 h-56 sm:h-64 xl:h-80 2xl:h-96 bg-darkGreen">
          <Carousel slide={false}>
            {vehicle?.images?.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt="picture"
                className="object-cover h-full"
              />
            ))}
          </Carousel>

          <div className="flex flex-col overflow-x-auto h-[300px]">
            <div className=" w-full p-3 mt-3 bg-darkGreen text-white">
              Includes
            </div>
            <div className=" w-full p-3 mt-3 bg-darkGreen text-white">
              About this Vehicle
            </div>
            <div className=" w-full p-3 mt-3 bg-darkGreen text-white">
              Peace of mind
            </div>
            <div className=" w-full p-3 mt-3 bg-darkGreen text-white">
              Representative Example
            </div>
            <div className=" w-full p-3 mt-3 bg-darkGreen text-white">
              Terms and Conditions
            </div>
            <div className="shadow-md p-5">
              <TermsAndConditions />
            </div>
          </div>
        </div>
        {/* right component */}
        <div className="flex-1">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-4xl flex gap-10 font-bold">
                <h1>
                  {vehicle?.brand} {vehicle?.model}
                </h1>
                <h1>{vehicle?.year}</h1>
              </span>
              <div>
                {vehicle?.brand === "Ford" ? (
                  <img
                    src="/ford.png"
                    alt="logo"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                ) : vehicle?.brand === "Subaru" ? (
                  <img
                    src="/subaru.png"
                    alt="logo"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                ) : vehicle?.brand === "Mazda" ? (
                  <img
                    src="/mazda.jpg"
                    alt="logo"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <span className="text-3xl">
              <p>4.4 P530 V8 SV LWB 4dr Auto 2023</p>
            </span>
          </div>
          <div className="card shadow-lg border border-gray-400 pt-5 px-5 mt-5 bg-gray-50">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">
                  ksh {vehicle?.cashPrice || "2,500,000"}
                </h1>
                <span>Cash price</span>
              </div>

              <div className="flex flex-col mt-5">
                <h1 className="text-3xl font-semibold">
                  ksh {vehicle?.monthlyPrice || "2,800,000"}
                </h1>
                <span>Monthly price</span>
              </div>
            </div>

            <div className="finance">
              <span className="flex items-center gap-5">
                <h2 className="text-2xl">Finance type</h2>
                <div className="flex items-center gap-1">
                  <input type="radio" className="h-6 w-6" />
                  <h2 className="text-xl">HP</h2>
                </div>

                <div className="flex items-center gap-1">
                  <input type="radio" className="h-6 w-6" />
                  <h2 className="text-xl">PCP</h2>
                </div>
              </span>
            </div>
            <div className="payment">
              {/* tabs */}
              <div className="flex gap-1 mt-3">
                <button
                  onClick={() => handleTabs(1)}
                  className={`flex-1  text-black py-3 px-4 transition-all duration-200 shadow-md hover:font-semibold ${
                    isActive === 1 ? "bg-darkGreen text-white" : ""
                  }`}
                >
                  Cash Deposit
                </button>
                <button
                  onClick={() => handleTabs(2)}
                  className={`flex-1  text-black py-3 px-4 transition-all duration-200 shadow-md hover:font-semibold ${
                    isActive === 2 ? "bg-darkGreen text-white" : ""
                  }`}
                >
                  Cash Deposit
                </button>
              </div>

              <div className="mt-5">
                <button className="w-full flex items-center justify-center py-3 px-6 bg-[#09c81c] text-white shadow-md transition-all duration-150 hover:opacity-80">
                  Reserve Online
                </button>
                <button className="w-full flex items-center justify-center py-3 px-6">
                  Call us on +254716575897
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
