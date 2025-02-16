// import type React from "react"
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"

import HomePage from "./frontend/pages/Home";
import HeroSection from "./frontend/components/Herosection";

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="herosection" element={<HeroSection />} />


      </Routes>
    </Router>
  )
}

export default App;