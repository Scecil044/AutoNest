import { useState } from "react";
import CompanyHeatMap from "./CompanyHeatMap";
import NewCompanyTab from "./NewCompanyTab";

export default function CompanyTabs() {
  const [activeTab, setActiveTab] = useState(2);
  return (
    <>
      <div className="flex gap-1 font-serif">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-1 shadow-md hover:shadow-none transition-all duration-200 ${
            activeTab === 1 ? "bg-pink-600 text-white" : ""
          }`}
        >
          Activity Heatmap
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-1 shadow-md hover:shadow-none transition-all duration-200 ${
            activeTab === 2 ? "bg-pink-600 text-white" : ""
          }`}
        >
          Create New
        </button>
      </div>
      <section className="tabs my-1">
        {activeTab === 1 ? (
          <>
            <CompanyHeatMap />
          </>
        ) : activeTab === 2 ? (
          <>
            <NewCompanyTab />
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
