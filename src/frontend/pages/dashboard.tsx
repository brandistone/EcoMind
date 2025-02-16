import React from "react";
// import Sidebar from "../components/Sidebar";
import Sidebar from "../components/sidebar"; // Use lowercase 's' in the import


// import FloodRiskAnalysis from "../components/FloodRiskAnalysis";
// import InteractiveMap from "../components/InteractiveMap";
// import LiveDataFeeds from "../components/LiveDataFeeds";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Flood Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <FloodRiskAnalysis /> */}
          {/* <InteractiveMap /> */}
        </div>
        {/* <LiveDataFeeds /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
