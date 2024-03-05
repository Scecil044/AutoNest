import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLoader from "../../components/common/DashboardLoader";
import { useSelector } from "react-redux";

export default function CompanyInventory() {
  const { user } = useSelector((state) => state.user);
  const [company, setCompany] = useState({});
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [showMore, setShowMore] = useState(true);

  // show more
  const handleShowMore = async () => {
    // initialize startIndex
    const startIndex = inventory.length;
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(
        `/api/vehicles/get/company/vehicles?userId=${user._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      if (res.ok) {
        setInventory((prev) => [...prev, data.vehicles]);
        setLoading(false);
        setError(false);
        if (data.vehicles.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    //fetch companies from database
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `/api/companies/get/companies?companyId=${params.companyId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setCompany(data.companies);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `/api/vehicles/get/vehicles?userId=${user._id}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          if (data.vehicles.length < 10) {
            setShowMore(false);
          }
          setLoading(false);
          setError(false);
          setInventory(data.vehicles);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCompany();
    fetchVehicles();
  }, []);

  console.log("inventory length", inventory.length);
  return (
    <div className="min-h-screen">
      <div className="flex bg-gradient-to-tr from-pink-600 to-indigo-800 h-[200px] relative">
        <img
          src={company[0]?.bannerImage}
          alt="banner"
          className="w-full object-cover h-full"
        />
        <div className="absolute bg-black/50 inset-0"></div>
        <div className="absolute -bottom-[35px] left-5 rounded-full h-24 w-24">
          <img
            src={
              company[0]?.companyLogo ||
              "https://static.thenounproject.com/png/363640-200.png"
            }
            alt="logo"
            className="rounded-full h-24 w-24"
          />
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-[200px]">
            <h1 className="font-semibold text-2xl">{company[0]?.companyName}</h1>
          </div>
          <div className="flex-1 flex-col">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {inventory.map((vehicle, index) => (
                <div
                  key={index}
                  className="shadow-lg hover:scale-105 transition-all duration-500"
                >
                  {!loading &&
                    vehicle &&
                    vehicle.images &&
                    vehicle.images.length > 0 && (
                      <div className="overflow-hidden">
                        <img
                          src={vehicle?.images[0]}
                          alt="vehicle"
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    )}
                  <div className="px-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1">
                        <h1>{vehicle?.brand}</h1>
                        <h1>{vehicle?.model}</h1>
                      </span>
                      <span>Year: {vehicle?.year}</span>
                    </div>
                  </div>
                  <div className="px-2 text-sm">
                    <span className="flex gap-1">
                      <h3>Mileage:</h3>
                      {vehicle?.mileage}k/m
                    </span>
                  </div>
                  <div className="px-2 text-sm">
                    <span className="flex gap-1">
                      <h3>Price:</h3>
                      2.5M
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="py-2 hover:bg-blue-50 w-full my-3 shadow-md bg-gray-50"
              >
                Show More...
              </button>
            )}
          </div>
        </div>
      </div>

      {loading && <DashboardLoader />}
    </div>
  );
}
