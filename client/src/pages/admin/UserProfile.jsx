import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import DashboardLoader from "../../components/common/DashboardLoader";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../components/common/DeleteModal";
import { Alert } from "flowbite-react";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [uploadError, setUploadError] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();
  const [passwordError, setPasswordError] = useState(null);
  const [confirmationError, setConfirmationError] = useState(null);
  // fetchUsers
  const [userError, setUserError] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.password &&
      formData.password !== formData.passwordConfirmation
    ) {
      setConfirmationError("Passwords did not match!");
      return;
    } else {
      setConfirmationError(null);
    }
    try {
      const res = await fetch(`/api/users/update/user/${params.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setUserLoading(false);
        setUserError(data.message);
        toast(data.message, { type: "error", theme: "colored" });
      }
      if (res.ok) {
        toast("Details Captured!", { type: "success", theme: "colored" });
        setUserLoading(false);
        setUserError(false);
      }
    } catch (error) {
      setUserLoading(false);
      setUserError(error.message);
    }
  };

  useEffect(() => {
    // Get user details from database
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        setUserError(false);
        const res = await fetch(`/api/users/get/users?userId=${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setUserError(data.message);
          setUserLoading(false);

          return;
        }
        if (res.ok) {
          setUserLoading(false);
          if (data.length > 0) {
            setFormData(data[0]);
          }
        }
      } catch (error) {
        setUserError(error.message);
        setUserLoading(false);
      }
    };
    fetchUser();
    //handle image upload to firebase
    if (selectedImage) {
      const imageUpload = async () => {
        setUploadError(null);
        setIsLoading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + selectedImage.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on(
          "status_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPercentage(progress.toFixed(0));
            setUploadError(null);
          },
          (err) => {
            setUploadError(
              "An error was encountered | Ensure the selected image is less than 2mb in length"
            );
            setIsLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({ ...formData, imageURL: downloadURL });
            });
            setUploadError(null);
            setIsLoading(false);
          }
        );
      };
      imageUpload();
    }
  }, [selectedImage, params.id]);

  return (
    <div className="min-h-screen">
      <main className="">
        <div className="flex bg-gradient-to-tr from-pink-600 via-pink-800 to-popsicle text-white p-5 h-40 relative">
          <img
            src={"https://randomuser.me/portraits/men/34.jpg"}
            alt="profile"
            className="rounded-full cursor-pointer h-24 w-24 object-cover absolute -bottom-10 md:h-28 md:w-28 z-10"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            id="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </div>
        <div className="mt-10">
          {userError && (
            <Alert color="warning" withBorderAccent>
              <span>
                <span className="font-medium">System Error!</span> {userError}
              </span>
            </Alert>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col md:flex-row gap-10 mt-1 p-5 font-lato items-start"
        >
          <div className="shadow-lg bg-white hover:scale-105 transition-all duration-500 p-5 flex-1 font-lato">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  defaultValue={formData.lastName}
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="">User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  id="userName"
                  defaultValue={formData.userName}
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
                />
                {confirmationError && (
                  <span className="text-red-600 text-sm">
                    {confirmationError}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="passwordConfirmation"
                  onChange={handleChange}
                  className={`py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50 ${
                    confirmationError && !formData.passwordConfirmation
                      ? "border-red-400 animate-pulse"
                      : ""
                  }`}
                />
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-500 p-5 mt-3">
              <div className="flex flex-col gap-1 ">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label>Profile Image</label>
                    <input type="file" id="profilePicture" accept="image/*" />
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="py-2 px-4 flex gap-1 items-center text-white border-2 border-darkgreen bg-popsicle"
                    >
                      {isLoading && (
                        <div className="motion-safe:animate-spin h-5 w-5 border-white rounded-full border-r-2 border-b-2"></div>
                      )}
                      {isLoading ? "Uploading" : " Upload"}
                    </button>
                  </div>
                </div>
              </div>
              {formData.imageUrl && (
                <div>
                  <span>image Preview</span>
                  <img
                    src="https://randomuser.me/portraits/men/45.jpg"
                    alt="profile"
                    className="object-cover h-16 w-16 rounded-full"
                  />
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 px-4 bg-pink-600 text-white rounded shadow-md hover:shadow-none transition-all duration-150 my-2 hover:bg-pink-800"
            >
              Update
            </button>
          </div>
          <div className="shadow-lg bg-white hover:scale-105 transition-all duration-500 p-5 md:w-[500px] flex flex-col items-start font-lato">
            <h1 className="text-red-600 text-xl font-semibold font-serif">
              Danger Zone
            </h1>
            {/* user rights */}
            <div className="w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 ">
                  <div className="text-nowrap flex-1">
                    <h1 className="text-nowrap">
                      System Rights and user Privileges
                    </h1>
                  </div>
                  <select
                    id="rights"
                    onChange={handleChange}
                    className="border-gray-300 focus:outline-none focus:ring-0 w-full py-1 px-2"
                  >
                    <option value="false">
                      {formData.isAdmin ? "System Admin" : "User"}
                    </option>
                    <option value="true">Administrator</option>
                    <option value="false">User</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Delete section */}
            <div className="grid grid-cols-3 gap-3">
              {!user.isAdmin ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setUserId(formData?._id);
                    setRole("deleteAccount");
                  }}
                  className="py-1 px-4 bg-red-700 text-white shadow-lg hover:shadow-none transition-all duration-300 hover:opacity-90"
                >
                  <span className=" text-sm">Delete Account</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setUserId(params.id);
                    setRole("deleteUser");
                  }}
                  className="py-1 px-4 bg-red-700 text-white shadow-lg hover:shadow-none transition-all duration-300 hover:opacity-90"
                >
                  <span className=" text-sm">Delete User</span>
                </button>
              )}
              {user.isAdmin ? (
                <>
                  <button
                    type="button"
                    className="py-1 px-4 bg-indigo-800 text-white shadow-lg hover:shadow-none transition-all duration-300 hover:opacity-90"
                  >
                    <span className=" text-sm">Suspend Account</span>
                  </button>
                  <button className="py-1 px-4 bg-zinc-700 text-white shadow-lg hover:shadow-none transition-all duration-300 hover:opacity-90">
                    <span className=" text-sm">Restrict Account</span>
                  </button>
                  <button
                    type="button"
                    className="py-1 px-4 bg-emerald-700 text-white shadow-lg hover:shadow-none transition-all duration-300 hover:opacity-90"
                  >
                    <span className=" text-sm">Activate Account</span>
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </main>
      {loading && <DashboardLoader />}
      {openModal && (
        <DeleteModal
          role={role}
          openModal={openModal}
          setOpenModal={setOpenModal}
          userId={userId}
        />
      )}
    </div>
  );
}
