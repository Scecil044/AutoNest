import { useState } from "react";
import { Link } from "react-router-dom";
import NewsLetter from "../components/common/NewsLetter";
import Events from "../components/common/Events";
import Financials from "../components/common/Financials";
import CompanySpotLight from "../components/common/CompanySpotLight";

export default function About() {
  return (
    <div className="min-h-screen font-lato">
      <div>
        <CompanySpotLight />
      </div>
      <div className="md:flex md:justify-between gap-10 relative">
        <div className=" bg-[#0077b6] text-white h-[300px] py-5 px-10 flex-1 relative">
          <div className="absolute bg-popsicle p-3 -top-3 w-[40%]"></div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide mt-5">
              We are in this for good
            </h1>
            <p className=" font-medium my-3">
              Definity Financial Corporation is the parent company to some of
              Canada’s most long-standing and innovative property and casualty
              insurance companies, including Economical, Sonnet, Family, and
              Petline. We protect our customers’ homes, vehicles, businesses,
              farms, and pets with products and service they can count on.
            </p>
          </div>
        </div>
        <div className="md:w-[350px] w-[180px] md:relative absolute -bottom-5 right-5">
          <div className="hidden md:inline p-5 bg-gray-300 md:w-[50%] md:h-40 md:absolute right-14 -top-5"></div>
          <div className="p-5 bg-[#003566] md:w-[50%] md:h-40 md:absolute md:right-20 md:top-2">
            <div className="text-white w-[80%] mx-auto">
              <h1>Lets us do this!</h1>
              <div className="bg-white p-[1px]"></div>
              <span className="flex items-center gap-1">
                <h5 className="text-xs md:text-sm">Save upto</h5>
                <h2 className="text-lg md:text-4xl font-semibold">$100</h2>
              </span>
              <div className="bg-white p-[1px]"></div>
              <p className="text-[7px] text-center">
                AtoNest terms and conditions apply in all our transactions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-12 bg-[#0077b6] p-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <div className="">
              <h1 className="text-2xl text-center text-white mt-5 mb-5">
                AutoNest.KE
              </h1>
              <h1 className="text-white font-semibold underline text-lg">
                See how our employees are rolling up their sleeves to have a
                positive impact in the car dealership industry
              </h1>
              <h2 className="text-white text-sm">
                This is just who we are. We are AutoNest, ans we are defined by
                our exceptionality in customer service, and equality for all
              </h2>
            </div>
          </div>
          <div className="video">
            <iframe
              width="665"
              height="250"
              src="https://www.youtube.com/embed/5IKK5LMi-E0?si=XLmgSpmnKdH8Uz-i"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="bg-white p-5"></div>

      <Financials />
      <div className="bg-white p-5"></div>
      <div className="">
        <Events />
      </div>
      <div className="p-5 bg-pampas">
        <NewsLetter />
      </div>
    </div>
  );
}
