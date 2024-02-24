import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFulfilledState,
  loginPendingState,
  loginRejectedState,
} from "../firbase/userSlice";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { isError, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

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
    <div className="min-h-screen flex items-center justify-center font-lato">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] mx-auto p-5 flex flex-col gap-3"
      >
        <h1 className="text-2xl">Login</h1>
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
        <button className="py-1 px-2 w-full flex items-center justify-center">
          Continue
        </button>
        <div className="mt-5 text-sm">
          <span>By continuing you agree to AutoNestKenys</span>
          <Link className="text-blue-500 hover:underline">
            Terms of service and use
          </Link>
        </div>
      </form>
    </div>
  );
}
