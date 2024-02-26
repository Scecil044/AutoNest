import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutUser } from "../firebase/userSlice";
import { CiPhone } from "react-icons/ci";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const [showDropShadow, setShowDropShadow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [handleDropDown, setHandleDropDown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  // function to logout user
  const logoutUser = async () => {
    try {
      setIsLoading(false);
      setIsError(false);
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setIsError(data.message);
        return;
      }
      if (res.ok) {
        setIsLoading(false);
        setIsError(false);
        dispatch(signOutUser());
      }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
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
            <CiPhone className="h-8 w-6" />
            Contact us
          </button>
          {user ? (
            <img
              onClick={() => setHandleDropDown((prev) => !prev)}
              src={user.profilePicture}
              alt="profile"
              className="object-cover h-12 w-12 rounded-full cursor-pointer"
            />
          ) : (
            <Link
              to="/login"
              className="flex items-center hover:border-b-2 hover:bg-black/50 px-2 hover:border-white"
            >
              <FaRegUser className="h-5 w-5" />
              Sign in
            </Link>
          )}
        </nav>
        {handleDropDown && (
          <div className="absolute right-0 top-12 text-black bg-white shadow-md w-[180px] rounded-sm">
            <div className="flex flex-col">
              <Link className="flex gap-1 items-center py-2 px-2 w-full hover:bg-black/50 hover:text-white transition-all duration-200">
                <FaUserFriends className="h-7 w-7" />
                Profile
              </Link>
              <button
                type="button"
                onClick={logoutUser}
                className="flex gap-1 items-center py-2 px-2 w-full hover:bg-black/50 hover:text-white transition-all duration-200"
              >
                <IoLogOutOutline className="h-7 w-7" />
                Logout
              </button>
            </div>
          </div>
        )}
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
