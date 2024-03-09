import { Alert } from "flowbite-react";
import { useState } from "react";
import BusinessProfileCard from "../../components/BusinessProfileCard";

export default function BusinessProfile() {
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="min-h-screen">
      <div className="p-5 bg-white border-gray-300 shadow-lg table-auto overflow-x-auto">
        <div className="bg-[#212121] text-white px-2 mb-2">
          Businesses registered under your name
        </div>
        <Alert color="warning" withBorderAccent>
          <span>
            <span className="font-medium">Module info!</span> This table shows
            the list of all businesses affiliated to you
          </span>
        </Alert>
        <table className="w-full">
          <thead className="bg-gray-200 border-b-2 text-left">
            <tr>
              <th>No.</th>
              <th>Logo</th>
              <th>Name</th>
              <th className="text-nowrap">Company Email</th>
              <th>Country</th>
              <th>City</th>
              <th className="text-nowrap">Created By</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          {companies && companies.length < 1 ? (
            <tbody>
              <tr>
                <td colSpan={9}>
                  <p className="text-center mt-5 text-sm">
                    No company is currently registered under your name
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>

        <div className="mt-5">
          {/* tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 py-1 shadow-lg hover:shadow-none transition-all duration-300 ${
                activeTab === 1 ? "bg-pink-600 text-white" : ""
              }  text-black`}
            >
              Company Profile
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`flex-1 py-1 shadow-lg hover:shadow-none transition-all duration-300 ${
                activeTab === 2 ? "bg-pink-600 text-white" : ""
              }  text-black`}
            >
              Enquries
            </button>
          </div>
          {activeTab === 1 && <BusinessProfileCard />}
        </div>
      </div>
    </div>
  );
}
