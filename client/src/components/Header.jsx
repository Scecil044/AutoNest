import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

import { FaPhoneVolume } from "react-icons/fa6";

export default function Header() {
  const [showDropShadow, setShowDropShadow] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <header className="bg-darkGreen text-white pr-2 font-lato flex items-center justify-between">
        <Link>AutoNestKe</Link>

        <form
          onSubmit={handleSearch}
          onClick={() => setShowDropShadow(true)}
          className="bg-white md:ml-20"
        >
          <input
            type="text"
            placeholder="Search...."
            className={`md:w-[500px] focus:outline-none focus:ring-2 focus:ring-popsicle ${
              showDropShadow ? "md:w-[550px] border-2 border-popsicle" : ""
            } transition-all duration-100`}
          />
          <button className="py-2 px-2 text-black">Search</button>
        </form>

        <nav className="flex gap-2">
          <button className="flex items-center gap-1 hover:bg-black/50 px-2 py-3">
            <FaPhoneVolume className="h-8 w-6" />
            Contact us
          </button>
          <button className="bg-popsicle py-3 px-4 flex items-center">
            <FaRegUser className="h-6" />
            sign in
          </button>
        </nav>
      </header>
      {showDropShadow && (
        <div
          onClick={() => setShowDropShadow(false)}
          className="fixed h-full w-full bg-black/50 inset-0 top-[49px] z-50"
        ></div>
      )}
    </>
  );
}
