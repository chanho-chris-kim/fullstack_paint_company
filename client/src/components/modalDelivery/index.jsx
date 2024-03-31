import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import "./ModalDelivery.css";
import { Form, Button, Alert } from "react-bootstrap";

const ModalDelivery = ({ showModal, setShowModal }) => {
  const { apiCall, token, paints, setPaints, deliveries, setDeliveries } =
    useApi();
  const [address, setAddress] = useState("");
  const [colourId, setColourId] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deliveredAt, setDeliveredAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = token.user_id;
  // {
  //   "delivery_address": "vancouver",
  //   "delivery_colour_id": 5,
  //   "status": 0,
  //   "assigned_by_id": 1,
  //   "quantity": 555,
  //   "delivery_order_created_at": "2024-02-23",
  //   "delivered_at": "2023-05-29"
  // }
  // console.log(token.user_id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      await apiCall.doAddDelivery(
        address,
        colourId,
        status,
        user_id,
        quantity,
        createdAt,
        deliveredAt
      );
      setDeliveries(deliveries);
      setShowModal(false);
    } catch {
      setErrorMessage("Failed create new delivery order");
    }
    setLoading(false);
  };

  if (!showModal) {
    return null;
  } else {
    return (
      <>
        <div
          className="modal-delivery d-flex justify-content-center align-items-center"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="modal-delivery-div"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Delivery</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="colourId">
                    <Form.Label>Colour</Form.Label>
                    <Form.Control
                      type="colourId"
                      value={colourId}
                      onChange={(e) => {
                        setColourId(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="status"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="quantity"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="createdAt">
                    <Form.Label>Created At</Form.Label>
                    <Form.Control
                      type="createdAt"
                      value={createdAt}
                      onChange={(e) => {
                        setCreatedAt(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="deliveredAt">
                    <Form.Label>Delivered At</Form.Label>
                    <Form.Control
                      type="deliveredAt"
                      value={deliveredAt}
                      onChange={(e) => {
                        setDeliveredAt(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end pt-4">
                    <Button
                      disabled={loading}
                      className="btn btn-dark"
                      style={{ width: "13vw" }}
                      type="submit"
                    >
                      {loading ? "Adding the order..." : "Add"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ModalDelivery;
