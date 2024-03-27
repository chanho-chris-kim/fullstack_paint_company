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
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Delivery</h3>
        </div>
        <div className="row bg-light mr-lg-1 vh-100 mx-xs-1 mx-sm-1 pt-3">
          {paints && (
            <>
              <DeliveryGroup
                title="Ready to Pick Up"
                paints={paints.categorizedPaints.a}
              />
              <DeliveryGroup
                title="Picked Up"
                paints={paints.categorizedPaints.b}
                lastColumn
              />
            </>
          )}
        </div>
      </>
    );
  }
};

const DeliveryGroup = ({ title, paints, lastColumn }) => (
  <div className={`col-md-6 ${lastColumn ? '' : 'border-right'} px-1`}>
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
