import { useEffect, useState } from "react";
import DashboardLoader from "./common/DashboardLoader";

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
      <div>
        <h1>
          Showing {vehicleData?.vehicles?.length} of {vehicleData.totalVehicles}{" "}
          vehicles
        </h1>
        {vehicleData?.vehicles?.map((vehicle, index) => (
          <div className="shadow-md" key={index}>
            car1
            <div>
              <img
                src={vehicle.images[0]}
                alt={vehicle.registrationNumber}
                className="object-cover h-32"
              />
            </div>
          </div>
        ))}
      </div>

      <DashboardLoader />
    </>
  );
}
