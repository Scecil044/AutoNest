import { Link, useNavigate } from "react-router-dom";
import CarsCard from "../components/CarsCard";
import Sidebar from "../components/common/Sidebar";
import { useState } from "react";

export default function Cars() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: [],
    size: [],
    color: [],
    status: [],
    availability: "",
    sustainability: false,
    price: [],
    mileage: [],
    cubicCapacity: [],
  });

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const { id } = e.target;

    if (isChecked) {
      if (e.target.name === "brand") {
        setFormData({ ...formData, brand: [...formData.brand, id] });
      } else if (e.target.name === "size") {
        setFormData({ ...formData, size: [...formData.size, id] });
      } else if (e.target.name === "status") {
        setFormData({ ...formData, status: [...formData.status, id] });
      } else if (e.target.name === "sustainability") {
        setFormData({ ...formData, sustainability: e.target.checked });
      } else if (e.target.name === "availability") {
        setFormData({ ...formData, availability: "all" });
      } else if (e.target.name === "price") {
        setFormData({ ...formData, price: [...formData.price, id] });
      } else if (e.target.name === "mileage") {
        setFormData({
          ...formData,
          mileage: [...formData.mileage, id],
        });
      } else if (e.target.name === "color") {
        setFormData({
          ...formData,
          color: [...formData.color, id],
        });
      } else if (e.target.name === "cubicCapacity") {
        setFormData({
          ...formData,
          cubicCapacity: [...formData.cubicCapacity, parseInt(id)],
        });
      }
    } else {
      if (e.target.name === "brand") {
        setFormData({
          ...formData,
          brand: formData.brand.filter((item) => item !== id),
        });
      } else if (e.target.name === "size") {
        setFormData({
          ...formData,
          size: formData.size.filter((item) => item !== id),
        });
      } else if (e.target.name === "status") {
        setFormData({
          ...formData,
          status: formData.status.filter((item) => item !== parseInt(id)),
        });
      } else if (e.target.name === "sustainability") {
        setFormData({
          ...formData,
          sustainability: false,
        });
      } else if (e.target.name === "availability") {
        setFormData({
          ...formData,
          availability: "",
        });
      } else if (e.target.name === "price") {
        setFormData({
          ...formData,
          price: formData.price.filter((item) => item !== parseInt(id)),
        });
      } else if (e.target.name === "mileage") {
        setFormData({
          ...formData,
          mileage: formData.mileage.filter((item) => item !== parseInt(id)),
        });
      } else if (e.target.name === "color") {
        setFormData({
          ...formData,
          color: formData.color.filter((item) => item !== id),
        });
      } else if (e.target.name === "cubicCapacity") {
        setFormData({
          ...formData,
          cubicCapacity: formData.cubicCapacity.filter(
            (item) => item !== parseInt(id)
          ),
        });
      }
    }
  };
  const handleSearch = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("availability", formData.availability);
    urlParams.set("sustainability", formData.sustainability);
    urlParams.set("price", formData.price.join(","));
    urlParams.set("cubicCapacity", formData.cubicCapacity.join(","));
    urlParams.set("mileage", formData.mileage.join(","));
    urlParams.set("brand", formData.brand.join(","));
    urlParams.set("color", formData.color.join(","));
    urlParams.set("size", formData.size.join(","));
    urlParams.set("status", formData.status.join(","));
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  console.log(formData);
  return (
    <div className="min-h-screen font-lato">
      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <div className="shadow-lg p-2 mb-2">
            <span className="text-sm">
              1-48 of over 100,000 results for{" "}
              <Link className="text-popsicle font-bold">
                "autonestkenya.com"
              </Link>
            </span>
          </div>
          <main className="flex w-full">
            <div className="hidden md:flex flex-col gap-5 md:w-[300px] transition-all duration-150 px-5 p-5">
              <div>
                <h1 className="font-bold">More sustainable products</h1>
                <span className="ml-3 flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="sustainability"
                    name="sustainability"
                    onChange={handleChange}
                    className="text-popsicle focus:ring-popsicle"
                  />
                  Climate Pledge Friendly
                </span>
              </div>
              {/* 
Brands */}
              <div>
                <h1 className="font-bold">Brands</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="mazda"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Mazda
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="BMW"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    BMW
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="mercedes"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Mercedes
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="peugeot"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Peugeot
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="porsche"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Porsche
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="toyota"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Toyota
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="mitsubishi"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Mitsubishi
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="subaru"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Subaru
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="volkswagen"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Volkswagen
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="hyundai"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Hyundai
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="honda"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Honda
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="nissan"
                      name="brand"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Nissan
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <h1 className="font-bold">Vehicle Size</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="SUV"
                      name="size"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    SUV
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="cross"
                      name="size"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Cross-over
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="sedan"
                      name="size"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Sedan
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="saloon"
                      name="size"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Saloon
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="truck"
                      name="size"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Truck
                  </span>
                </div>
              </div>

              {/* Engine options */}
              {/* Category */}
              <div>
                <h1 className="font-bold">Cubic Capacity</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1000"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    1000 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1100"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    1100 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1350"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    1350 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1500"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    1500 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1800"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    1800 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2000"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    2000 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2500"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    2500 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="3000"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    3000 CC
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="3001"
                      name="cubicCapacity"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    <span className="text-nowrap"> Above 3000 CC</span>
                  </span>
                </div>
              </div>

              {/* Price */}
              <div>
                <h1 className="font-bold">Price</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="800000"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    upto 800k
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="100000"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    upto 1M
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="1500000"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    upto 1.5M
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2000000"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    upto 2M
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="3000000"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    upto 3M
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="3000001"
                      name="price"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Above 3M
                  </span>
                </div>
              </div>
              {/* Colors */}
              <div>
                <h1 className="font-bold">Color</h1>
                <span className="ml-3 flex flex-wrap gap-4">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="red"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-red-600 bg-red-600 h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="white"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-white bg-white h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="purple"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#A214B2] bg-[#A214B2] h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="green"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#2DBE33] bg-[#2DBE33] h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="brown"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#836105] bg-[#836105] h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="orange"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-amber-500 bg-amber-500 h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="blue"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen bg-blue-600 h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="pink"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-pink-500 bg-pink-500 h-7 w-7"
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="gray"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#C5E8EE] bg-[#C5E8EE] h-7 w-7"
                  />
                </span>
              </div>

              {/* Used */}
              <div>
                <h1 className="font-bold">Status</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="locallyUsed"
                      name="status"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Locally used
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="foreignUsed"
                      name="status"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Ex-Japan
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="new"
                      name="status"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    Brand New
                  </span>
                </div>
              </div>

              {/* Mileage */}
              <div>
                <h1 className="font-bold">Mileage</h1>
                <div className="grid grid-cols-2 gap-1">
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="33000"
                      name="mileage"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    <span>upto 33k</span>
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="60000"
                      name="mileage"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    <span>upto 60kk</span>
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="100000"
                      name="mileage"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    <span>upto 100k</span>
                  </span>
                  <span className="ml-3 flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="100001"
                      name="mileage"
                      onChange={handleChange}
                      className="text-popsicle focus:ring-popsicle"
                    />
                    <span>Above 100k</span>
                  </span>
                </div>
              </div>
              {/* Availability */}

              <div>
                <h1 className="font-bold">Availability</h1>
                <span className="ml-3 flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="availability"
                    name="availability"
                    onChange={handleChange}
                    className="text-popsicle focus:ring-popsicle"
                  />
                  Include out of stock
                </span>
              </div>
              <div className="flex items-center gap-5 justify-center">
                <button
                  onClick={handleSearch}
                  className="py-1 px-2 bg-popsicle"
                >
                  Apply
                </button>
                <button className="py-1 px-2">Cancel</button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="h-72 p-2 bg-gradient-to-tr from-black to-gray-400 w-full"></div>
              <CarsCard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
