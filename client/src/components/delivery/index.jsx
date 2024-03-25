import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";
import Navbar from "../navbar";

const Delivery = () => {
  const { apiCall, token, setToken, paints, setPaints } = useApi();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


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

  if (!token) {
    return navigate("/login");
  }
  console.log(paints)

  return (
    <div className="p-3">
      <Navbar handleLogout={handleLogout} />
      <div className="vh-100 bg-light row">
        <div className="bg-dark col-sm-12 col-md-2 p-0">
          <Nav />
        </div>
        <div className="bg-grey bg-gradient col-sm-12 col-md-10">
          <div className="row bg-primary">
            {paints && (
              <>
                <DeliveryGroup title="Ready to Pick Up" paints={paints.categorizedPaints.a} />
                <DeliveryGroup title="Picked Up" paints={paints.categorizedPaints.b} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryGroup = ({ title, paints }) => (
  <div className="col-md-6">
    <p className="text-center">{title}</p>
      {paints && paints.map(paint => (
        <div key={paint.id} className="card mb-1 border-danger">
          <div className="card-body">
            <h5 className="card-title">{paint.paint_colour}</h5>
            <p className="card-text">Delivery address:</p>
            <p className="card-text">{`${paint.paint_quantity}`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Delivery;
