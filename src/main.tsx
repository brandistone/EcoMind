import { StrictMode } from "react";
// import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'



import HomePage from "./frontend/pages/Home.tsx";
import HeroSection from "./frontend/components/Herosection.tsx";
import { Sidebar } from "lucide-react";
import DashboardPage from "./frontend/pages/dashboard.tsx";

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


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
