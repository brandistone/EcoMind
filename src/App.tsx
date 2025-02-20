// import type React from "react"
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"

import HomePage from "./frontend/pages/Home";
import HeroSection from "./frontend/components/Herosection";
// import { Sidebar } from "lucide-react";
// import DashboardPage from "./frontend/pages/dashboard";
// import ExploreMap from "./frontend/pages/exploreMap";
// import ScenarioAnalysisTool from "./frontend/pages/scenarioAnalysis";
// import ScenarioAnalysisChat from "./frontend/pages/scenarioAnalysis";
import LoginPage from "./frontend/pages/login";
import SignUp from "./frontend/pages/signup";
import ProfileSetup from "./frontend/components/profile";
import Dashboard from "./frontend/components/dashboard";
import ActivityLogger from "./frontend/components/activity-logger";
import BusinessDashboard from "./frontend/pages/business-dashboard";
import BusinessProfile from "./frontend/pages/business-profile";

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/herosection" element={<HeroSection />} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        {/* <Route path="/map" element={<ExploreMap />} /> */}
        {/* <Route path="/scenario" element={<ScenarioAnalysisChat />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/dasboard" element={<Dashboard />} />
        <Route path="/activity-logger" element={<ActivityLogger />} />
        <Route path="/business-dashaboard" element={<BusinessDashboard />} />
        <Route path="/business-profile" element={<BusinessProfile />} />





      </Routes>
    </Router>
  )
}

export default App;