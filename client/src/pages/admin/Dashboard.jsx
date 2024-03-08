import DashboardLoader from "../../components/common/DashboardLoader";
import DeleteModal from "../../components/common/DeleteModal";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import AdditionalContent from "../../components/common/AdditionalContent";
import { useState } from "react";
import SessionExpiredModal from "../../components/common/SessionExpiredModal";
import ShowMoreModal from "../../components/common/ShowMoreModal";
import RecentRequests from "./dashboard/RecentRequests";
import Analytics from "./dashboard/Analytics";
import Sales from "./dashboard/Sales";
import Graphs from "./dashboard/Graphs";
import Numbers from "./dashboard/Numbers";
import VehiclesGraph from "./dashboard/VehiclesGraph";

export default function Dashboard() {
  const [showWarning, setShowWarning] = useState(true);
  const [showMoreModal, setShowMoreModal] = useState(false);
  return (
    <div className="min-h-screen">
      {showWarning && (
        <div className="shadow-lg mb-2 z-10 rounded">
          <Alert
            color="warning"
            additionalContent={
              <AdditionalContent
                showWarning={showWarning}
                setShowWarning={setShowWarning}
              />
            }
            icon={HiInformationCircle}
            onDismiss={() => alert("Alert dismissed!")}
            rounded
          >
            <span className="font-medium font-serif">Info alert!</span> First
            things first! View your application at a glance
          </Alert>
        </div>
      )}
      <main className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[350px] flex flex-col gap-5">
          <Sales />
          <Graphs />
          <Numbers />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <Analytics />
          <VehiclesGraph />
          <RecentRequests />
        </div>
      </main>
      {showMoreModal && (
        <ShowMoreModal
          showMoreModal={showMoreModal}
          setShowMoreModal={setShowMoreModal}
        />
      )}
    </div>
  );
}
