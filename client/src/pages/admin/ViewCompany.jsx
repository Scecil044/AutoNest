import { IoCarSportOutline } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { BarChart } from "@mui/x-charts/BarChart";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import DashboardLoader from "../../components/common/DashboardLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 400,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Fev",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value}mm`;
export default function ViewCompany() {
  const navigate = useNavigate();
  const { countries } = useCountries();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const params = useParams();
  const [formData, setFormData] = useState({});
  // states to update user
  const [updateLoader, setUpdateLoader] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  useEffect(() => {
    //fetch companies from database
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `/api/companies/get/companies?companyId=${params.companyId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setCompany(data.companies);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/users/get/users");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setUsers(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
    fetchCompany();
  }, []);
  // filter through users
  const filteredUsers = users.filter(
    (user) => user.userName !== company[0]?.userRef.userName
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      setUpdateError(false);
      setUpdateLoader(true);
      const res = await fetch(
        `/api/companies/update/company/${params.companyId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      // check if an error is encountered
      if (data.success === false) {
        setUpdateError(data.message);
        setUpdateLoader(false);
        toast(data.message, {
          type: "error",
          theme: "dark",
        });
        return;
      }
      if (res.ok) {
        setUpdateError(false);
        setUpdateLoader(false);
        navigate("/companies");
        toast("Company updated successfully", {
          type: "success",
          theme: "dark",
        });
      }
    } catch (error) {
      setUpdateError(error.message);
      setUpdateLoader(false);
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen font-lato">
      <div className="flex flex-col md:flex-row gap-5 md:gap-4 items-start">
        <div className="md:w-[400px] w-full flex flex-col gap-3">
          <div className="shadow-md p-5 bg-white border-gray-300 border-2 hover:scale-105 transition-all duration-300 cursor-pointer">
            <h2 className="text-xl font-bold">Overview</h2>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md text-ellipsis">
                Company Name:
              </h2>
              <h1 className="text-md  text-darkGreen text-ellipsis">
                {company[0]?.companyName}
              </h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Location:</h2>
              <h1 className="text-md  text-darkGreen">
                {company[0]?.city + "," + " " + company[0]?.country}
              </h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Model:</h2>
              <h1 className="text-md  text-darkGreen">
                {company[0]?.businessType}
              </h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Website:</h2>
              <h1 className="text-md  text-darkGreen">www.carsoko.com</h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Owner:</h2>
              <h1 className="text-md  text-darkGreen">
                {" "}
                {company[0]?.userRef.firstName +
                  " " +
                  company[0]?.userRef.lastName}
              </h1>
            </span>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md">Status:</h2>
              <h1 className="text-md  text-darkGreen">
                {company[0]?.status === "Flagged" ? (
                  <div className="text-popsicle font-semibold">
                    {company[0]?.status}
                  </div>
                ) : company[0]?.status === "Active" ? (
                  <div className="text-green-600 font-semibold">
                    {company[0]?.status}
                  </div>
                ) : company[0]?.status === "Restricted" ? (
                  <div className="text-red-600 font-semibold">
                    {company[0]?.status}
                  </div>
                ) : (
                  ""
                )}
              </h1>
            </span>
          </div>

          <div className="shadow-md p-5 bg-white border-gray-300 border-2 hover:scale-105 transition-all duration-300 cursor-pointer">
            <form onSubmit={updateCompany} className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm font-semibold">Owned By:</label>
                <select
                  name="userRef"
                  id="userRef"
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border-gray-400 focus:ring-0"
                >
                  <option value="">
                    {company[0]?.userRef.firstName +
                      " " +
                      company[0]?.userRef.lastName}
                  </option>
                  {filteredUsers.map((user, index) => (
                    <option key={index} value={user._id}>
                      {user.firstName + " " + user.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  id="companyName"
                  defaultValue={company[0]?.companyName}
                  onChange={handleChange}
                  className="py-1 px-2 border-gray-400 focus:outline-none focus:ring-0 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  id="city"
                  defaultValue={company[0]?.city}
                  onChange={handleChange}
                  className="py-1 px-2 border-gray-400 focus:outline-none focus:ring-0 focus:bg-blue-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Country</label>
                <select
                  disabled
                  name="country"
                  id="country"
                  className="py-1 px-2 focus:outline-none border-gray-400 focus:ring-0"
                >
                  {countries.map(({ capital }, index) => (
                    <option key={index} value={capital}>
                      {capital}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Business Model</label>
                <select
                  name="businessType"
                  id="businessType"
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border-gray-400 focus:ring-0"
                >
                  <option value="">{company[0]?.businessType}</option>
                  <option value="Yard">Car Yard</option>
                  <option value="Show Room">Show Room</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Status</label>
                <select
                  name="status"
                  id="status"
                  onChange={handleChange}
                  className="py-1 px-2 focus:outline-none border-gray-400 focus:ring-0"
                >
                  <option value="">{company[0]?.status}</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Active">Active</option>
                </select>
              </div>

              <button
                disabled={updateLoader}
                className={`py-1 bg-pink-600 shadow-md hover:shadow-none transition-all duration-200 text-white disabled:cursor-not-allowed`}
              >
                {updateLoader ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md p-5 border-gray-300 border-2 items-start overflow-x-auto">
          <div className="flex flex-col md:flex-row md:gap-5 gap-3">
            <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="border-l-4 border-pink-600 p-5 flex">
                <div className="flex-1 flex-col">
                  <IoCarSportOutline className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                  <p>Listed cars</p>
                </div>
                <div className="flex-1 border-l-4">
                  <h1 className="text-center font-bold text-3xl">234</h1>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="border-l-4 border-pink-600 p-5 flex">
                <div className="flex-1 flex-col">
                  <FaFlagCheckered className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                  <p>Flagged</p>
                </div>
                <div className="flex-1 border-l-4">
                  <h1 className="text-center font-bold text-3xl">116</h1>
                </div>
              </div>
            </div>
            <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="border-l-4 border-pink-600 p-5 flex">
                <div className="flex-1 flex-col">
                  <IoBarChartSharp className="md:w-8 md:h-8 w-10 h-10 ml-5" />
                  <p>Sales Closed</p>
                </div>
                <div className="flex-1 border-l-4">
                  <h1 className="text-center font-bold text-3xl">11</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="my-3">
            <Link
              to={`/company/inventory/${params.companyId}`}
              className="py-2 px-4 shadow-md rounded bg-pink-600 text-white"
            >
              View Inventory
            </Link>
          </div>
          <div className="my-5">
            <div className="logo flex gap-5">
              <img
                src={company[0]?.companyLogo}
                alt="logo"
                className="object-cover h-16 w-16 rounded-full"
              />
              <div>
                <p className="text-sm">
                  Ford Motors was founded by Henry Ford and incorporated on June
                  16, 1903. The company sells automobiles and commercial
                  vehicles under the Ford brand, and luxury cars under its
                  Lincoln brand. Ford also owns a 32% stake in China's Jiangling
                  Motors.
                </p>
              </div>
            </div>

            {/* graph */}
            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex-1">
                <BarChart
                  dataset={dataset}
                  yAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "seoul",
                      label: "Seoul rainfall",
                      valueFormatter,
                    },
                  ]}
                  layout="horizontal"
                  {...chartSetting}
                />
              </div>
              <div className="flex-1 hidden md:inline flex-col">
                <div>
                  <h1 className="font-semibold text-darkGreen">Description</h1>
                  <p className="text-sm my-1 bg-blue-50 p-5">
                    The plotted figures shows your interactions in terms of sale
                    with this organization
                  </p>
                </div>

                {company[0]?.status === "Flagged" && (
                  <div className="animate-pulse">
                    <h1 className="font-semibold text-red-600">
                      Account status
                    </h1>
                    <p className="text-sm my-1 bg-red-100 p-5">
                      This accounts condition is critical. It has a flagged
                      state for some reason.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {updateLoader && <DashboardLoader />}
    </div>
  );
}
