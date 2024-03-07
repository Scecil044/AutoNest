import { HiEye } from "react-icons/hi";

export default function AdditionalContent({ showWarning, setShowWarning }) {
  return (
    <div>
      <div className="flex gap-2">
        <button className="flex py-1 px-2 items-center gap-1 border border-darkGreen rounded-xl hover:bg-pink-600 hover:text-white">
          <HiEye className="h-5 w-5" />
          View more
        </button>
        <button
          onClick={() => setShowWarning(false)}
          className="flex py-1 px-2 items-center gap-1 border border-darkGreen rounded-xl hover:bg-pink-600 hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
