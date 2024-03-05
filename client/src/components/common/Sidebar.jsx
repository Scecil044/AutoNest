import { MdContactSupport } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";
import { PiEngineFill } from "react-icons/pi";
import { FaCar, FaInfoCircle, FaHome, FaTools } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className=" hidden md:flex text-white bg-[#003566] min-h-screen w-[100px] text-sm font-lato">
      <div className="flex flex-col gap-1">
        <Link
          to="/"
          className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2"
        >
          <FaHome className="h-7 w-7 text-gray-300" />
          Home
        </Link>
        <Link
          to="/cars"
          className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2"
        >
          <FaCar className="h-7 w-7 text-gray-300" />
          Inventory
        </Link>
        <Link
          to="/services"
          className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2"
        >
          <FaTools className="h-7 w-7 text-gray-300" />
          Services
        </Link>
        <Link className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2">
          <PiEngineFill className="h-7 w-7 text-gray-300" />
          Test Drives
        </Link>
        <Link className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2">
          <GiNetworkBars className="h-7 w-7 text-gray-300" />
          Our Network
        </Link>
        <Link className="flex flex-col items-center text-nowrap hover:bg-black/50 p-2">
          <FaInfoCircle className="h-7 w-7 text-gray-300" />
          Whats new
        </Link>
        <Link className="flex flex-col items-center text-nowrap hover:bg-black/50  p-2">
          <MdContactSupport className="h-7 w-7 text-gray-300" />
          Support
        </Link>
      </div>
    </div>
  );
}
