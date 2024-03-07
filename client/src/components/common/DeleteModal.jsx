import { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signOutUser } from "../../firebase/userSlice";

export default function DeleteModal({
  role,
  openModal,
  setOpenModal,
  userId,
  vehicleId,
  companyId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // function to delete vehicle
  const deleteVehicle = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/vehicles/delete/vehicle/${vehicleId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast(data.message, { type: "error", theme: "dark" });
        setIsLoading(false);
        setIsError(false);
        return;
      }
      setOpenModal(false);
      setIsLoading(false);
      setIsError(false);
      toast("vehicle deleted successfully", { type: "success", theme: "dark" });
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  // function to delete user
  const deleteUser = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/users/delete/user/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setIsError(data.message);
        setIsLoading(false);
        toast("Unable to complete delete action!", {
          type: "error",
          theme: "colored",
        });
      }
      if (res.ok) {
        setIsLoading(false);
        setIsError(false);
        setOpenModal(false);
        navigate("/users");
        toast("User deleted successfully", { type: "success", theme: "dark" });
      }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  // function to delete company
  const deleteCompany = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/companies/delete/company/${companyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setIsError(false);
        toast(data.message, { type: "error", theme: "dark" });
        return;
      }
      setOpenModal(false);
      setIsLoading(false);
      setIsError(false);
      toast(data, { type: "success", theme: "dark" });
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  // function to delete account
  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(`/api/users/delete/user/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setIsError(false);
        toast(data.message, { type: "error", theme: "dark" });
        return;
      }
      setOpenModal(false);
      setIsLoading(false);
      dispatch(signOutUser());
      setIsError(false);
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full flex items-center justify-center inset-0 fixed bg-black/50 z-50">
      <div
        className={`shadow-lg pt-5 pb-2 px-5 w-[80%] md:w-[30%] border border-gray-300 bg-white ${
          role === "deleteAccount" ? "md:w-[35%]" : ""
        }`}
      >
        <div className="flex gap-3 mb-2">
          <IoIosWarning
            className={`h-16 w-16  ${
              role === "deleteAccount"
                ? "animate-pulse text-red-700"
                : "text-red-700"
            }`}
          />
          {role === "deleteUser" ? (
            <div className="border-l-4 border-red-400 px-1">
              <p className="font-semibold">Proceed to delete this user?</p>
              <p className="text-sm">
                All configurations and posts related to the user will be deleted
                permanently!
              </p>
            </div>
          ) : role === "deleteVehicle" ? (
            <div className="border-l-4 border-red-400 px-1">
              <p className="font-semibold">
                Proceed to delete selected vehicle?
              </p>
              <p className="text-sm">
                All related records will be cleared from the database!
              </p>
            </div>
          ) : role === "deleteCompany" ? (
            <div className="border-l-4 border-red-400 px-1">
              <p className="font-semibold">
                Proceed to delete selected Company?
              </p>
              <p className="text-sm">
                All related records, and relationships will be cleared from the
                database!
              </p>
            </div>
          ) : role === "deleteAccount" ? (
            <div className="border-l-4 border-red-400 px-1">
              <p className="font-semibold">Proceed to delete Your account?</p>
              <p className="text-sm">
                This trigger delete all your corresponding details in the
                system. Note that this action is{" "}
                <span className="text-red-600 font-semibold text-lg">
                  Not Reversible!
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="py-1 px-4 bg-popsicle text-white"
          >
            Cancel
          </button>
          {role === "deleteUser" && (
            <button
              type="button"
              disabled={isLoading}
              className={`py-1 px-4 bg-red-700 text-white flex items-center gap-1 disabled:cursor-not-allowed`}
              onClick={deleteUser}
            >
              {isLoading && (
                <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
              )}
              Delete user
            </button>
          )}
          {role === "deleteVehicle" && (
            <button
              disabled={isLoading}
              className={`py-1 px-4 bg-red-700 text-white flex items-center gap-1 disabled:cursor-not-allowed`}
              onClick={deleteVehicle}
            >
              {isLoading && (
                <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
              )}
              Delete
            </button>
          )}
          {role === "deleteCompany" && (
            <button
              disabled={isLoading}
              className={`py-1 px-4 bg-red-700 text-white flex items-center gap-1 disabled:cursor-not-allowed`}
              onClick={deleteCompany}
            >
              {isLoading && (
                <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
              )}
              Delete
            </button>
          )}
          {role === "deleteAccount" && (
            <button
              disabled={isLoading}
              className={`py-1 px-4 bg-red-700 text-white flex items-center gap-1 disabled:cursor-not-allowed`}
              onClick={deleteAccount}
            >
              {isLoading && (
                <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
              )}
              Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
