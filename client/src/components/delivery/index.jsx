import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import paint_icon from "../../img/varnish.png";
import quantity_icon from "../../img/boxes.png";
import assigned_icon from "../../img/assignment.png";

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
        <div key={delivery.delivery_id} className="card mb-2 mx-1">
          <div className="card-header" style={{ background: "#D3D3D3" }}>
            <h5 className="card-title text-secondary mb-0">{`${delivery.delivery_address}`}</h5>
          </div>
          <div className="card-body" style={{ background: "#E5E4E2" }}>
            <div className="d-flex">
              <div className="d-flex mr-5">
                <img src={`${paint_icon}`} alt width="20vw" className="mr-2" />
                {}
                <p
                  className="card-text"
                  style={{ color: delivery.delivery_colour }}
                >
                  {delivery.delivery_colour}
                </p>
              </div>
              <div className="d-flex">
                <img
                  src={`${quantity_icon}`}
                  alt
                  width="20vw"
                  className="mr-2"
                />
                <p className="card-text">{delivery.quantity} cans</p>
              </div>
            </div>
            <div className="d-flex mt-2 justify-content-end">
              <img src={`${assigned_icon}`} alt width="20vw" className="mr-2" />
              <p className="card-text">{delivery.assigned_by}</p>
            </div>
          </div>
        </div>
      ))}
  </div>
);

export default Delivery;
