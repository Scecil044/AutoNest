import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLoader from "../../components/common/DashboardLoader";
import { fuelType } from "../../data";
import { colors } from "../../data";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdAutoDelete } from "react-icons/md";

export default function EditVehicle() {
  const { vehicleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
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
  const [ownershipError, setOwnershipError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  // form data
  const [formData, setFormData] = useState({
    images: [],
  });

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

  const handleModelChange = (e) => {
    const model = e.target.value;

    setSelectedModel(model);
    setFormData({ ...formData, model: model });
  };
  const handleBrandChange = (e) => {
    const brand = e.target.value;

    setSelectedModel("");

    setSelectedBrand(brand);
    setFormData({ ...formData, brand: brand });
  };

  const removeImage = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, index) => index !== indexToRemove),
    }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setIsError(false);
        const res = await fetch(
          `/api/vehicles/get/vehicles?vehicleId=${vehicleId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setIsError(data.message);
          setLoading(false);
        }
        if (res.ok) {
          setLoading(false);
          setIsError(false);
          setVehicle(data.vehicles[0]);

          // Clear existing images before adding new ones
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: data.vehicles[0].images,
          }));
          // console.log(data.vehicles);
        }
      } catch (error) {
        setLoading(false);
        setIsError(error.message);
      }
    };
    fetchVehicle();
  }, []);

  return (
    <div className="min-h-screen font-lato">
      <form onSubmit={submitForm} className="flex flex-col md:flex-row gap-5">
        <div className="relative bg-white p-5 flex-1 shadow-lg">
          <img
            src={vehicle?.images[0]}
            alt="..."
            className="h-36 w-40 absolute -top-[40px] -left-[20px]"
          />
          <h1 className="text-xl text-darkGreen font-semibold ml-28">
            Vehicle Configuration
          </h1>
          <div className=" mt-5 ">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Brand Name</label>
                <select
                  name="brand"
                  id="brand"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={handleBrandChange}
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
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Vehicle Model</label>
                <select
                  name="model"
                  id="model"
                  disabled={!selectedBrand}
                  className={`focus:outline-none focus:ring-0 py-1 p-2 disabled:cursor-not-allowed disabled:bg-gray-200`}
                  onChange={handleModelChange}
                >
                  <option value="">Select</option>
                  {selectedBrand &&
                    brandModelsMap[selectedBrand].map((model, index) => (
                      <option key={index} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Year</label>
                <select
                  id="year"
                  name="year"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                >
                  <option value="">{vehicle?.year}</option>
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
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Mileage(kilometers
                </label>
                <select
                  id="mileage"
                  name="mileage"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, mileage: e.target.value })
                  }
                >
                  <option value="">{vehicle?.mileage}</option>
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
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Capacity (Cubic capacity)
                </label>
                <select
                  id="cubicCapacity"
                  name="cubicCapacity"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, cubicCapacity: e.target.value })
                  }
                >
                  <option value="">{vehicle?.cubicCapacity}</option>
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
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Reg No</label>
                <input
                  type="text"
                  placeholder="E.g KCN 333J"
                  defaultValue={vehicle?.registrationNumber}
                  id="registrationNumber"
                  name="registrationNumber"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Color</label>
                <select
                  id="color"
                  name="color"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                >
                  <option value="">{vehicle?.color}</option>
                  {colors.map((color, index) => {
                    return (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Fuel Type</label>
                <select
                  id="fuelType"
                  name="fuelType"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: {
                        ...formData.description,
                        fuelType: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">{vehicle?.description?.fuelType}</option>
                  {fuelType.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={500000}
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Ownership</label>
                <select
                  id="cubicCapacity"
                  name="cubicCapacity"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: {
                        ...formData.description,
                        ownership: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">{vehicle?.ownership || "Select"}</option>
                  <option value="New">New</option>
                  <option value="locallyUsed">locally Used</option>
                  <option value="exJapan">Ex-Japan</option>
                  <option value="exUk">Ex-Uk</option>
                </select>
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
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500"
                      checked={formData?.description?.paint === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            paint: e.target.checked,
                          },
                        })
                      }
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
                      className="h-5 w-5 text-pink-600 focus:ring-pink-500"
                      checked={formData?.description?.sunRoof === true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            sunRoof: e.target.checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={vehicle?.description?.text}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      text: editor.getData(),
                    },
                  });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
            <button className="py-2  mt-3 w-full shadow-lg hover:shadow-none transition-all duration-300 bg-pink-600 text-white rounded hover:opacity-90">
              Update
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1  w-full">
          <div className="bg-white shadow-lg p-5 w-full">
            <h1 className="text-xl text-darkGreen font-semibold">
              Additional Configurations
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col mt-2">
                <label className="text-sm font-semibold">Body Weight</label>
                <input
                  type="number"
                  id="bodyWeight"
                  name="bodyWeight"
                  placeholder="Weight in Tonnes"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, bodyWeight: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col mt-2">
                <label className="text-sm font-semibold">Towing Capacity</label>
                <input
                  type="number"
                  id="towingCapacity"
                  name="towingCapacity"
                  placeholder="Payload"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, towingCapacity: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col mt-2">
                <label className="text-sm font-semibold">
                  Fuel Economy(MPG)
                </label>
                <input
                  type="number"
                  id="fuelEconomy"
                  name="fuelEconomy"
                  placeholder="Fuel Economy"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({ ...formData, fuelEconomy: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">
                  Transmission System
                </label>
                <select
                  name="transmissionSystem"
                  id="transmissionSystem"
                  className="focus:outline-none focus:ring-0 py-1 p-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transmissionSystem: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
                {brandError && (
                  <small className="text-red-700">{brandError}</small>
                )}
              </div>

              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <label className="text-sm font-semibold">Turbo</label>
                  <div className="flex gap-5 mt-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="turboCharged"
                        name="turboCharged"
                        className="h-5 w-5 text-pink-600 focus:ring-pink-500"
                        checked={formData?.description?.turboCharged === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              turboCharged: e.target.checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <label className="text-sm font-semibold">Super Charged</label>
                  <div className="flex gap-5 mt-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="superCharged"
                        name="superCharged"
                        className="h-5 w-5 text-pink-600 focus:ring-pink-500"
                        checked={formData?.description?.superCharged === true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              superCharged: e.target.checked,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white shadow-lg p-5">
            <h1 className="text-xl text-darkGreen font-semibold">
              Vehicle Images
            </h1>
            {/* images */}
            <div className="flex gap-5 w-full">
              {formData?.images.map((item, index) => (
                <div key={index} className="h-20 relative">
                  <button
                    onClick={() => removeImage(index)}
                    type="button"
                    className="py-1 px-1 absolute right-10 h-6 w-6 text-red-500 z-20"
                  >
                    <MdAutoDelete />
                  </button>
                  <img
                    src={item}
                    alt="..."
                    className="object-cover h-20 hover:h-32 hover:w-48 transition-all duration-500 w-32 hover:scale-150"
                  />
                </div>
              ))}
            </div>

            <div className="my-5">
              <input type="file" accept="image/*" />
            </div>
          </div>
        </div>
      </form>

      {loading && <DashboardLoader />}
    </div>
  );
}
