import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Delivery = () => {
  const { apiCall, token, paints } = useApi();
  const navigate = useNavigate();

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <>
        <div className="w-100 bg-dark">
          <h2 className="text-center text-white">Delivery</h2>
        </div>
        <div className="row bg-light pl-2 pr-2 ml-lg-1 mr-lg-1">
          {paints && (
            <>
              <DeliveryGroup
                title="Ready to Pick Up"
                paints={paints.categorizedPaints.a}
              />
              <DeliveryGroup
                title="Picked Up"
                paints={paints.categorizedPaints.b}
              />
            </>
          )}
        </div>
      </>
    );
  }
};

const DeliveryGroup = ({ title, paints }) => (
  <div className="col-md-6 pl-lg-0">
    <p className="text-center">{title}</p>
    {paints &&
      paints.map((paint) => (
        <div key={paint.id} className="card mb-1 bg-secondary">
          <div className="card-body text-white">
            <h5 className="card-title">{paint.paint_colour}</h5>
            <p className="card-text">Delivery address:</p>
            <p className="card-text">{`${paint.paint_quantity}`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Delivery;
