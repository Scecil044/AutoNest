import { Link } from "react-router-dom";

export default function ShowMoreModal({ showMoreModal, setShowMoreModal }) {
  return (
    <div className="fixed inset-0 h-full w-full bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 md:w-[40%] w-[80%] relative font-serif">
        <img
          src="/more.png"
          alt=""
          className="absolute -top-[50px] -left-[90px] h-80"
        />
        <div className="flex flex-col ml-60">
          <Link
            to="/dashboard"
            className="px-2 text-2xl font-roboto font-bold flex text-nowrap"
          >
            <span className="text-3xl text-nowrap">A</span>uto
            <span className="text-popsicle">Nest</span>Ke Dashboard
          </Link>
          <div>
            <p className="pb-8">
              Welcome to the Admin Dashboard! This centralized hub empowers you
              to efficiently manage all aspects of your website. From user
              management to content moderation, you have full control at your
              fingertips.
            </p>
            <button
              onClick={() => setShowMoreModal(false)}
              className="py-2 px-6 bg-pink-600 text-white rounded shadow-lg hover:shadow-none transition-all duration-300 hover:bg-pink-700 hover:scale-105"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
