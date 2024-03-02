import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QueueAnim from "rc-queue-anim";

export default function PopularCars() {
  const [vehicles, setVehicles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch("/api/vehicles/get/popular/vehicles");
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data.message);
          return;
        }
        setIsLoading(false);
        setIsError(false);
        setVehicles(data);
        console.log(vehicles);
      } catch (error) {
        setIsError(error.message);
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);
  return (
    <div className="font-lato">
      <div className="p-5">
        <h1 className="text-2xl">PopularCars</h1>

        <QueueAnim
          delay={300}
          className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5"
        >
          {vehicles.map((vehicle, index) => (
            <div key={index} className="shadow-lg bg-white">
              <div className="overflow-hidden relative">
                <Link to={`/details/${vehicle.slug}`}>
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
        </QueueAnim>
      </div>
    </div>
  );
}
