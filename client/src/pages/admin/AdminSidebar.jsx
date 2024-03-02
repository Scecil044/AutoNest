import { Link } from "react-router-dom";
import { adminLinks } from "../../data";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdBusiness } from "react-icons/md";

export default function AdminSidebar() {
  return (
    <div className="w-[180px] bg-[#212121] text-white h-full">
      {adminLinks.map((item, index) => (
        <div key={index} className="flex flex-col gap-5">
          <Link
            to={item.link}
            className="text-white p-2 px-4 hover:bg-black/50 flex items-center gap-1"
          >
            {item.name === "Home" ? (
              <FaHome className="h-5 w-5" />
            ) : item.name === "Users" ? (
              <FaUsers className="h-5 w-5" />
            ) : item.name === "Vehicles" ? (
              <IoCarSport className="h-5 w-5" />
            ) : item.name === "companies" ? (
              <MdBusiness className="h-5 w-5" />
            ) : (
              ""
            )}
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
