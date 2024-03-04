import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import { toast } from "react-toastify";
import CreateVehicleModal from "../../components/CreateVehicleModal";

export default function Vehicles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cars, setCars] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(true);
  const [totalVehicleCount, setTotalVehicleCount] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/vehicles/get/vehicles");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          if (data.vehicles.length < 9) {
            setShowMore(false);
          }
          setLoading(false);
          setError(false);
          setTotalVehicleCount(data.totalVehicles);
          setCars(data.vehicles);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [openModal, openCreateModal]);

  const handleShowMore = async () => {
    const startIndex = cars.length;
    try {
      const res = await fetch(
        `/api/vehicles/get/vehicles?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        toast(data.message, { type: "error", theme: "colored" });
      }
      if (res.ok) {
        setCars((prev) => [...prev, ...data.vehicles]);
        if (data.vehicles.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const filteredVehicles = cars.filter(
    (vehicle) =>
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registrationNumber
        .split(" ")
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase().split(" ").join("")) ||
      vehicle.mileage.toString().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen font-lato">
      <div className="p-5 bg-white border-gray-300 shadow-lg overflow-x-auto table-auto">
        <span className="flex gap-1">
          Showing {cars.length} of {totalVehicleCount}
          <p className="text-popsicle">vehicles</p>
        </span>
        <div className="flex items-center justify-between m-2">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="py-2 px-4 bg-[#212121] text-white shadow-md hover:shadow-none transition-all duration-100 hover:opacity-90 rounded"
          >
            Add New
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-400 focus:outline-none rounded py-1 px-2"
          />
        </div>

        <table className="w-full">
          <thead className="p-2 bg-gray-300 text-left">
            <tr>
              <th className="border-b P-2">No.</th>
              <th className="border-b P-2">Image</th>
              <th className="border-b P-2">Brand/model</th>
              <th className="border-b P-2">Year</th>
              <th className="border-b P-2">Color</th>
              <th className="border-b P-2">Mileage</th>
              <th className="border-b P-2">Reg.No</th>
              <th className="border-b P-2">price</th>
              <th className="border-b P-2 text-nowrap">Company</th>
              <th className="border-b P-2">Action</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={10}>
                  <div className="w-full flex items-center justify-center mt-2">
                    <div className="rounded-full h-12 w-12 animate-spin border-b-2 border-r-2 border-b-orange-500 border-r-blue-700"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border-b-2">{(index += 1)}</td>
                  <td className="px-2 py-1 border-b-2">
                    <img
                      src={vehicle.images[0]}
                      alt="avatar"
                      className="h-10 w-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-2 py-1 border-b-2 text-nowrap">
                    {vehicle.brand + " " + vehicle.model}
                  </td>
                  <td className="px-2 py-1 border-b-2">{vehicle.year}</td>
                  <td className="px-2 py-1 border-b-2">{vehicle.color}</td>
                  <td className="px-2 py-1 border-b-2 text-nowrap">
                    {vehicle.mileage} Kms
                  </td>
                  <td className="px-2 py-1 border-b-2 text-nowrap">
                    {vehicle.registrationNumber}
                  </td>
                  <td className="px-2 py-1 border-b-2 text-nowrap">
                    {vehicle.price || "N/A"}
                  </td>
                  <td className="px-2 py-1 border-b-2 text-nowrap">
                    {vehicle.price || "N/A"}
                  </td>
                  <td className="px-2 py-1 border-b-2 flex items-center gap-2">
                    <Link
                      to={`/profile/${vehicle._id}`}
                      className="py-1 px-2 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                    >
                      <FaEdit className="text-blue-500 h-5 w-5" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setVehicleId(vehicle._id);
                      }}
                      className="py-1 px-2 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                    >
                      <MdDelete className="text-red-500 h-5 w-5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="flex py-2 px-3 w-full hover:bg-blue-50 shadow-md items-center justify-center"
          >
            Show more...
          </button>
        )}
      </div>
      {openModal && (
        <DeleteModal
          role="deleteVehicle"
          vehicleId={vehicleId}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {openCreateModal && (
        <CreateVehicleModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      )}
    </div>
  );
}
