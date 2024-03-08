import { Link } from "react-router-dom";
import { adminLinks, userLinks } from "../../data";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdBusiness } from "react-icons/md";
import { useSelector } from "react-redux";
import { PiEngineFill } from "react-icons/pi";
import { IoIosAlarm } from "react-icons/io";
import { HiClipboardDocument } from "react-icons/hi2";
import { GrGoogleWallet } from "react-icons/gr";

export default function AdminSidebar() {
  const { user } = useSelector((state) => state.user);

  return user && user?.isAdmin ? (
    <div className="w-[80px] md:w-[150px] bg-pink-800 text-white h-full">
      <div>
        {adminLinks.map((item, index) => (
          <div key={index} className="flex flex-col gap-5">
            <Link
              to={item.link}
              className="text-white p-2 px-4 hover:bg-black/50 flex items-center gap-1"
            >
              {item.name === "Home" ? (
                <FaHome className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "Users" ? (
                <FaUsers className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "Vehicles" ? (
                <IoCarSport className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "companies" ? (
                <MdBusiness className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "Settings" ? (
                <PiEngineFill
                  className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`}
                />
              ) : item.name === "Reports" ? (
                <HiClipboardDocument
                  className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`}
                />
              ) : item.name === "Finance" ? (
                <GrGoogleWallet
                  className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`}
                />
              ) : item.name === "Reminders" ? (
                <IoIosAlarm className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : (
                ""
              )}
              <span className={`hidden md:inline`}>{item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <>
      <div className="w-[80px] md:w-[150px] bg-pink-800 text-white h-full">
        {userLinks.map((item, index) => (
          <div key={index}>
            <Link
              to={item.link}
              className="text-white p-2 px-4 hover:bg-black/50 flex items-center gap-1"
            >
              {item.name === "Home" ? (
                <FaHome className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "Users" ? (
                <FaUsers className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "Vehicles" ? (
                <IoCarSport className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : item.name === "companies" ? (
                <MdBusiness className={` w-8 h-8 ml-3 md:ml-0 md:h-5 md:w-5`} />
              ) : (
                ""
              )}
              <span className={`hidden md:inline`}>{item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
