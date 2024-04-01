import React, { useState, useEffect } from "react";
import ModalDelivery from "../modalDelivery";
import ModalDeliveryUpdate from "../modalDeliveryUpdate";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import paint_icon from "../../img/varnish.png";
import quantity_icon from "../../img/boxes.png";
import assigned_icon from "../../img/assignment.png";
import add_icon from "../../img/add.png";
import picked_up_icon from "../../img/delivery.png";
import "./Delivery.css";

const Delivery = () => {
  const { apiCall, token, paints, setPaints, deliveries, setDeliveries } =
    useApi();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [orderData, setOrderData] = useState("");

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

  const handlePickUp = async (delivery) => {
    try {
      const updatedData = {
        delivery_address: delivery.delivery_address,
        delivery_colour_id: delivery.delivery_colour_id,
        status: 1,
        assigned_by_id: delivery.assigned_by_id,
        quantity: delivery.quantity,
        delivery_order_created_at: delivery.delivery_order_created_at.slice(
          0,
          10
        ),
        delivered_at: delivery.delivered_at.slice(0, 10),
      };
      await apiCall.doUpdateDelivery(delivery.delivery_id, updatedData);
      const updatedDeliveries = await apiCall.getDeliveries();
      setDeliveries(updatedDeliveries);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiCall.doDeleteDelivery(id);
      const updatedDeliveries = deliveries.deliveries.filter(
        (delivery) => delivery.delivery_id !== id
      );
      setDeliveries({ ...deliveries, deliveries: updatedDeliveries });
    } catch (err) {
      console.log(err);
    }
  };

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <>
        <ModalDelivery showModal={showModal} setShowModal={setShowModal} />
        {orderData && (
          <ModalDeliveryUpdate
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        )}
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Delivery</h3>
        </div>
        <div className="row bg-light mr-lg-1 mx-sm-1 pt-3">
          {deliveries ? (
            <>
              <DeliveryGroup
                title="Ready to Pick Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status === 0
                )}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                setShowUpdateModal={setShowUpdateModal}
                setOrderData={setOrderData}
                handlePickUp={handlePickUp}
              />
              <DeliveryGroup
                title="Picked Up"
                deliveries={deliveries.deliveries.filter(
                  (delivery) => delivery.status !== 0
                )}
                handleDelete={handleDelete}
                setShowUpdateModal={setShowUpdateModal}
                setOrderData={setOrderData}
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

const DeliveryGroup = ({
  title,
  deliveries,
  setShowModal,
  handleDelete,
  setShowUpdateModal,
  setOrderData,
  handlePickUp,
  lastColumn,
}) => (
  <div className={`col-md-6  ${lastColumn ? "" : "border-right"} px-1`}>
    <div className="column">
      <p className="text-center">{title}</p>
      {deliveries &&
        deliveries.map((delivery) => (
          <div key={delivery.delivery_id} className="card mb-2 mx-1">
            <div
              className="card-header d-flex align-items-center"
              style={{ background: "#D3D3D3", height:"3rem"}}
            >
              <h5 className="card-title text-secondary mb-0">{`${delivery.delivery_address}`}</h5>
              {!lastColumn && (
                <img
                  src={picked_up_icon}
                  style={{width:"2rem"}}
                  className="ml-auto mr-3 picked-up-icon"
                  aria-label="picked up"
                  onClick={() => {
                    handlePickUp(delivery);
                  }}
                />
              )}
              <button
                type="button"
                className={`close ${lastColumn && "ml-auto"}`}
                aria-label="Close"
                onClick={() => {
                  handleDelete(delivery.delivery_id);
                }}
              >
                <span>&times;</span>
              </button>
            </div>
            <div
              className="card-body"
              style={{ background: "#E5E4E2" }}
              onClick={() => {
                setShowUpdateModal(true);
                setOrderData(delivery);
              }}
            >
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
