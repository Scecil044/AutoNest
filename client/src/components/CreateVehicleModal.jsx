import { Alert } from "flowbite-react";
import { useState } from "react";
import { colors } from "../data";
import { fuelType } from "../data";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";

export default function CreateVehicleModal({
  setOpenCreateModal,
  openCreateModal,
}) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    images: [],
    mileage: "",
    registrationNumber: "",
    year: "",
    cubicCapacity: "",
    color: "",
    description: {
      text: "",
      paint: false,
      sunRoof: false,
      fuelType: "",
    },
  });
  const [files, setFiles] = useState([]);
  // State for selected brand and models
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [uploadProgress, setUploadProgress] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Possible errors
  const [brandError, setBrandError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [fuelTypeError, setFuelTypeError] = useState(false);
  const [descriptionTextError, setDescriptionTextError] = useState(false);
  const [capacityError, setCapacityError] = useState(false);
  const [registrationNumberError, setRegistrationNumberError] = useState(false);
  const [mileageError, setMileageError] = useState(false);
  // Map of brands and their corresponding models
  const brandModelsMap = {
    Toyota: [
      "Harrier",
      "Premio",
      "Corolla",
      "Camry",
      "Fielder",
      "Allion",
      "Hillux",
      "Axio",
      "Fortuner",
      "Surf",
      "Prado Tx",
    ],
    BMW: ["X1", "X3", "X4", "X6", "3 Series", "5 Series", "7 Series"],
    Mercedes: ["E 250", "C 200"],
    Audi: ["Q5", "Q5S", "Q3", "A3", "Q7"],
    Ford: ["Ranger", "Escape", "Fussion"],
    Volkswagen: ["Tuguan", "Tuareg", "Atlas", "Passat"],
    Mazda: ["Axela", "Atenza", "CX5", "CX3"],
    Subaru: ["Forester", "Legacy", "Levrog", "WRX"],
    // Add more brands and models as needed
  };
  // Handle change in brand selection
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    // Reset selected model when brand changes
    setSelectedModel("");
    setFormData({ ...formData, brand: brand });
  };

  // Handle change in model selection
  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setFormData({ ...formData, model: model });
  };

  const handleImages = (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setUploadError(false);
    setUploadProgress(true);
    if (files.length > 0 && files.length + formData.images.length < 10) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadImages(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setUploadError(false);
          setUploadLoading(false);
          setUploadProgress(false);
        })
        .catch((error) => {
          setUploadLoading(false);
          setUploadProgress(false);
          setUploadError(
            "image size selected must not exceed 4mb of storage size!"
          );
        });
    } else {
      setUploadError("You can not upload more than 10 images");
      setUploadProgress(false);
      setUploadLoading(false);
    }
  };
  //   console.log(formData);
  const uploadImages = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleChange = (e) => {
    if (e.target.name === "registrationNumber") {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    if (e.target.name === "year") {
      setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
    }
    if (e.target.name === "cubicCapacity") {
      setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
    }
    if (e.target.name === "mileage") {
      setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
    }
    if (e.target.name === "color") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    if (e.target.name === "paint") {
      setFormData({
        ...formData,
        description: { ...formData.description, paint: e.target.checked },
      });
    }
    if (e.target.name === "fuelType") {
      setFormData({
        ...formData,
        description: { ...formData.description, fuelType: e.target.value },
      });
    }
    if (e.target.name === "sunRoof") {
      setFormData({
        ...formData,
        description: { ...formData.description, sunRoof: e.target.checked },
      });
    }
  };
  const handleEditor = (e, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      description: { ...formData.description, text: data },
    });
  };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    if (!formData.brand || formData.brand === "") {
      setBrandError("The brand field is required");
    } else {
      setBrandError(false);
    }
    if (!formData.model || formData.model === "") {
      setModelError("The model field is required");
    } else {
      setModelError(false);
    }
    if (!formData.year || formData.year === "") {
      setYearError("The year field is required");
    } else {
      setYearError(false);
    }
    if (!formData.cubicCapacity || formData.cubicCapacity === "") {
      setCapacityError("The Engine Capacity field is required");
    } else {
      setCapacityError(false);
    }
    if (!formData.color || formData.color === "") {
      setColorError("The color field is required");
    } else {
      setColorError(false);
    }
    if (
      !formData.description.fuelType ||
      formData.description.fuelType === ""
    ) {
      setFuelTypeError("The fuel type field is required");
    } else {
      setFuelTypeError(false);
    }
    if (!formData.registrationNumber || formData.registrationNumber === "") {
      setRegistrationNumberError("The registration number field is required");
    } else {
      setRegistrationNumberError(false);
    }
    if (!formData.description.text || formData.description.text === "") {
      setDescriptionTextError("Add some description text field is required");
    } else {
      setDescriptionTextError(false);
    }
    if (!formData.mileage || formData.mileage === "") {
      setMileageError("The mileage field is required");
    } else {
      setMileageError(false);
    }
    try {
      setLoading(true);
      setSaveError(false);
      const res = await fetch("/api/vehicles/create/vehicle", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setSaveError(data.message);
        toast(saveError, {
          type: "error",
          theme: "colored",
        });
        return;
      }
      if (res.ok) {
        setLoading(false);
        setSaveError(false);
        setOpenCreateModal(false);
        toast("Vehicle created successfully", {
          type: "success",
          theme: "dark",
        });
      }
    } catch (error) {
      setLoading(false);
      toast(error.message, {
        type: "error",
        theme: "colored",
      });
    }
  };

  return (
    <div className="h-full fixed inset-0 w-full bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleCreateVehicle}
        className="bg-white p-5 w-[90%] sm:w-[80%] md:w-[70%] shadow-md border-2 border-gray-300 rounded font-lato overflow-y-auto"
      >
        {/* header */}
        <h1 className="font-semibold text-lg text-darkGreen">Create Vehicle</h1>
        <div className="my-1">
          <Alert color="warning" withBorderAccent>
            <span>
              <span className="font-medium">Module info!</span> Each vehicle is
              affiliated to a maximum of one company! All veicles created here
              will be listed on the home page
            </span>
          </Alert>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Brand</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="focus:outline-none focus:ring-0 py-1 p-2"
            >
              <option value="">Select</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Ford">Ford</option>
              <option value="Mazda">Mazda</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Subaru">Subaru</option>
            </select>
            {brandError && <small className="text-red-700">{brandError}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Model</label>
            <select
              id="model"
              value={selectedModel}
              onChange={handleModelChange}
              disabled={!selectedBrand}
              className={`focus:outline-none focus:ring-0 py-1 p-2 disabled:cursor-not-allowed disabled:bg-gray-100`}
            >
              <option value="">Select</option>
              {selectedBrand &&
                brandModelsMap[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
            {modelError && <small className="text-red-700">{modelError}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Year</label>
            <select
              id="year"
              name="year"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
            </select>
            {yearError && <small className="text-red-700">{yearError}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Mileage(kilometers</label>
            <select
              id="mileage"
              name="mileage"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value={0}>0</option>
              <option value={10000}>10000</option>
              <option value={20000}>20000</option>
              <option value={30000}>30000</option>
              <option value={40000}>40000</option>
              <option value={50000}>50000</option>
              <option value={60000}>60000</option>
              <option value={70000}>70000</option>
              <option value={80000}>80000</option>
              <option value={100000}>100000</option>
            </select>
            {mileageError && (
              <small className="text-red-700">{mileageError}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Capacity (Cubic capacity)
            </label>
            <select
              id="cubicCapacity"
              name="cubicCapacity"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value={1000}>1000</option>
              <option value={1200}>1200</option>
              <option value={1350}>1350</option>
              <option value={1500}>1500</option>
              <option value={1800}>1800</option>
              <option value={2000}>2000</option>
              <option value={2200}>2200</option>
              <option value={2500}>2500</option>
              <option value={3000}>3000</option>
              <option value={4500}>4500</option>
              <option value={5000}>5000</option>
              <option value={5500}>5500</option>
            </select>
            {capacityError && (
              <small className="text-red-700">{capacityError}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Reg No</label>
            <input
              type="text"
              placeholder="E.g KCN 333J"
              id="registrationNumber"
              name="registrationNumber"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            />
            {registrationNumberError && (
              <small className="text-red-700">{registrationNumberError}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Color</label>
            <select
              id="color"
              name="color"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {colors.map((color, index) => {
                return (
                  <option key={index} value={color}>
                    {color}
                  </option>
                );
              })}
            </select>
            {colorError && <small className="text-red-700">{colorError}</small>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              className="focus:outline-none focus:ring-0 py-1 p-2"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {fuelType.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            {fuelTypeError && (
              <small className="text-red-700">{fuelTypeError}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Paint</label>
            <div className="flex gap-5 mt-1">
              <div className="flex items-center gap-3">
                <span>Original Paint</span>
                <input
                  type="checkbox"
                  id="paint"
                  name="paint"
                  className="h-5 w-5"
                  checked={
                    formData.description.paint === true ||
                    formData.paint === "true"
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">SunRoof</label>
            <div className="flex gap-5 mt-1">
              <div className="flex items-center gap-3">
                <span>Sun Roof</span>
                <input
                  type="checkbox"
                  id="sunRoof"
                  name="sunRoof"
                  className="h-5 w-5"
                  checked={
                    formData.description.sunRoof === true ||
                    formData.paint === "true"
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* editor */}
        <div className="editor my-3">
          <CKEditor
            editor={ClassicEditor}
            id="text"
            data={formData?.description.text || "Enter description text"}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              handleEditor(event, editor);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          {descriptionTextError && (
            <small className="text-red-700">{descriptionTextError}</small>
          )}
        </div>
        {/* images */}
        <div className="upload mb-3">
          {uploadProgress && (
            <div className="w-[52%]">
              <p className={`text-center text-red-500`}>Uploading...</p>
            </div>
          )}
          {uploadError &&
            toast(uploadError, { type: "error", theme: "colored" })}
          <div className="flex gap-5">
            <div className="flex  items-start">
              <input
                type="file"
                id="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                onClick={handleImages}
                type="button"
                disabled={uploadProgress}
                className={`flex items-center gap-1 bg-[#212121] text-white  py-2 px-3 hover:px-4 border-2 shadow-md hover:bg-popsicle transition-all duration-300 rounded hover:border-none hover:shadow-sm hover:scale-105 disabled:cursor-not-allowed`}
              >
                {uploadProgress ? "Please wait.." : "Upload"}
              </button>
            </div>
            <div className="">
              {!uploadError && (
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt="pic"
                      className="h-20 w-20 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="flex gap-1 float-end">
          <button
            onClick={() => setOpenCreateModal(false)}
            className={`py-1 px-4 bg-red-700 text-white flex items-center gap-1 disabled:cursor-not-allowed`}
          >
            Cancel
          </button>
          <button
            className={`py-1 px-4 bg-darkGreen text-white flex items-center gap-1 disabled:cursor-not-allowed`}
          >
            {loading && (
              <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
