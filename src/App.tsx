// import type React from "react"
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import  Example  from "./frontend/pages/Home"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
    </Router>
  )
}

export default App;