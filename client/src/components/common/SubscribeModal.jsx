import { Alert } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SubscribeModal({
  openModal,
  setOpenModal,
  subscription,
}) {
  const navigate = useNavigate();
  const currentDate = new Date();

  // Add one year
  const oneYearFromNow = new Date(currentDate);
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate("/my/dash");
  };

  return (
    <div className="min-h-screen h-full inset-0 fixed bg-black/70 flex items-center justify-center z-40 ">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white relative w-[89%] md:w-[51%] rounded shadow-lg"
      >
        <IoClose
          onClick={() => {
            setOpenModal(false);
          }}
          className="h-8 w-8 -top-5 hidden md:inline text-white -right-10 absolute cursor-pointer"
        />
        <div className="my-1">
          <Alert color="warning" withBorderAccent>
            <span>
              <span className="font-medium">Just a step away!</span> Fill out
              your master card or visa card details to checkout.
            </span>
            
          </Alert>
        </div>
        <div className="flex gap-5">
          {/* left */}
          <div className="flex-1">
            <h1 className="text-lg text-gray-500 font-semibold">
              Card Details
            </h1>
            <div className=" flex flex-col gap-5 mt-3">
              <input
                type="text"
                placeholder="Card Name"
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400"
              />
              <div className="grid grid-cols-3 gap-1">
                <input
                  type="text"
                  placeholder="DD/"
                  className="py-1 border border-gray-300 px-2 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  placeholder="MM/"
                  className="py-1 border border-gray-300 px-2 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  placeholder="YY/"
                  className="py-1 border border-gray-300 px-2 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-lg text-gray-500 font-semibold">
              Order Summary
            </h1>
            <div className="flex items-center justify-between my-1">
              <h1 className="font-semibold">{subscription} Subscription:</h1>
              <p className=" text-xl font-bold">$120</p>
            </div>
            <div className="flex items-center justify-between my-1">
              <h1 className="font-semibold">Tax:</h1>
              <p className=" text-xl font-bold">$0</p>
            </div>
            <div className="flex mb-2 gap-1">
              <h1 className="font-semibold">Your next subscription:</h1>

              <p className="text-nowrap">
                {" "}
                {oneYearFromNow.toLocaleString("en-us")}
              </p>
            </div>
            <div className="flex my-2">
              <input
                type="text"
                className="py-1 px-2 border border-gray-400 flex-1 focus:outline-none focus:ring-0 focus:bg-blue-50"
                placeholder="Coupon Code"
              />
              <button
                type="button"
                className="py-1 px-2 bg-darkBlue text-white shadow-lg hover:shadow-sm"
              >
                Apply
              </button>
            </div>
            <div className="flex items-center justify-between my-1">
              <h1>Grand total:</h1>
              <p className=" text-xl font-bold">$120</p>
            </div>
            <button className="py-1 text-white bg-darkBlue mt-2 w-full flex items-center justify-center">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
