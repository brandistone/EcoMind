import { StrictMode } from "react";
// import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'



import HomePage from "./frontend/pages/Home.tsx";
import HeroSection from "./frontend/components/Herosection.tsx";
import { Sidebar } from "lucide-react";
// import DashboardPage from "./frontend/pages/dashboard.tsx";
// import ExploreMap from "./frontend/pages/exploreMap.tsx";
// import ScenarioAnalysisTool from "./frontend/pages/scenarioAnalysis.tsx";
// import ScenarioAnalysisChat from "./frontend/pages/scenarioAnalysis.tsx";
import LoginPage from "./frontend/pages/login.tsx";
import SignUp from "./frontend/pages/signup.tsx";
import ProfileSetup from "./frontend/components/profile.tsx";
import Dashboard from "./frontend/components/dashboard.tsx";
import ActivityLogger from "./frontend/components/activity-logger.tsx";
import BusinessDashboard from "./frontend/pages/business-dashboard.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/herosection',
    element: <HeroSection />,
  },

  {
    path: '/sidebar',
    element: <Sidebar/>,
  },

  // {
  //   path: '/dashboard',
  //   element: <DashboardPage/>,
  // },



  {
    path: '/login',
    element: <LoginPage/>,
  },

  {
    path: '/signup',
    element: <SignUp/>,
  },

  {
    path: '/profile',
    element: <ProfileSetup/>,
  },

  {
    path: '/dashboard',
    element: <Dashboard/>,
  },

  {
    path: '/activity-logger',
    element: <ActivityLogger/>,
  },

  {
    path: '/business-dashboard',
    element: <BusinessDashboard/>,
  },






]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
