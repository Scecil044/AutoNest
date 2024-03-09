import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFulfilledState,
  loginPendingState,
  loginRejectedState,
} from "../firebase/userSlice";
import { toast } from "react-toastify";
import BusinessSignUp from "../components/BusinessSignUp";

export default function Login() {
  const navigate = useNavigate();
  const { isError, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setPasswordError("The password field is required");
    } else {
      setPasswordError(null);
    }
    if (!formData.email) {
      setEmailError("The email field is required");
      return;
    } else {
      setEmailError(null);
    }
    dispatch(loginPendingState());
    try {
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
        toast.error(data.message, {
          theme: "colored",
        });

        return;
      }
      dispatch(loginFulfilledState(data));
      navigate("/");
    } catch (error) {
      dispatch(loginRejectedState(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-lato">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] mx-auto p-5 flex flex-col gap-3 shadow-lg"
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
        <h1 className="text-3xl  text-neutral-400">Login</h1>
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded"
          />
          {emailError && (
            <span className="text-red-600 text-sm">{emailError}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded"
          />
          {passwordError && (
            <span className="text-red-600 text-sm">{passwordError}</span>
          )}
        </div>
        <button className="py-1 px-2 w-full flex items-center justify-center bg-darkGreen text-white">
          Continue
        </button>
        <div className="mt-5 text-sm">
          <span>By continuing you agree to AutoNestKenys</span>
          <Link className="text-blue-500 hover:underline">
            Terms of service and use
          </Link>
        </div>

        <div className="mt-5 text-sm flex flex-col">
          <span className="font-semibold">Buy for Business</span>
          <Link
            onClick={() => setOpenModal(true)}
            className="text-blue-500 hover:underline"
          >
            Want to sell on AutoNestKe?
          </Link>
        </div>
      </form>
      <div className="mt-3 flex flex-col gap-1">
        <h1 className="text-sm text-neutral-400 text-center">
          New to AutoNestKenya?
        </h1>
        <Link
          to="/register"
          className="py-1 px-3 hover:bg-blue-50 shadow-lg w-[350px] border border-gray-300 flex items-center justify-center"
        >
          Create your account
        </Link>
      </div>
      {openModal && (
        <BusinessSignUp openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
