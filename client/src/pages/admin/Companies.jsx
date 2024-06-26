import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal";
import { Alert } from "flowbite-react";
import CompanyTabs from "../../components/CompanyTabs";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    //fetch companies from database
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/companies/get/companies");
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setCompanies(data.companies);
          setCompaniesCount(data.totalCompanies);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchCompanies();
  }, [openModal]);
  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  return (
    <div className="min-h-screen font-lato">
      <div className="p-5 bg-white border-gray-300 shadow-lg overflow-x-auto table-auto">
        <div className="bg-[#212121] text-white px-2 mb-2">
          Registered Companies
        </div>
        {!error && (
          <Alert color="warning" withBorderAccent>
            <span>
              <span className="font-medium">Module info!</span> This table shows
              the list of all registered companies in the system
            </span>
          </Alert>
        )}
        <div className="">
          {!loading && error && (
            <Alert color="failure" withBorderAccent>
              <span>
                <span className="font-bold font-serif text-red-600">
                  Error info!
                </span>{" "}
                Could not load companies. Please check your internet connection
                or refresh this module
              </span>
            </Alert>
          )}
        </div>
        <div className="flex items-center justify-between my-2">
          <div></div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-400 focus:outline-none rounded py-1 px-2"
          />
        </div>
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
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="w-full flex items-center justify-center mt-2">
                    <div className="rounded-full h-12 w-12 animate-spin border-b-2 border-r-2 border-b-orange-500 border-r-blue-700"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {!loading &&
                !error &&
                filteredCompanies.map((company, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 1 ? "bg-gray-100" : ""}
                  >
                    <td className="border-b-2 p-1">{(index += 1)}</td>
                    <td className="border-b-2 p-1">
                      <img
                        src={company?.companyLogo}
                        alt="logo"
                        className="rounded-full object-cover h-8 w-8"
                      />
                    </td>
                    <td className="border-b-2 p-1">
                      <Link to={`/view/company/${company?._id}`}>
                        {company?.companyName}
                      </Link>
                    </td>
                    <td className="border-b-2 p-1">example@gmail.com</td>
                    <td className="border-b-2 p-1">{company?.country}</td>
                    <td className="border-b-2 p-1">{company?.city}</td>
                    <td className="border-b-2 p-1">
                      {company?.userRef?.firstName +
                        " " +
                        company?.userRef?.lastName}
                    </td>
                    <td className="border-b-2 p-1">{company?.joined}</td>
                    <td className="border-b-2 p-1 flex items-center gap-1">
                      <Link
                        to={`/view/company/${company._id}`}
                        className="py-1 px-1 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                      >
                        <FaEdit className="text-blue-500 h-5 w-5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setCompanyId(company._id);
                        }}
                        className="py-1 px-1 hover:opacity-90 shadow-sm hover:shadow-none transition-all duration-100 flex items-center gap-2 hover:bg-blue-100 hover:scale-105"
                      >
                        <MdDelete className="text-red-500 h-5 w-5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <div className="mt-2">
          <div className="bg-[#212121] text-white px-2">Create Company</div>
          <div className="my-2">
            <CompanyTabs />
          </div>
        </div>
      </div>

      {openModal && (
        <DeleteModal
          role="deleteCompany"
          openModal={openModal}
          setOpenModal={setOpenModal}
          companyId={companyId}
        />
      )}
    </div>
  );
}
