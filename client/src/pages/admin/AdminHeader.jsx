
import { useState } from "react";
import { signOutUser } from "../../firebase/userSlice";
import { MdOutlineMessage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function AdminHeader() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [handleDropDown, setHandleDropDown] = useState(false);
    // function to logout user
    const logoutUser = async () => {
      try {
        await fetch("/api/auth/logout");
        dispatch(signOutUser());
        setHandleDropDown(false);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
    <header className="w-full bg-pink-800 text-white p-3 flex items-center justify-between shadow-md relative">
          <Link to="/dashboard" className="text-lg font-bold">
            <span className="text-3xl">A</span>UTO
            <span className="text-popsicle">NEST</span>KENYA
          </Link>

          <div className="flex items-center gap-2">
            <button className="relative">
              <div className="rounded-full h-5 w-5 bg-red-700 absolute -top-2 -right-1 flex items-center justify-center">
                <h1 className="text-white">1</h1>
              </div>
              <MdOutlineMessage className="text-black h-8 w-8" />
            </button>
            {/* avatar */}
            <div
              onClick={() => {
                setHandleDropDown((prev) => !prev);
              }}
              className="cursor-pointer flex items-center"
            >
              <img
                src={
                  user?.profilePicture ||
                  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                }
                alt="avatar"
                className="h-10 w-10 object-cover rounded-full"
              />
              <small>
                {user?.firstName + " " + user?.lastName.charAt(0).toUpperCase()}
              </small>
            </div>
          </div>
          {handleDropDown && (
            <div className="absolute bg-white w-[190px] top-[70px] text-black right-1 z-10 shadow-md border-gray-300">
              <div className="flex flex-col">
                <Link
                  to={`/profile/${user._id}`}
                  className="flex gap-1 items-center py-2 px-2 w-full hover:bg-black/50 hover:text-white transition-all duration-200"
                >
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
    </>
  )
}
