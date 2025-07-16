import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/root_layout"
import Home from "./pages/home"


function App() {

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
