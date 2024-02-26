import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const [showDropShadow, setShowDropShadow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [handleDropDown, setHandleDropDown] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchFromURL = urlParams.get("searchTerm");
    if (searchFromURL) {
      setSearchTerm(searchFromURL);
    }
  }, [location.search]);
  return (
    <>
      <header className="bg-darkGreen text-white pr-2 font-lato flex items-center justify-between relative">
        <Link to="/" className="px-2 text-lg font-roboto font-bold">
          <span className="text-3xl text-nowrap">A</span>utoNestKe
        </Link>

        <form
          onSubmit={handleSearch}
          onClick={() => setShowDropShadow(true)}
          className="bg-white md:ml-20 relative"
        >
          <input
            type="text"
            placeholder="Search...."
            value={searchTerm}
            className={`w-48 md:w-[500px] text-black focus:outline-none focus:ring-2 focus:ring-popsicle ${
              showDropShadow ? "md:w-[550px] border-2 border-popsicle" : ""
            } transition-all duration-100`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute top-1 px-2 py-1">
            <IoIosSearch className="h-6 w-6" />
          </button>
        </form>

        <nav className="flex gap-2">
          <button className="hidden md:flex items-center gap-1 hover:bg-black/50 px-2 py-3">
            <FaPhoneVolume className="h-8 w-6" />
            Contact us
          </button>
          {user ? (
            <img
              src={user.profilePicture}
              alt="profile"
              className="object-cover h-12 w-12 rounded-full"
            />
          ) : (
            <button className="bg-popsicle py-3 px-4 flex items-center">
              <FaRegUser className="h-6" />
              sign in
            </button>
          )}
        </nav>
        <div className="absolute right-0 top-12 text-black bg-white shadow-md w-[180px] pt-2 rounded-sm">
          <div className="flex flex-col">
            <Link className="py-1 px-2 w-full hover:bg-black/50 hover:text-white transition-all duration-200">
              Profile
            </Link>
            <Link className="py-1 px-2 w-full hover:bg-black/50 hover:text-white transition-all duration-200">
              Logout
            </Link>
          </div>
        </div>
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
