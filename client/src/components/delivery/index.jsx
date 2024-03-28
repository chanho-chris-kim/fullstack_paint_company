import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Delivery = () => {
  const { apiCall, token, paints, setPaints, deliveries, setDeliveries } =
    useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCall.getDeliveries();
        setDeliveries(data);
        console.log(deliveries);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate, setDeliveries]);

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <>
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Delivery</h3>
        </div>
        <div className="row bg-light mr-lg-1 vh-100 mx-xs-1 mx-sm-1 pt-3">
          {deliveries && (
            <>
              <DeliveryGroup
                title="Ready to Pick Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status === 0
                )}
              />
              <DeliveryGroup
                title="Picked Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status !== 0
                )}
                lastColumn
              />
            </>
          )}
        </div>
      </>
    );
  }
};

const DeliveryGroup = ({ title, deliveries, lastColumn }) => (
  <div className={`col-md-6 ${lastColumn ? "" : "border-right"} px-1`}>
    <p className="text-center">{title}</p>
    {deliveries &&
      deliveries.map((delivery) => (
        <div key={delivery.delivery_id} className="card mb-1 bg-secondary">
          <div className="card-body text-white">
            <h5 className="card-title">{delivery.delivery_colour}</h5>
            <p className="card-text">Delivery address:</p>
            <p className="card-text">{`${delivery.delivery_address}`}</p>
            <p className="card-text">Quantity:</p>
            <p className="card-text">{`${delivery.quantity}`}</p>
            <p className="card-text">Status:</p>
            <p className="card-text">{`${
              delivery.status == 0 ? "Ready to Pick Up" : "Picked Up"
            }`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Delivery;
