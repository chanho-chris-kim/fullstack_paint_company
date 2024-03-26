import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";

const Home = () => {
  const { apiCall, token, paints, setPaints } = useApi();
  const [hasAdminRole, setHasAdminRole] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCall.getPaints();
        setPaints(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token, navigate, setPaints]);

  useEffect(() => {
    if (paints) {
      checkRoles();
    }
  }, [paints]);

  const checkRoles = () => {
    const user = token;
    // Check user roles and set state variables accordingly
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
                  <PaintGroup
                    title="Available"
                    paints={paints.categorizedPaints.a}
                  />
                  <PaintGroup
                    title="Running Low"
                    paints={paints.categorizedPaints.b}
                  />
                  <PaintGroup
                    title="Out of Stock"
                    paints={paints.categorizedPaints.c}
                  />
                </>
              )}
              <div className="col-md-3">
                <p className="text-center">In Order</p>
                <div className="card mb-1 border-danger">
                  <div className="card-body">
                    <h5 className="card-title">Purple@@</h5>
                    <p className="card-text">5@@ available</p>
                  </div>
                </div>
                <div className="card mb-1 border-danger">
                  <div className="card-body">
                    <h5 className="card-title">Purple@@</h5>
                    <p className="card-text">5@@ available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const PaintGroup = ({ title, paints }) => (
  <div className="col-md-3">
    <p className="text-center">{title}</p>
    {paints &&
      paints.map((paint) => (
        <div key={paint.id} className="card mb-1 border-danger">
          <div className="card-body">
            <h5 className="card-title">{paint.paint_colour}</h5>
            <p className="card-text">{`${paint.paint_quantity} remains`}</p>
          </div>
        </div>
      ))}
  </div>
);

export default Home;
