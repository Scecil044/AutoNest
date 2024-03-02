import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { user } = useSelector((state) => state.user);
  return user ? <Navigate to="/" /> : <Outlet />;
}
