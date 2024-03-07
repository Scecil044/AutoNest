import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signOutUser } from "../firebase/userSlice";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  return user && user.isAdmin ? (
    <>
      <div className="min-h-screen bg-pampas">
        <header className="w-full bg-pink-800 text-white p-3 flex items-center justify-between shadow-md relative">
          <Link to="/dashboard" className="text-lg font-bold">
            <span className="text-3xl">A</span>UTO
            <span className="text-popsicle">NEST</span>KENYA
          </Link>
          {/* avatar */}
          <div
            onClick={() => {
              setHandleDropDown((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            <img
              src={
                user?.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              }
              alt="avatar"
              className="h-10 w-10 object-cover rounded-full"
            />
          </div>
          {handleDropDown && (
            <div className="absolute bg-white w-[160px] top-[70px] text-black right-1 z-10 shadow-md border-gray-300">
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
        <div className="flex">
          <div className="">
            <AdminSidebar />
          </div>
          <main className="flex-1 p-8 overflow-x-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
}
