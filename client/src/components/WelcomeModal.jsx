export default function WelcomeModal({ setOpenModal, openModal }) {
  return (
    <div className="inset-0 fixed h-full items-center flex justify-center bg-black/70">
      <div className="px-5 bg-white h-72 w-[550px] relative flex">
        <img
          src="/welcome2.png"
          alt="..."
          className="object-cover absolute h-80 -top-[50px] -left-[80px] w-full]"
        />
        <div className=""></div>
        <div className="flex-1 ml-36 p-5 items-start">
          <p className="font-lato">
            Rev your engines! 🚗💨 It's time to hit the road! Your personalized
            vehicle haven awaits as soon as you touch down on our homepage. Get
            ready for an adrenaline-fueled journey with our sleek and stylish
            vehicles. Buckle up, because the adventure begins the moment you
            arrive!
          </p>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="bg-popsicle py-2 px-6 mt-5 hover:opacity-90 shadow-lg hover:shadow-none transition-all duration-500 hover:scale-105 text-white"
          >
            Lets Go
          </button>
        </div>
      </div>
    </div>
  );
}
