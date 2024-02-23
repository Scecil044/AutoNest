import { Link } from "react-router-dom";
import { companyInfo, footerVehicleLinks } from "../data";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Footer() {
  return (
    <div className="text-white">
      <div className="bg-[#292929] p-5">
        <h1 className="text-white p-5">
          Used Cars
          <div className="h-[1px] w-full bg-gray-400 mt-3"></div>
          <div className="text-[13px] mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {footerVehicleLinks.map((vehicle, index) => (
              <Link key={index} className="hover:underline">
                Used {vehicle.title}
              </Link>
            ))}
          </div>
        </h1>
      </div>
      <div className="bg-[#212121] p-5">
        <h1 className="text-white p-3">Contact Us</h1>
        <div className="h-[1px] w-full bg-gray-400 mt-3"></div>
        <div className="text-[13px] mt-3 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          <div>
            <h1 className="text-white px-4 text-[15px]">Address</h1>
            <div className="flex justify-between sm:flex-col gap-8 p-5">
              <div className="flex flex-col gap-1">
                <p className="flex text-nowrap">P.O. BOX 0100-10200</p>
                <p>Hill Lane</p>
                <p>Alimran Parlor</p>
                <p>Upper Hill - Nairobi</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link className="flex items-center gap-2 hover:text-amber-500">
                  <MdEmail className="h-5 w-5" />
                  <span className="flex text-ellipsis">
                    autonestKenya@gmail.com
                  </span>
                </Link>
                <Link className="flex items-center gap-2 hover:text-amber-500">
                  <FaPhoneVolume className="h-5 w-5" />
                  +254716575897
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-white px-4 text-[15px]">Active Hours</h1>
            <div className="flex gap-5 md:gap-10 p-5">
              <div className="flex flex-col gap-2">
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Monday
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Tuesday
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Wednesday
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Thursday
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Friday
                </span>
                <span className="flex gap-1 items-center">
                  <FaRegCalendarAlt className="h-5 w-5" />
                  Saturday
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p>8:00am - 5:00pm</p>
                <p>8:00am - 5:00pm</p>
                <p>8:00am - 5:00pm</p>
                <p>8:00am - 5:00pm</p>
                <p>8:00am - 5:00pm</p>
                <p>8:00am - 5:00pm</p>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-white px-4 text-[15px]">Quick Links Hours</h1>
            <div className="flex flex-col gap-1 p-5">
              <Link className="hover:underline">About AutoNestkenya</Link>
              <Link className="hover:underline">Our Services</Link>
              <Link className="hover:underline">Financing</Link>
              <Link className="hover:underline">Our Impact</Link>
              <Link className="hover:underline"></Link>Testimonials
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#212121] p-5">
        <h1 className="text-white">Company Information</h1>
        <div className="h-[1px] w-full bg-gray-400 mt-3"></div>
        <p className="text-[13px] mt-3">{companyInfo}</p>
      </div>
      <div className="bg-[#292929] flex justify-between sm:hidden p-5 text-sm">
        <Link className="flex flex-col items-center">
          <FaPhoneVolume className="h-7 w-7" />
          Book a tour
        </Link>
        <Link className="flex flex-col items-center">
          <IoLocation className="h-7 w-7" />
          Locate us
        </Link>
        <Link className="flex flex-col items-center">
          <IoLogoWhatsapp className="h-7 w-7" />
          Message us
        </Link>
      </div>
    </div>
  );
}
