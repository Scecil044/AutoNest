import { useState } from "react";

export default function CreateVehicleModal({
  setOpenCreateModal,
  openCreateModal,
}) {
  // State for selected brand and models
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

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
    // Add more brands and models as needed
  };
  // Handle change in brand selection
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    // Reset selected model when brand changes
    setSelectedModel("");
  };

  // Handle change in model selection
  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
  };
  return (
    <div className="h-full fixed inset-0 w-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 w-[80%] sm:w-[70%] md:w-[60%] shadow-md border-2 border-gray-300 rounded font-lato">
        {/* header */}
        <h1 className="font-semibold text-lg text-darkGreen">Create Vehicle</h1>
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
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Model</label>
            <select
              id="model"
              value={selectedModel}
              onChange={handleModelChange}
              disabled={!selectedBrand}
              className={`focus:outline-none focus:ring-0 py-1 p-2 disabled:cursor-not-allowed`}
            >
              <option value="">Select</option>
              {selectedBrand &&
                brandModelsMap[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Year</label>
            <select
              id="year"
              className="focus:outline-none focus:ring-0 py-1 p-2"
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
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Capacity (Cubic capacity)
            </label>
            <select
              id="year"
              className="focus:outline-none focus:ring-0 py-1 p-2"
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
            <div className="rounded-full animate-spin h-4 w-4 border-r-2 border-b-2 border-white"></div>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
