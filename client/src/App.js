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
      <Navbar />
      <div
        className="bg-dark d-lg-none mw-100"
        style={{ maxWidth: "11rem" }}
      >
        <Nav />
      </div>
      <div className="row vh-100">
        <div
          className="bg-dark flex-column d-none d-lg-block col"
          style={{ maxWidth: "11rem" }}
        >
          <Nav />
        </div>

        <div className="col pl-lg-0 pr-lg-0">
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
