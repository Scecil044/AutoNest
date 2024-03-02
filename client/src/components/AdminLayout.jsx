import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  return user && user.isAdmin ? (
    <>
      <div className="min-h-screen bg-pampas">
        <header className="w-full bg-[#212121] text-white p-5">header</header>
        <div className="flex">
          <div className="hidden md:inline">
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
