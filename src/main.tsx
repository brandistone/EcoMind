import { StrictMode } from "react";
// import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'



import HomePage from "./frontend/pages/Home.tsx";
import HeroSection from "./frontend/components/Herosection.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/herosection',
    element: <HeroSection />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
