import React, { useState, useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";
import "./ModalDeliveryUpdate.css";
import { Form, Button, Alert } from "react-bootstrap";

const ModalDeliveryUpdate = ({
  showUpdateModal,
  setShowUpdateModal,
  orderData,
  setOrderData,
}) => {
  const {
    delivery_address,
    delivery_colour_id,
    status,
    quantity,
    delivery_order_created_at,
    delivered_at,
    delivery_id,
  } = orderData;
  const { apiCall, token, deliveries, setDeliveries } = useApi();
  const [address, setAddress] = useState("");
  const [colourId, setColourId] = useState("");
  const [statusData, setStatusData] = useState("");
  const [quantityData, setQuantityData] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deliveredAt, setDeliveredAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user_id = token.user_id;

  useEffect(() => {
    setAddress(delivery_address);
    setColourId(delivery_colour_id);
    setStatusData(status);
    setQuantityData(quantity);
    setCreatedAt(delivery_order_created_at.slice(0, 10));
    setDeliveredAt(delivered_at.slice(0, 10));
  }, [orderData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      const updatedData = {
        delivery_address: address,
        delivery_colour_id: colourId,
        status: statusData,
        assigned_by_id: user_id,
        quantity: quantityData,
        delivery_order_created_at: createdAt,
        delivered_at: deliveredAt,
      };
      console.log(updatedData);
      await apiCall.doUpdateDelivery(delivery_id, updatedData);
      setAddress("");
      setColourId("");
      setStatusData("");
      setQuantityData("");
      setCreatedAt("");
      setDeliveredAt("");
      setOrderData("");
      const updatedDeliveries = await apiCall.getDeliveries();
      setDeliveries(updatedDeliveries);
      setShowUpdateModal(false);
    } catch {
      setErrorMessage("Failed create new delivery order");
    }
    setLoading(false);
  };

  if (!showUpdateModal) {
    return null;
  } else {
    return (
      <>
        <div
          className="modal-delivery d-flex justify-content-center align-items-center"
          onClick={() => {
            setShowUpdateModal(false);
            setAddress("");
            setColourId("");
            setStatusData("");
            setQuantityData("");
            setCreatedAt("");
            setDeliveredAt("");
            setOrderData("");
          }}
        >
          <div
            className="modal-delivery-div"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Order</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setAddress("");
                    setColourId("");
                    setStatusData("");
                    setQuantityData("");
                    setCreatedAt("");
                    setDeliveredAt("");
                    setOrderData("");
                  }}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="colourId" className="mb-2">
                    <Form.Label>Colour</Form.Label>
                    <Form.Select
                      className="w-100 border-color"
                      aria-label="Select paint colour"
                      value={colourId}
                      onChange={(e) => setColourId(e.target.value)}
                      required
                    >
                      <option value="">select paint colour...</option>
                      <option value="1">Blue</option>
                      <option value="2">Grey</option>
                      <option value="3">Black</option>
                      <option value="4">White</option>
                      <option value="5">Purple</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="address" className="mb-2">
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

                  <Form.Group controlId="status" className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      className="w-100 border-color"
                      aria-label="Select status"
                      value={statusData}
                      onChange={(e) => setStatusData(e.target.value)}
                      required
                    >
                      <option value="">select status...</option>
                      <option value="0">Ready to Pick Up</option>
                      <option value="1">Picked Up</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="quantity" className="mb-2">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={quantityData}
                      onChange={(e) => {
                        setQuantityData(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="createdAt" className="mb-2">
                    <Form.Label>Created At</Form.Label>
                    <Form.Control
                      type="date"
                      value={createdAt}
                      onChange={(e) => {
                        setCreatedAt(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="deliveredAt">
                    <Form.Label>Delivered At</Form.Label>
                    <Form.Control
                      type="date"
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
                      {loading ? "Updating the order..." : "Update"}
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

export default ModalDeliveryUpdate;
