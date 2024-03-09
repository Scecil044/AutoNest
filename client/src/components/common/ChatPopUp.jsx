import { FaChevronDown } from "react-icons/fa";
export default function ChatPopUp(messagePopUp, setMessagePopUp) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <img
            src="https://randomuser.me/portraits/women/67.jpg"
            alt="..."
            className="h-12 w-12 rounded-full object-cover"
          />

          <FaChevronDown
            onClick={() => {
              setMessagePopUp(false);
            }}
            className="w-7 h-5 text-gray-500 cursor-pointer"
          />
        </div>
        <div className="flex flex-col text-black my-2 text-sm gap-1 h-[180px] overflow-y-auto">
          <div className="response">
            <p className="bg-blue-50 p-1 w-[70%]">
              Hello, Im concerned about your payment system. is it working
            </p>
          </div>
          <div className="reply">
            <p className="bg-pink-50 p-1 w-[70%] float-right">
              Hello, Im concerned about your payment system. is it working
            </p>
          </div>
          <div className="response">
            <p className="bg-blue-50 p-1 w-[70%]">
              Hello, Im concerned about your payment system. is it working
            </p>
          </div>
        </div>
        <button className="py-1 w-full text-black">Show More...</button>
      </div>
    </>
  );
}
