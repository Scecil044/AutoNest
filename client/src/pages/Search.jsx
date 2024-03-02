import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import CarsCard from "../components/CarsCard";
import { lineWobble } from "ldrs";
import { grid } from "ldrs";
import FilterCard from "../components/FilterCard";

grid.register();

// Default values shown

lineWobble.register();
export default function Search() {
  const navigate = useNavigate();

  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    sustainability: false,
    brand: [],
    model: [],
    cubicCapacity: [],
    color: [],
    mileage: [],
    availability: "",
    status: [],
    price: [],
    size: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.name === "color") {
      const color = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          color: [...prevData.color, color],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          color: prevData.color.filter((c) => c !== color),
        }));
      }
    }
    if (e.target.name === "size") {
      const size = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          size: [...prevData.size, size],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          size: prevData.size.filter((s) => s !== size),
        }));
      }
    }
    if (e.target.name === "brand") {
      const brand = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          brand: [...prevData.brand, brand],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          brand: prevData.brand.filter((b) => b !== brand),
        }));
      }
    }
    if (e.target.name === "model") {
      const model = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          model: [...prevData.model, model],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          model: prevData.model.filter((m) => m !== model),
        }));
      }
    }
    if (e.target.name === "status") {
      const status = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          status: [...prevData.status, status],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          status: prevData.status.filter((s) => s !== status),
        }));
      }
    }
    if (e.target.name === "mileage") {
      const mileage = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          mileage: [...prevData.mileage, mileage],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          mileage: prevData.mileage.filter((m) => m !== mileage),
        }));
      }
    }
    if (e.target.name === "cubicCapacity") {
      const cubicCapacity = e.target.id;
      if (e.target.checked) {
        // If checkbox is checked, add the color to the array
        setSideBarData((prevData) => ({
          ...prevData,
          cubicCapacity: [...prevData.cubicCapacity, cubicCapacity],
        }));
      } else {
        // If checkbox is unchecked, remove the color from the array
        setSideBarData((prevData) => ({
          ...prevData,
          cubicCapacity: prevData.cubicCapacity.filter(
            (m) => m !== cubicCapacity
          ),
        }));
      }
    }
  };
  console.log(sidebarData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sustainabilityFromUrl = urlParams.get("sustainability");
    const availabilityFromUrl = urlParams.get("availability");
    const brandFromUrl = urlParams.get("brand");
    const colorFromUrl = urlParams.get("color");
    const mileageFromUrl = urlParams.get("mileage");
    const priceFromUrl = urlParams.get("price");
    const cubicCapacityFromUrl = urlParams.get("cubicCapacity");
    const statusFromUrl = urlParams.get("status");
    const sizeFromUrl = urlParams.get("size");

    let parsedBrands = [];
    let parseCubicCapacity = [];
    let parseMileage = [];
    let parseStatus = [];
    let parsePrice = [];
    let parseColors = [];
    let parseSizes = [];

    if (brandFromUrl) {
      parsedBrands = brandFromUrl
        .split(",")
        .map((brand) => brand.toLowerCase());
    }
    if (cubicCapacityFromUrl) {
      parseCubicCapacity = cubicCapacityFromUrl
        .split(",")
        .map((cubicCapacity) => parseInt(cubicCapacity));
    }
    if (statusFromUrl) {
      parseStatus = statusFromUrl
        .split(",")
        .map((status) => status.toLowerCase());
    }
    if (priceFromUrl) {
      parsePrice = priceFromUrl.split(",").map((price) => parseInt(price));
    }
    if (colorFromUrl) {
      parseColors = colorFromUrl.split(",").map((color) => color.toLowerCase());
    }
    if (sizeFromUrl) {
      parseSizes = sizeFromUrl.split(",").map((size) => size.toLowerCase());
    }
    if (mileageFromUrl) {
      parseMileage = mileageFromUrl.split(",").map((mile) => parseInt(mile));
    }

    if (
      searchTermFromUrl ||
      sustainabilityFromUrl ||
      brandFromUrl ||
      cubicCapacityFromUrl ||
      availabilityFromUrl ||
      statusFromUrl ||
      priceFromUrl ||
      colorFromUrl ||
      sizeFromUrl ||
      mileageFromUrl
    ) {
      setSideBarData({
        sustainability: sustainabilityFromUrl === "true" ? true : false,
        brand: parsedBrands,
        cubicCapacity: parseCubicCapacity,
        availability: availabilityFromUrl,
        status: parseStatus,
        price: parsePrice,
        color: parseColors,
        size: parseSizes,
        mileage: parseMileage,
        searchTerm: searchTermFromUrl,
      });
    }

    // function to get vehicles based on url params
    const fetchFilteredList = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/vehicles/get/vehicles?${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setIsLoading(false);
          setIsError(data.message);
          return;
        }
        setSearchResults(data.vehicles);
        console.log(searchResults);

        setIsLoading(false);
        console.log(searchResults.length);
      } catch (error) {
        setIsLoading(false);
        setIsError(error.message);
      }
    };
    // function call
    fetchFilteredList();
  }, [location.search]);
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("availability", sidebarData.availability);
    urlParams.set("sustainability", sidebarData.sustainability);
    urlParams.set("size", sidebarData.size);

    // Handle arrays
    sidebarData?.brand?.forEach((brand) => urlParams.append("brand", brand));
    sidebarData?.model?.forEach((model) => urlParams.append("model", model));
    sidebarData?.cubicCapacity?.forEach((cc) =>
      urlParams.append("cubicCapacity", cc)
    );
    sidebarData?.color?.forEach((color) => urlParams.append("color", color));
    sidebarData?.mileage?.forEach((mileage) =>
      urlParams.append("mileage", mileage)
    );
    sidebarData?.status?.forEach((status) =>
      urlParams.append("status", status)
    );
    sidebarData?.price?.forEach((price) => urlParams.append("price", price));

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="min-h-screen">
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
                    checked={sidebarData.sustainability === true}
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
                      checked={sidebarData.brand.includes("mazda")}
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
                      checked={sidebarData.brand.includes("bmw")}
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
                      checked={sidebarData.brand.includes("mercedes")}
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
                      checked={sidebarData.brand.includes("peugeot")}
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
                      checked={sidebarData.brand.includes("porsche")}
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
                      checked={sidebarData.brand.includes("toyota")}
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
                      checked={sidebarData.brand.includes("mitsubishi")}
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
                      checked={sidebarData.brand.includes("subaru")}
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
                      checked={sidebarData.brand.includes("volkswagen")}
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
                      checked={sidebarData.brand.includes("hyundai")}
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
                      checked={sidebarData.brand.includes("honda")}
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
                      checked={sidebarData.brand.includes("nissan")}
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
                      checked={sidebarData.size.includes("suv")}
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
                      checked={sidebarData.size.includes("cross")}
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
                      checked={sidebarData.size.includes("sedan")}
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
                      checked={sidebarData.size.includes("saloon")}
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
                      checked={sidebarData.size.includes("truck")}
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
                      checked={sidebarData.cubicCapacity.includes(1000)}
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
                      checked={sidebarData.cubicCapacity.includes(1100)}
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
                      checked={sidebarData.cubicCapacity.includes(1350)}
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
                      checked={sidebarData.cubicCapacity.includes(1500)}
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
                      checked={sidebarData.cubicCapacity.includes(1800)}
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
                      checked={sidebarData.cubicCapacity.includes(2000)}
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
                      checked={sidebarData.cubicCapacity.includes(2500)}
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
                      checked={sidebarData.cubicCapacity.includes(3000)}
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
                      checked={sidebarData.cubicCapacity.includes(3001)}
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
                      checked={sidebarData.price.includes(800000)}
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
                      checked={sidebarData.price.includes(1000000)}
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
                      checked={sidebarData.price.includes(1500000)}
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
                      checked={sidebarData.price.includes(2000000)}
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
                      checked={sidebarData.price.includes(3000000)}
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
                      checked={sidebarData.price.includes(3000001)}
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
                    checked={sidebarData.color.includes("red")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="white"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-white bg-white h-7 w-7"
                    checked={sidebarData.color.includes("white")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="purple"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#A214B2] bg-[#A214B2] h-7 w-7"
                    checked={sidebarData.color.includes("purple")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="green"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#2DBE33] bg-[#2DBE33] h-7 w-7"
                    checked={sidebarData.color.includes("green")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="brown"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#836105] bg-[#836105] h-7 w-7"
                    checked={sidebarData.color.includes("brown")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="orange"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-amber-500 bg-amber-500 h-7 w-7"
                    checked={sidebarData.color.includes("orange")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="blue"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen bg-blue-600 h-7 w-7"
                    checked={sidebarData.color.includes("blue")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="pink"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-pink-500 bg-pink-500 h-7 w-7"
                    checked={sidebarData.color.includes("pink")}
                  />
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="color"
                    id="grey"
                    className="p-2 border-2 border-gray-300 rounded-full focus:ring-darkGreen text-[#C5E8EE] bg-[#C5E8EE] h-7 w-7"
                    checked={sidebarData.color.includes("grey")}
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
                      checked={sidebarData.status.includes("locallyused")}
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
                      checked={sidebarData.status.includes("foreignused")}
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
                      checked={sidebarData.status.includes("new")}
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
                    checked={sidebarData.availability === "all"}
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
                <button type="button" className="py-1 px-2">
                  Cancel
                </button>
              </div>
            </div>
            {/* right component */}
            <div className="flex-1">
              <div className="h-72 p-2 bg-gradient-to-tr from-black via-darkGreen to-gray-black/50 w-full flex items-center justify-center ">
                <form
                  onSubmit={handleSearch}
                  className=" w-[85%] md:w-[70%] bg-gray-300 rounded-2xl"
                >
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Type something to search"
                      id="searchTerm"
                      value={sidebarData.searchTerm}
                      onChange={handleChange}
                      className="bg-inherit w-full border-none focus:outline-none focus:ring-0 font-medium font-roboto italic"
                    />
                    <button className="px-2 border-none outline-none bg-darkGreen text-white rounded-r-2xl">
                      Search
                    </button>
                  </div>
                </form>
              </div>
              {/* Search results */}
              <div className="searchResult h-full">
                {isLoading && (
                  <div className="flex w-full justify-center h-full">
                    <div className="mt-32 md:mt-72">
                      <l-grid size="150" speed="1.5" color="orange"></l-grid>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <FilterCard vehicles={searchResults} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
