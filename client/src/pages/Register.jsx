import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFulfilledState,
  loginPendingState,
  loginRejectedState,
} from "../firbase/userSlice";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { isError, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [confirmationError, setConfirmationError] = useState(null);

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
    } else {
      setEmailError(null);
    }
    if (!formData.firstName) {
      setFirstNameError("The first Name field is required");
    } else {
      setFirstNameError(null);
    }
    if (!formData.lastName) {
      setLastNameError("The Last Name field is required");
    } else {
      setLastNameError(null);
    }
    if (formData.password !== formData.passwordConfirmation) {
      setConfirmationError("Passwords did not match!");
    } else {
      setConfirmationError(null);
      return;
    }
    dispatch(loginPendingState());
    try {
      const res = await fetch("/api/auth/register", {
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
      navigate("/login");
    } catch (error) {
      dispatch(loginRejectedState(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-lato">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] mx-auto p-5 flex flex-col gap-3"
      >
        <h1 className="text-2xl">Sign Up</h1>
        <div className="flex flex-col gap-1">
          <label>First Name</label>
          <input
            type="text"
            placeholder="FirstName"
            id="firstName"
            onChange={handleChange}
            className="focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded"
          />
          {firstNameError && !formData.firstName && (
            <span className="text-red-600 text-sm">{firstNameError}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="LastName"
            id="lastName"
            onChange={handleChange}
            className="focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded"
          />
          {lastNameError && !formData.lastName && (
            <span className="text-red-600 text-sm">{emailError}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded"
          />
          {emailError && !formData.email && (
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
          {passwordError && !formData.password && (
            <span className="text-red-600 text-sm">{passwordError}</span>
          )}
          {confirmationError && (
            <span className="text-red-600 text-sm">{confirmationError}</span>
          )}
        </div>
        {formData.password && (
          <div className="flex flex-col gap-1">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              id="passwordConfirmation"
              onChange={handleChange}
              className={`focus:outline-none w-full border border-gray-400 py-1 px-2 focus:bg-blue-50 rounded ${
                confirmationError ? "border-2 border-red-600" : ""
              }`}
            />
          </div>
        )}
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
