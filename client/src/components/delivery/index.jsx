import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";

const Delivery = () => {
  const { apiCall, token, paints } = useApi();
  const [hasAdminRole, setHasAdminRole] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    checkRoles();
  }, []);

  const checkRoles = () => {
    const user = token;
    setHasAdminRole(user && user.role_id === 1);
  };

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <div className="p-3">
        <div className="vh-100 bg-light row">
          <div className="bg-dark col-sm-12 col-md-2 p-0">
            <Nav hasAdminRole={hasAdminRole} />
          </div>
          <div className="bg-secondary bg-gradient col-sm-12 col-md-10">
            <div className="row bg-primary">
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
          </div>
        </div>
      </div>
    );
  }
};

const DeliveryGroup = ({ title, paints }) => (
  <div className="col-md-6">
    <p className="text-center">{title}</p>
    {paints &&
      paints.map((paint) => (
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
