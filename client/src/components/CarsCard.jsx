import { useEffect, useState } from "react";
import DashboardLoader from "./common/DashboardLoader";
import { Link } from "react-router-dom";

export default function CarsCard() {
  const [vehicleData, setVehicleData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const res = await fetch(`/api/vehicles/get/vehicles`);
        const data = await res.json();
        if (data.success === false) {
          setIsError(data.message);
          setIsLoading(false);
          return;
        }
        setVehicleData(data);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <>
      <div className="font-lato">
        <h1>
          Showing {vehicleData?.vehicles?.length} of {vehicleData.totalVehicles}{" "}
          vehicles
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all duration-100">
          {vehicleData?.vehicles?.map((vehicle, index) => (
            <div className="shadow-md" key={index}>
              <Link to={`/details/${vehicle.slug}`}>
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.registrationNumber}
                  className="object-cover h-40"
                />
              </Link>
              <div className="p-1">
                <h1>
                  {vehicle.brand} {vehicle.model} - {vehicle.year}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center my-5 text-sm">
          <h3>See Personalized Recommendations?</h3>
          <Link to="/login" className="py-1 px-24 bg-popsicle">
            Sign In
          </Link>
          <span>
            New? Create one.{" "}
            <Link className="text-blue-600" to="/register">
              Start here
            </Link>
          </span>
        </div>
      </div>

      {isLoading && <DashboardLoader />}
    </>
  );
}
