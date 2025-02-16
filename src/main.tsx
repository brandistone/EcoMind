import { StrictMode } from "react";


import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import HomePage from './frontend/pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
