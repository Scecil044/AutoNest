import { useState } from "react";

export default function BusinessProfileCard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex bg-gradient-to-tr from-pink-600 to-indigo-800 h-[200px] relative">
        <img
          src="https://di-uploads-pod6.s3.amazonaws.com/chernerbrothersauto/uploads/2016/12/cars-on-a-lot-near-trees.jpg"
          alt="..."
          className="w-full object-cover h-full"
        />
        <div className="absolute bg-black/50 inset-0"></div>
        <div className="absolute -bottom-[35px] left-5 rounded-full h-24 w-24">
          <img
            src={"https://static.thenounproject.com/png/363640-200.png"}
            alt="..."
            className="rounded-full h-24 w-24"
          />
        </div>
      </div>

      <div className="bg-white p-5">
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-[200px]">
            <h1 className="font-semibold text-2xl">company name</h1>
          </div>
          <div className="flex-1 flex-col">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {inventory.map((vehicle, index) => (
                <div
                  key={index}
                  className="shadow-lg hover:scale-105 transition-all duration-500"
                >
                  {!loading &&
                    vehicle &&
                    vehicle.images &&
                    vehicle.images.length > 0 && (
                      <div className="overflow-hidden">
                        <img
                          src={vehicle?.images[0]}
                          alt="vehicle"
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    )}
                  <div className="px-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1">
                        <h1>{vehicle?.brand}</h1>
                        <h1>{vehicle?.model}</h1>
                      </span>
                      <span>Year: {vehicle?.year}</span>
                    </div>
                  </div>
                  <div className="px-2 text-sm">
                    <span className="flex gap-1">
                      <h3>Mileage:</h3>
                      {vehicle?.mileage}k/m
                    </span>
                  </div>
                  <div className="px-2 text-sm">
                    <span className="flex gap-1">
                      <h3>Price:</h3>
                      2.5M
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
