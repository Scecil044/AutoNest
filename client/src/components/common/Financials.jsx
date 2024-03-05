import { Link } from "react-router-dom";

export default function Financials() {
  return (
    <>
      <div className=" p-10 bg-pampas relative">
        <div className="absolute p-5 bg-[#003566] md:w-[500px] w-[350px] md:h-[230px] h-[200px] md:-top-5 top-[297px] right-0">
          <div className="p-5 bg-popsicle w-12 md:w-14 relative -left-10 top-10"></div>
          <p className="text-white text-center ml-2">
            Discover the essence of financial integrity through our concise
            resources. Learn about ethical investing, transparent financial
            practices, and strategies for accountability. Explore our finance
            section for insights that empower smart financial decisions and
            long-term prosperity.
          </p>
        </div>
        <div className="md:w-[50%]">
          <h1 className="text-center text-3xl font-semibold mb-4">
            FINANCIALS
          </h1>
          <div className="flex">
            <div className="border-r-2 border-gray-400 p-5 flex-1">
              <h1 className="text-sm">
                One of our unassailable reputations in the automobile sale
                business is our openness and transparency in financial
                statements
              </h1>
              <div className="mt-10">
                <h2 className="font-semibold text-lg hover:underline">
                  Company Statement
                </h2>
                <h1 className="text-sm">
                  Our organization has made significant reforms aimed at
                  reinstating business stability folLowing the outbreak of
                  COVID-19. Our prices, are not however, over-hipped out of
                  greed to make extraordinary profits
                </h1>
              </div>
            </div>
            <div className="p-5 flex-1">
              <h1 className="font-semibold text-lg hover:underline">
                2023 Annual Financial Report
              </h1>

              <div className="mt-5">
                <Link className="hover:underline">
                  Download and view statement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
