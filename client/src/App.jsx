import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/admin/Dashboard";
import { useEffect, useState } from "react";
import UserProfile from "./pages/admin/UserProfile";
import NotFound from "./pages/NotFound";
import Users from "./pages/admin/Users";
import AdminLayout from "./components/AdminLayout";
import Cars from "./pages/Cars";
import ViewCar from "./pages/ViewCar";
import Search from "./pages/Search";
import AppLayout from "./components/AppLayout";
import Services from "./pages/Services";
import Support from "./pages/Support";
import Vehicles from "./pages/admin/Vehicles";
import Companies from "./pages/admin/Companies";
import GuestLayout from "./components/GuestLayout";
import ViewCompany from "./pages/admin/ViewCompany";
import CompanyInventory from "./pages/admin/CompanyInventory";
import TestDrive from "./pages/TestDrive";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import EditVehicle from "./pages/admin/EditVehicle";
import AdminLogin from "./pages/admin/AdminLogin";
import UserHome from "./pages/admin/UserHome";
import SubscriptionModal from "./pages/SubscriptionModal";
import BusinessProfile from "./pages/admin/BusinessProfile";

export default function App() {
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    const currentTab = new URLSearchParams(window.location.search);
    const tabFromUrl = currentTab.get("dashboard");
    if (tabFromUrl === "dashboard") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/search" element={<Search />} />
            <Route path="/support" element={<Support />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testDrive" element={<TestDrive />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact/us" element={<ContactUs />} />
            <Route path="/details/:slug" element={<ViewCar />} />
          </Route>

          {/* Admin routes */}
          <Route path="" element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my/dash" element={<UserHome />} />
            <Route path="/business/profile" element={<BusinessProfile />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/view/company/:companyId" element={<ViewCompany />} />
            <Route path="/view/vehicle/:vehicleId" element={<EditVehicle />} />
            <Route
              path="/company/inventory/:companyId"
              element={<CompanyInventory />}
            />
          </Route>

          <Route path="" element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/subscription" element={<SubscriptionModal />} />
          <Route path="/atn/auth" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
