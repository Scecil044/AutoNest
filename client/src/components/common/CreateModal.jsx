import { Alert } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateModal({ setOpenCreateModal, openCreateModal }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [confirmationError, setConfirmationError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // create user
  const createUser = async (e) => {
    e.preventDefault();
    if (!formData.password || formData.password === "") {
      setPasswordError("The password field is required");
    } else {
      setPasswordError(null);
    }
    if (!formData.email || formData.email === "") {
      setEmailError("The email field is required");
    } else {
      setEmailError(null);
    }
    if (!formData.lastName || formData.lastName === "") {
      setLastNameError("The last name field is required");
    } else {
      setLastNameError(null);
    }
    if (!formData.firstName || formData.firstName === "") {
      setFirstNameError("The first name field is required");
    } else {
      setFirstNameError(null);
    }
    if (
      formData.password !== formData.passwordConfirmation ||
      formData.passwordConfirmation === ""
    ) {
      setConfirmationError("Passwords did not match");
      return;
    } else {
      setConfirmationError(null);
    }
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsError(data.message);
        setIsLoading(false);
        toast(data.message, {
          type: "error",
          theme: "dark",
        });
      }
      if (res.ok) {
        setIsLoading(false);
        setIsError(false);
        setOpenCreateModal(false);
        toast("User Created successfully", { type: "success", theme: "dark" });
      }
    } catch (error) {
      setIsError(error.message);
    }
  };
  return (
    <div className="h-full w-full inset-0 fixed bg-black/50 flex items-center justify-center">
      <form
        onSubmit={createUser}
        className="bg-white w-[70%] md:w-[50%] font-lato p-5"
      >
        <div>
          <h1 className="font-semibold text-lg">Create User</h1>
          <div className="my-1 border-l-4 border-pink-600">
            <Alert color="warning" withBorderAccent>
              <span>
                <span className="font-medium">Modal info!</span> Users added
                into the system will be able to create companies, and make
                listings. Note that the scope of their rights is likely to
                change as the app grows
              </span>
            </Alert>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">First Name</span>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-500"
              />
              {firstNameError && !formData.firstName && (
                <span className="text-red-600 text-sm">{firstNameError}</span>
              )}
            </div>
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">Last Name</span>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-500"
              />
              {lastNameError && !formData.lastName && (
                <span className="text-red-600 text-sm">{lastNameError}</span>
              )}
            </div>
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">Email</span>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-500"
              />
              {emailError && !formData.email && (
                <span className="text-red-600 text-sm">{emailError}</span>
              )}
            </div>
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">Password</span>
              <input
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-500"
              />
              {passwordError && !formData.password && (
                <span className="text-red-600 text-sm">{passwordError}</span>
              )}
              {confirmationError && (
                <span className="text-red-600 text-sm">
                  {confirmationError}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-1">
              <span className="font-semibold text-sm">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm password"
                id="passwordConfirmation"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-500"
              />
            </div>
          </div>
          <div className="flex gap-1 float-end my-2">
            <button
              onClick={() => {
                setOpenCreateModal(false);
              }}
              className="py-1 px-4 bg-red-600 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-1 px-4 bg-darkGreen text-white flex items-center gap-1"
            >
              {isLoading && (
                <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
              )}
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
