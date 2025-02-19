import { StrictMode } from "react";
// import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'



import HomePage from "./frontend/pages/Home.tsx";
import HeroSection from "./frontend/components/Herosection.tsx";
import { Sidebar } from "lucide-react";
import DashboardPage from "./frontend/pages/dashboard.tsx";
import ExploreMap from "./frontend/pages/exploreMap.tsx";
// import ScenarioAnalysisTool from "./frontend/pages/scenarioAnalysis.tsx";
import ScenarioAnalysisChat from "./frontend/pages/scenarioAnalysis.tsx";
import LoginPage from "./frontend/pages/login.tsx";

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

  {
    path: '/dashboard',
    element: <DashboardPage/>,
  },

  {
    path: '/map',
    element: <ExploreMap/>,
  },

  {
    path: '/scenario',
    element: <ScenarioAnalysisChat/>,
  },

  {
    path: '/login',
    element: <LoginPage/>,
  },






]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
