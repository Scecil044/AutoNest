import SubscribeModal from "../components/common/SubscribeModal";
import { useState } from "react";
import { Alert, Carousel } from "flowbite-react";
import SubscriptionContent from "../components/SubscriptionContent";

export default function SubscriptionModal() {
  const [openModal, setOpenModal] = useState(false);
  const [subscription, setSubscription] = useState("");
  const [goldScale, setGoldScale] = useState(false);
  return (
    <div className="min-h-screen bg-pampas font-lato md:p-10">
      <div className="md:relative hidden md:flex flex-col">
        <div className="md:flex flex-col md:flex-row p-5 md:gap-8 md:absolute w-full md:top-24 items-start">
          {/* left component */}
          <div className="flex-1">
            <div>
              <div className="flex gap-5 items-start">
                <div className="bg-white flex-1 shadow-lg blur-sm hover:blur-0 hover:z-20 hover:scale-125 transition-all duration-700 hover:ml-16">
                  <div className="h-16 bg-darkBlue flex items-center justify-center">
                    <h3 className="text-white font-semibold">BRONZE</h3>
                  </div>
                  <h1 className="text-[14px] text-center mb-7 mt-3">
                    Whats included in the deal
                  </h1>

                  <div className="px-5">
                    <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Unlimited Posts</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Prompt Notifications</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Dashboard Analytics</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Google Ads promotions</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>24/7 Support</h3>
                      </span>
                    </div>
                  </div>

                  <div className=" px-2">
                    <h1 className="">Subscription information</h1>
                    <p className="mt-2 text-[12px]">
                      Your subscription will require renewal after every one
                      year
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setSubscription("Monthly");
                    }}
                    className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
                  >
                    Select
                  </button>
                </div>
                <div className="bg-white z-10 flex-1 shadow-lg scale-125 transition-all duration-700 text-xs">
                  <div className="h-16 bg-darkBlue flex items-center justify-center">
                    <h3 className="text-white font-semibold">GOLD</h3>
                  </div>
                  <h1 className="text-[14px] text-center mb-7 mt-3">
                    Whats included in the deal
                  </h1>

                  <div className="px-5">
                    <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Unlimited Posts</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Prompt Notifications</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Dashboard Analytics</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Google Ads promotions</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>24/7 Support</h3>
                      </span>
                    </div>
                  </div>

                  <div className=" px-2">
                    <h1 className="">Subscription information</h1>
                    <p className="mt-2 text-[12px]">
                      Your subscription will require renewal after every one
                      year
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setSubscription("Annual");
                    }}
                    className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
                  >
                    Select
                  </button>
                </div>
                <div className="bg-white flex-1 shadow-lg blur-sm hover:blur-0 hover:z-10 hover:scale-125 transition-all duration-700 hover:mr-16">
                  <div className="h-16 bg-darkBlue flex items-center justify-center">
                    <h3 className="text-white font-semibold">SILVER</h3>
                  </div>
                  <h1 className="text-[14px] text-center mb-7 mt-3">
                    Whats included in the deal
                  </h1>

                  <div className="px-5">
                    <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Unlimited Posts</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Prompt Notifications</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Dashboard Analytics</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>Google Ads promotions</h3>
                      </span>
                      <span className="flex items-center gap-2">
                        <img
                          src="/option.png"
                          alt="..."
                          className="object-cover h-7"
                        />
                        <h3>24/7 Support</h3>
                      </span>
                    </div>
                  </div>

                  <div className=" px-2">
                    <h1 className="">Subscription information</h1>
                    <p className="mt-2 text-[12px]">
                      Your subscription will require renewal after every one
                      year
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setSubscription("Biannual");
                    }}
                    className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* right component */}
          <div className="w-full md:w-[25%] p-5 rounded font-serif">
            <Alert color="warning" withBorderAccent>
              <span>
                <span className="text-gray-400 text-lg font-semibold">
                  Heads Up!
                </span>{" "}
                Welcome to Our Exclusive Sellers Club! Subscribe now for premium
                features, expert tips, and a supportive community to boost your
                vehicle sales.
              </span>
            </Alert>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col md:hidden relative">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
          <Carousel slideInterval={5000}>
            <img
              src="https://miro.medium.com/v2/resize:fit:852/1*mUd3vykZLFMQrM5v55bELQ.jpeg"
              alt="..."
              className="object-cover w-full"
            />
            <img
              src="https://e1.pxfuel.com/desktop-wallpaper/732/624/desktop-wallpaper-call-centre-clouds-solutions-for-small-call-center-thumbnail.jpg"
              alt="..."
              className="object-cover w-full"
            />
            <img
              src="https://cdn.pixabay.com/photo/2017/07/15/09/42/call-center-2505957_640.jpg"
              alt="..."
              className="object-cover w-full"
            />
          </Carousel>
          <div className="w-full inset-0 bg-gradient-to-tr from-pink-600 to-indigo-600/50 absolute"></div>
        </div>
        <div className="absolute w-[90%] top-40 left-8 flex flex-row gap-5 justify-center items-start">
          <div
            className={`bg-white hover:scale-125 transition-all duration-700 w-[100px] hover:w-[400px] z-20 overflow-hidden hover:ml-10`}
            onMouseEnter={() => setGoldScale(true)}
            onMouseLeave={() => setGoldScale(false)}
          >
            <div className="h-16 bg-darkBlue text-white flex items-center justify-center">
              <h1>BRONZE</h1>
            </div>
            <div className={`${!goldScale ? "hidden" : ""}`}>
              <h1 className="text-[14px] text-center mb-7 mt-3">
                Whats included in the deal
              </h1>

              <div>
                <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Unlimited Posts</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Prompt Notifications</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Dashboard Analytics</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Google Ads promotions</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>24/7 Support</h3>
                  </span>
                </div>
              </div>

              <div className=" px-2">
                <h1 className="">Subscription information</h1>
                <p className="mt-2 text-[12px]">
                  Your subscription will require renewal after every one year
                </p>
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setSubscription("Monthly");
                }}
                className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
              >
                Select
              </button>
            </div>
          </div>
          <div
            className={`bg-white scale-125 w-[300px] ${
              goldScale ? "blur-sm scale-95 z-0" : ""
            } z-10`}
          >
            <div className="h-16 bg-darkBlue text-white flex items-center justify-center">
              <h1>GOLD</h1>
            </div>
            <div className={`${goldScale ? "" : ""}`}>
              <h1 className="text-[14px] text-center mb-7 mt-3">
                Whats included in the deal
              </h1>

              <div>
                <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Unlimited Posts</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Prompt Notifications</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Dashboard Analytics</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Google Ads promotions</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>24/7 Support</h3>
                  </span>
                </div>
              </div>

              <div className=" px-2">
                <h1 className="">Subscription information</h1>
                <p className="mt-2 text-[12px]">
                  Your subscription will require renewal after every one year
                </p>
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setSubscription("Monthly");
                }}
                className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
              >
                Select
              </button>
            </div>
          </div>
          <div
            className="bg-white hover:scale-125 transition-all duration-700 hover:mr-20 w-[100px] hover:w-[400px] overflow-hidden"
            onMouseEnter={() => setGoldScale(true)}
            onMouseLeave={() => setGoldScale(false)}
          >
            <div className="h-16 bg-darkBlue text-white flex items-center justify-center">
              <h1>SLIVER</h1>
            </div>
            <div className={`${!goldScale ? "hidden" : ""}`}>
              <h1 className="text-[14px] text-center mb-7 mt-3">
                Whats included in the deal
              </h1>

              <div>
                <div className="my-3 border-2 border-gray-500 border-dashed p-1 flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Unlimited Posts</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Prompt Notifications</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Dashboard Analytics</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>Google Ads promotions</h3>
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src="/option.png"
                      alt="..."
                      className="object-cover h-7"
                    />
                    <h3>24/7 Support</h3>
                  </span>
                </div>
              </div>

              <div className=" px-2">
                <h1 className="">Subscription information</h1>
                <p className="mt-2 text-[12px]">
                  Your subscription will require renewal after every one year
                </p>
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                  setSubscription("Monthly");
                }}
                className="w-full mt-5 py-1 shadow-md hover:shadow-none transition-all duration-300 text-white bg-darkBlue text-sm"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <SubscribeModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          subscription={subscription}
        />
      )}
    </div>
  );
}
