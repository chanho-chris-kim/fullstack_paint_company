import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Delivery from "./components/delivery";
import Admin from "./components/admin";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import Navbar from "./components/navbar";
import Nav from "./components/nav";
import { ApiProvider } from "./contexts/ApiContext";

function App() {
  return (
    <ApiProvider>
      <div className="p-2">
        <Navbar />
      </div>
      <div className="bg-dark d-lg-none mw-100 border-bottom d-flex justify-content-around">
        <Nav />
      </div>
      <div className="d-flex w-100">
        <div
          className="bg-dark d-none d-lg-block pt-2 pl-2 nav-tablet"
          style={{ width: "15%", maxWidth:"11rem"}}
        >
          <Nav />
        </div>
        <div className="w-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </ApiProvider>
  );
}

export default App;
