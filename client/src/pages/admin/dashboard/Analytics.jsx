import { FaUsersGear } from "react-icons/fa6";
import { MdOutlineBusiness } from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";


export default function Analytics() {
  return (
    <div className="bg-white p-5 shadow-lg hover:scale-105 transition-all duration-500 flex- flex-col items-start">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="shadow-lg border border-gray-300">
          <div className="px-2 pb-5 border-l-4 border-pink-600 bg-black text-white">
            <h3>Users</h3>
            <div className="flex gap-3">
              <div className="flex-1 items-center justify-center border-r-2">
                <div className="ml-2">
                  <FaUsersGear className="h-10 w-10 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl">235</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg border border-gray-300">
          <div className="px-2 pb-5 border-l-4 border-pink-600 bg-pink-700 text-white">
            <h3>Companies</h3>
            <div className="flex gap-3">
              <div className="flex-1 items-center justify-center border-r-2">
                <div className="ml-2">
                  <MdOutlineBusiness className="h-10 w-10 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl">95</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg border border-gray-300">
          <div className="px-2 pb-5 border-l-4 border-pink-600 bg-indigo-800 text-white">
            <h3>Requests</h3>
            <div className="flex gap-3">
              <div className="flex-1 items-center justify-center border-r-2">
                <div className="ml-2">
                  <SiHiveBlockchain className="h-10 w-10 text-center" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl">35</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
