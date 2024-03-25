import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";
import Navbar from "../navbar";

const Home = () => {
  const { apiCall, token, setToken, paints, setPaints } = useApi();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAdminRole, setHasAdminRole] = useState(false); 
  const [hasPainterRole, setHasPainterRole] = useState(false); 
  const [hasManagerRole, setHasManagerRole] = useState(false); 
  const [hasSupervisorRole, setHasSupervisorRole] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of the token
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/login");
    }
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
    // Assuming you have access to the user object containing role information
    const user = token; // Get the current user object from your authentication context

    // Check user roles and set state variables accordingly
    setHasAdminRole(user && user.role_id === 1);
    setHasPainterRole(user && user.role_id === 2);
    setHasManagerRole(user && user.role_id === 3);
    setHasSupervisorRole(user && user.role_id === 4);
  };

  async function handleLogout() {
    setErrorMessage("");

    try {
      await apiCall.doLogout();
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    } catch {
      setErrorMessage("Failed to log out");
    }
  }
  if (!token) {
    return navigate("/login");
  }
  console.log(paints)
  return (
    <div className="p-3">
      <Navbar handleLogout={handleLogout} />
      <div className="vh-100 bg-light row">
        <div className="bg-dark col-sm-12 col-md-2 p-0">
        <Nav 
            hasAdminRole={hasAdminRole}
            hasPainterRole={hasPainterRole}
            hasManagerRole={hasManagerRole}
            hasSupervisorRole={hasSupervisorRole}
          />
        </div>
        <div className="bg-grey bg-gradient col-sm-12 col-md-10">
          <div className="row bg-primary">
            {paints && (
              <>
                <PaintGroup title="Available" paints={paints.categorizedPaints.a} />
                <PaintGroup title="Running Low" paints={paints.categorizedPaints.b} />
                <PaintGroup title="Out of Stock" paints={paints.categorizedPaints.c} />
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
};

const PaintGroup = ({ title, paints }) => (
  <div className="col-md-3">
    <p className="text-center">{title}</p>
      {paints && paints.map(paint => (
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
