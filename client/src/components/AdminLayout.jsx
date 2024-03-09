import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";

import AdminHeader from "../pages/admin/AdminHeader";
import AdminFooter from "../pages/admin/AdminFooter";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.user);

  return user ? (
    <>
      <div className="min-h-screen bg-pampas">
        <AdminHeader />
        <div className="flex">
          <div className="">
            <AdminSidebar />
          </div>
          <main className="flex-1 p-8 overflow-x-auto">
            <Outlet />
           
          </main>
        </div>
        <div className="">
              <AdminFooter />
            </div>
      </div>
    </>
  ) : (
    <Navigate to="atn/auth" />
  );
}
