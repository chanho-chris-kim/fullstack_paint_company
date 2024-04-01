import React, { useState, useEffect } from "react";
import ModalDelivery from "../modalDelivery";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import paint_icon from "../../img/varnish.png";
import quantity_icon from "../../img/boxes.png";
import assigned_icon from "../../img/assignment.png";
import add_icon from "../../img/add.png";
import "./Delivery.css";

const Delivery = () => {
  const { apiCall, token, paints, setPaints, deliveries, setDeliveries } =
    useApi();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await apiCall.getDeliveries();
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
        <ModalDelivery showModal={showModal} setShowModal={setShowModal} />
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Delivery</h3>
        </div>
        <div className="row bg-light mr-lg-1 vh-100 mx-xs-1 mx-sm-1 pt-3">
          {deliveries ? (
            <>
              <DeliveryGroup
                title="Ready to Pick Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status === 0
                )}
                setShowModal={setShowModal}
              />
              <DeliveryGroup
                title="Picked Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status !== 0
                )}
                lastColumn
              />
            </>
          ) : (
            <h2>Loading ...</h2>
          )}
        </div>
      </>
    );
  }
};

const DeliveryGroup = ({ title, deliveries, lastColumn, setShowModal }) => (
  <div className={`col-md-6  ${lastColumn ? "" : "border-right"} px-1`}>
    <div className="column">
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
                  <img
                    src={`${paint_icon}`}
                    alt
                    width="20vw"
                    className="mr-2"
                  />
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
              <div className="d-flex mt-3">
                <p className="card-text mb-0 mr-2">order created on: </p>
                <p className="card-text mb-0">
                  {delivery.delivery_order_created_at.slice(0, 10)}
                </p>
              </div>

              <div className="d-flex">
                <p className="card-text mb-0 mr-2">order picked up on: </p>
                {delivery.delivered_at && (
                  <p className="card-text mb-0">
                    {delivery.delivered_at.slice(0, 10)}
                  </p>
                )}
              </div>
              <div className="d-flex mt-2 justify-content-end">
                <img
                  src={`${assigned_icon}`}
                  alt
                  width="20vw"
                  className="mr-2"
                />
                <p className="card-text">{delivery.assigned_by}</p>
              </div>
            </div>
          </div>
        ))}
    </div>

    {!lastColumn ? (
      <div className="d-flex p-2 bg-light pt-4">
        <button
          type="button"
          className="btn btn-outline-dark d-flex align-items-center w-100 justify-content-center"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <img
            src={add_icon}
            alt=""
            width="20rem"
            height="20rem"
            className="mr-2 icon"
          />
          <h4 className="mb-0">add new</h4>
        </button>
      </div>
    ) : null}
  </div>
);

export default Delivery;
