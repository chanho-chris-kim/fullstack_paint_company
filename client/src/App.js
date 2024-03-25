import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Delivery from "./components/delivery";
import Admin from "./components/admin";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import Navbar from "./components/navbar";
import { ApiProvider } from "./contexts/ApiContext";

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ApiProvider>
  );
}

export default App;