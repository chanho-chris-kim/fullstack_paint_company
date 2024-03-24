import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";
import Navbar from "../navbar";

const Home = () => {
  const { apiCall, token, setToken, paints, setPaints } = useApi();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of the token
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/login");
    }
  }, [navigate]);

  async function handleLogout() {
    setErrorMessage("");

    try {
      await apiCall.doLogout();
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    } catch {
      setErrorMessage("Failed to log out");
    }
  }

  if (token) {
    return (
      <div className="p-3">
        <Navbar handleLogout={handleLogout} />
        <div className="vh-100 bg-light row">
          <div className="bg-dark col-sm-12 col-md-2 p-0">
            <Nav />
          </div>
          <div className="bg-grey bg-gradient col-sm-12 col-md-10">
            <div className="row bg-primary">
              <div className="col-md-3">
                <h3 className="text-center">Available</h3>
                <div className="row">
                  

                  
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>


                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <h3 className="text-center">Running Low</h3>
                <div className="row">
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <h3 className="text-center">Out of Stock</h3>
                <div className="row">
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <h3 className="text-center">In Order</h3>
                <div className="row">
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                  <div className="card col-xl-12">
                    <div className="card-body">
                      <h5 className="card-title">Purple@@</h5>
                      <p className="card-text">In stock 200@@</p>
                      <p className="card-text">5@@ available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return navigate("/login");
  }
};

export default Home;
