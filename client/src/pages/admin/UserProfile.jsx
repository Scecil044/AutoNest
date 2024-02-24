import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import DashboardLoader from "../../components/common/DashboardLoader";

export default function UserProfile() {
  const fileRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
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
  }, [selectedImage]);
  return (
    <div className="min-h-screen">
      <div className="flex bg-gradient-to-tr from-purple-700 to-pink-700 text-white p-5 h-40 relative">
        <img
          src="https://randomuser.me/portraits/men/34.jpg"
          alt="profile"
          className="rounded-full cursor-pointer h-24 w-24 object-cover absolute -bottom-10 md:h-28 md:w-28"
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
      <form
        onSubmit={handleSubmit}
        className="w-full flex gap-10 mt-12 p-5 font-lato"
      >
        <div className="shadow-md p-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
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
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="">User Name</label>
              <input
                type="text"
                placeholder="User Name"
                id="user"
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
            </div>

            <div className="flex flex-col gap-1">
              <label className="">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="passwordConfirmation"
                onChange={handleChange}
                className="py-1 px-2 focus:outline-none border border-gray-400 focus:bg-blue-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div>
                  <label>Profile Image</label>
                  <input type="file" id="profilePicture" accept="image/*" />
                </div>
                <div>
                  <label className="mb-1"></label>
                  <button
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
          </div>
        </div>
        <div className="shadow-md p-5 md:w-[500px]">two</div>
      </form>
      {loading && <DashboardLoader />}
    </div>
  );
}
