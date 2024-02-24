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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin routes */}
          <Route path="" element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        {showFooter && <Footer />}
      </Router>
    </>
  );
}
