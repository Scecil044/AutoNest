import { useState } from "react";
import { GiPadlockOpen } from "react-icons/gi";
import { Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRejectedState,
  loginFulfilledState,
  loginPendingState,
} from "../../firebase/userSlice";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [warning, setWarning] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // function to login
  const loginUser = async (e) => {
    e.preventDefault();
    if (!formData.password || formData.password === "") {
      setPasswordError("The Password field is required!");
    } else {
      setPasswordError(false);
    }
    if (!formData.email || formData.email === "") {
      setEmailError("The Password field is required!");
      return;
    } else {
      setEmailError(false);
    }
    try {
      dispatch(loginPendingState());
      setWarning(false);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginRejectedState(data.message));
        setWarning(true);
        return;
      }
      if (res.ok) {
        dispatch(loginFulfilledState(data));
        if (data.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/my/dash");
        }

        setWarning(false);
        toast("welcome back", { type: "success", theme: "dark" });
      }
    } catch (error) {
      setWarning(true);
      dispatch(loginRejectedState(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-serif">
      <form
        onSubmit={loginUser}
        className="flex flex-col shadow-xl shadow-slate-200 w-[400px] p-5 transition-all hover:scale-105 border-gray-300"
      >
        <div className="relative mb-8">
          <h1 className="text-center text-2xl font-bold z-50 absolute right-24">
            AutoNe<span className="">st</span>Kenya
          </h1>
          <img
            src="/nest.png"
            alt="logo"
            className="object-cover h-16 w-16 absolute top-0 right-36 blur-[1px]"
          />
        </div>
        <h1>Welcome back!</h1>
        <h1 className="text-2xl text-neutral-400">Login to your account</h1>
        {warning && (
          <Alert color="warning" withBorderAccent>
            <span className="text-red-600">
              <span className="font-medium">Critical warning!</span>Invalid
              credentials. A snapshot of this trigger will be sent to the system
              administrator
            </span>
          </Alert>
        )}
        <div className="flex flex-col gap-3 my-3">
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="py-1 px-2 w-full focus:outline-none focus:ring-0 border border-x-gray-400"
            />

            {emailError && (
              <h2 className="text-pink-600 text-sm">{emailError}</h2>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="py-1 px-2 w-full focus:outline-none focus:ring-0 border border-x-gray-400"
            />
            {passwordError && (
              <h2 className="text-pink-600 text-sm">{passwordError}</h2>
            )}
          </div>
        </div>
        <button
          disabled={isLoading}
          className="py-1 flex items-center justify-center gap-1 bg-pink-600 text-white  shadow-md hover:bg-pink-600 transition-all duration-300 hover:shadow-none relative disabled:cursor-not-allowed"
        >
          {isLoading && (
            <div className="h-5 w-5 rounded-full border-r-2 border-b-2 animate-spin"></div>
          )}
          Login
          <GiPadlockOpen className="w-5 h-5 absolute left-1 text-black/50" />
        </button>
      </form>
    </div>
  );
}
