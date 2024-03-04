import { IoCarSportOutline } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { BarChart } from "@mui/x-charts/BarChart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    //fetch companies from database
    const fetchCompanies = async () => {
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
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen font-lato">
      <div className="p-5 bg-white border-gray-300 shadow-lg">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
          <div className="md:w-[300px] w-full shadow-md p-5 border-gray-300 border-2">
            <h2 className="text-xl font-bold">Overview</h2>
            <span className="flex items-center gap-1">
              <h2 className="font-semibold text-md text-nowrap">
                Company Name:
              </h2>
              <h1 className="text-md  text-darkGreen text-nowrap">
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
              <h1 className="text-md  text-darkGreen">Car Yard</h1>
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
          </div>
          <div className="flex-1 shadow-md p-5 border-gray-300 border-2 items-start overflow-x-auto">
            <div className="flex flex-col md:flex-row md:gap-5 gap-3">
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
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
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
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
              <div className="flex-1 shadow-md p-2 border-gray-200 border-2 items-start">
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
            <button className="py-2 px-4 shadow-md rounded">Inventory</button>
            <div className="my-5">
              <div className="logo flex gap-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png"
                  alt="logo"
                  className="object-cover h-16 w-16 rounded-full"
                />
                <div>
                  <p className="text-sm">
                    Ford Motors was founded by Henry Ford and incorporated on
                    June 16, 1903. The company sells automobiles and commercial
                    vehicles under the Ford brand, and luxury cars under its
                    Lincoln brand. Ford also owns a 32% stake in China's
                    Jiangling Motors.
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
                <div className="flex-1 hidden md:inline">
                  <h1 className="font-semibold text-darkGreen">Description</h1>
                  <p className="text-sm my-1 bg-blue-50 p-5">
                    The plotted figures shows your interactions in terms of sale
                    with this organization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
