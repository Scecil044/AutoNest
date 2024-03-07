export default function SessionExpiredModal() {
  return (
    <div className="flex items-center justify-center inset-0 absolute">
      <div className="p-5 bg-white w-[30%] justify-center items-center flex flex-col shadow-lg hover:scale-105 transition-all duration-700">
        <h1 className="text-lg text-center text-darkGreen font-serif">
          Your session has Expired!
        </h1>
        <div>
          <button className="py-2 mt-3 px-6 bg-pink-600 text-white self-start">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
