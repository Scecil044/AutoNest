import { useEffect, useState } from "react";
import DashboardLoader from "./common/DashboardLoader";
import { Link } from "react-router-dom";
import Oauth from "./Oauth";
import QueueAnim from "rc-queue-anim";
import { useSelector } from "react-redux";

export default function CarsCard() {
  const { user } = useSelector((state) => state.user);
  const [vehicleData, setVehicleData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);

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
        if (res.ok) {
          setVehicleData(data);
          setIsLoading(false);
          setIsError(false);
        }
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);
  const handleShowMore = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const startIndex = vehicleData.length;
      const res = await fetch(
        `/api/vehicles/get/vehicles?startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data.vehicles.length);
      if (data.success === false) {
        setIsError(data.message);
        setIsLoading(false);
        return;
      }
      if (res.ok) {
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="font-lato">
        <h1>
          Showing {vehicleData?.vehicles?.length} of {vehicleData.totalVehicles}{" "}
          vehicles
        </h1>
        <QueueAnim
          delay={400}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all duration-100"
        >
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
        </QueueAnim>

        <button
          onClick={handleShowMore}
          className="hover:bg-blue-50 py-2 w-full flex items-center justify-center shadow-md tracking-wide my-2"
        >
          Show More ...
        </button>

        {!user && (
          <div className="flex flex-col items-center justify-center my-5 text-sm">
            <h3>See Personalized Recommendations?</h3>
            <Oauth />
            <span>
              New? Create one.{" "}
              <Link className="text-blue-600" to="/register">
                Start here
              </Link>
            </span>
          </div>
        )}
      </div>

      {isLoading && <DashboardLoader />}
    </>
  );
}
