import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

export const API_URL = import.meta.env.VITE_API_URL;

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
}
export default App;
