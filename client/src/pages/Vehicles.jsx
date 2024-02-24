import { useEffect, useState } from "react";
import DashboardLoader from "../components/common/DashboardLoader";
import { Link } from "react-router-dom";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/vehicles/get/vehicles");
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data.message);
          return;
        }
        setIsLoading(false);
        setIsError(false);
        setVehicles(data.vehicles);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen font-lato">
      <div className="p-5">
        <h1 className="text-2xl">Featured Offers</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5">
          {vehicles.slice(0, 4).map((vehicle, index) => (
            <div key={index} className="shadow-lg bg-white">
              <div className="overflow-hidden relative">
                <div className="bg-popsicle text-white float-left p-1">
                  Best Seller
                </div>
                <Link to="/cars">
                  <img
                    src={vehicle.images[1]}
                    alt={vehicle.model}
                    className="object-cover h-36 w-full hover:scale-105 transition-all duration-300"
                  />
                </Link>
              </div>
              <div>
                <div>
                  {vehicle.brand} {vehicle.model}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLoading && <DashboardLoader />}
    </div>
  );
}
