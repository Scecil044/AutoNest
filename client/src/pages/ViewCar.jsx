import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "flowbite-react";

export default function ViewCar() {
  const { slug } = useParams();
  const [vehicle, setVehicle] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen">
      hello
      <div className="flex p-5">
        <div className="flex-1 h-56 sm:h-64 xl:h-80 2xl:h-96">
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
        </div>
        <div className="flex-1">{vehicle?.brand}</div>
      </div>
    </div>
  );
}
