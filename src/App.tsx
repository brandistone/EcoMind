// import type React from "react"
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"

import HomePage from "./frontend/pages/Home";
import HeroSection from "./frontend/components/Herosection";
import { Sidebar } from "lucide-react";

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="herosection" element={<HeroSection />} />
        <Route path="sidebar" element={<Sidebar />} />


      </Routes>
    </Router>
  )
}

export default App;