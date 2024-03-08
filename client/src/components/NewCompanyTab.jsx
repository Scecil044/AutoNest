import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import ImageLoader from "./common/ImageLoader";

export default function NewCompanyTab() {
  const [formData, setFormData] = useState({});
  const [companyNameError, setCompanynameError] = useState(false);
  const [companyAddressError, setCompanyAddressError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [companyTypeError, setCompanyTypeError] = useState(false);
  const [ownerError, setOwenerError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [users, setUsers] = useState([]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //creating company
  const [creationLoader, setCreationLoader] = useState(false);
  const [creationError, setCreationError] = useState(false);
  // banner image upload
  const [bannerImageError, setBannerImageError] = useState(false);
  const [imageUploadLoader, setImageUploadLoader] = useState(false);
  const [companyLogoError, setCompanyLogoError] = useState(false);
  // function to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/users/get/users");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setUsers(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    // handle brandLogo
    if (bannerImage) {
      const processBannerImage = async () => {
        setBannerImageError(false);
        setImageUploadLoader(true);
        const fileName = new Date().getTime() + bannerImage.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, bannerImage);
        uploadTask.on(
          "status_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setBannerImageError(false);
            setImageUploadLoader(true);
          },
          (error) => {
            setBannerImageError(error);
            setImageUploadLoader(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({ ...formData, bannerImage: downloadURL });
              setBannerImageError(false);
              setImageUploadLoader(false);
            });
          }
        );
      };
      processBannerImage();
    }
    // handle Company logo
    if (companyLogo) {
      const processCompanyLogo = async () => {
        setCompanyLogoError(false);
        setImageUploadLoader(true);
        const fileName = new Date().getTime() + companyLogo.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, bannerImage);
        uploadTask.on(
          "status_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setCompanyLogoError(false);
            setImageUploadLoader(true);
          },
          (error) => {
            setCompanyLogoError(error);
            setImageUploadLoader(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({ ...formData, companyLogo: downloadURL });
              setCompanyLogoError(false);
              setImageUploadLoader(false);
            });
          }
        );
      };
      processCompanyLogo();
    }

    fetchUsers();
  }, [bannerImage, companyLogo]);
  console.log(formData);

  return (
    <>
      {error && (
        <Alert color="failure" withBorderAccent>
          <span>
            <span className="font-bold text-red-600 font-serif">
              Error info!
            </span>
            An error was encountered while loading users. Please refresh this
            page or check your internet connection
          </span>
        </Alert>
      )}
      {!loading && !error && (
        <Alert color="warning" withBorderAccent>
          <span>
            <span className="font-medium">Module info!</span>Set up a new
            business by filling out the fields in this section.
          </span>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            id="companyName"
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          />
          {companyNameError && (
            <span className="text-sm text-red-600">{companyNameError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Company Name</label>
          <input
            type="text"
            placeholder="Address"
            id="companyAddress"
            onChange={(e) =>
              setFormData({ ...formData, companyAddress: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          />
          {companyAddressError && (
            <span className="text-sm text-red-600">{companyAddressError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Business Model</label>
          <select
            id="companyType"
            onChange={(e) =>
              setFormData({ ...formData, businessType: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          >
            <option value="">Select</option>
            <option value="Car Yard">Car Yard</option>
            <option value="Show Room">Show Room</option>
          </select>
          {companyTypeError && (
            <span className="text-sm text-red-600">{companyTypeError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Country</label>
          <select
            id="country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          >
            <option value="">Select</option>
            <option value="Kenya">Kenya</option>
          </select>
          {countryError && (
            <span className="text-sm text-red-600">{countryError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">City</label>
          <select
            id="city"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          >
            <option value="">Select</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Nakuru">Nakuru</option>
          </select>
          {cityError && (
            <span className="text-sm text-red-600">{cityError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Managed By</label>
          <select
            id="userRef"
            onChange={(e) =>
              setFormData({ ...formData, userRef: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          >
            <option value="">Select</option>
            {users &&
              users.length > 0 &&
              users.map((item, index) => (
                <option key={index} value={item?.userRef?._id}>
                  {item?.firstName + " " + item?.lastName}
                </option>
              ))}
          </select>
          {ownerError && (
            <span className="text-sm text-red-600">{ownerError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Phone Number</label>
          <input
            type="text"
            placeholder="e.g +254700909090"
            id="companyPhoneNumber"
            onChange={(e) =>
              setFormData({ ...formData, companyPhoneNumber: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          />
          {phoneError && (
            <span className="text-sm text-red-600">{phoneError}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">CompanyEmail</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            id="companyEmail"
            onChange={(e) =>
              setFormData({ ...formData, companyEmail: e.target.value })
            }
            className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-pink-50"
          />
          {emailError && (
            <span className="text-sm text-red-600">{emailError}</span>
          )}
        </div>
      </form>
      {bannerImageError ||
        (companyLogoError && (
          <div className="my-1">
            <Alert color="failure" withBorderAccent>
              <span>
                <span className="font-bold font-serif">Upload error!</span> The
                selected image must not be of size greater than 2 megabytes
              </span>
            </Alert>
          </div>
        ))}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Company Logo</label>
          <div className="flex items-center justify-between">
            <input
              type="file"
              id="companyLogo"
              accept="image/*"
              onChange={(e) => setCompanyLogo(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Banner Image</label>
          <div className="flex items-center justify-between">
            <input
              type="file"
              id="bannerImage"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
          </div>
        </div>
        {/* image previews */}
        <div className="logo-preview mt-1">
          {formData.companyLogo && (
            <img
              src="https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80"
              alt="..."
              className="object-cover h-28 w-28 border-2 border-gray-400"
            />
          )}
        </div>
        <div className="banner-preview mt-1">
          {formData.brandImage && (
            <img
              src="https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80"
              alt="..."
              className="object-cover h-28 w-28 border-2 border-gray-400"
            />
          )}
        </div>
      </div>
      <div className="my-3">
        <button
          disabled={creationLoader}
          className="py-1 px-2 w-full gap-2 md:w-[50%] flex items-center border-pink-600 border-2 disabled:cursor-not-allowed transition-all duration-300 justify-center shadow-lg bg-pink-600 text-white hover:shadow-sm hover:opacity-85"
        >
          {creationLoader && (
            <div className="rounded-full border-r-2 border-b-2 border-white h-5 w-5 animate-spin"></div>
          )}
          Submit
        </button>
        {imageUploadLoader && <ImageLoader />}
      </div>
    </>
  );
}
