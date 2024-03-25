import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import logo from "../../img/panda-bear.png";
const Navbar = ({ handleLogout }) => {
  const { token, setToken } = useApi();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/home">
          <img src={logo} width="50px" style={{ marginRight: "0.5rem" }} /> Panda
          Paint
        </Link>

        <ul>
          <Link to="/update-profile" className="btn btn-link h-50">
            <strong>Email:</strong> {token.email}
          </Link>
          <Button
            className="btn btn-primary text-white"
            variant="link"
            onClick={() => {
              handleLogout().then(() => {
                navigate("/login");
              });
            }}
          >
            Log Out
          </Button>
        </ul>
      </nav>
      <p className="d-flex justify-content-end mr-3">
        Hello {token.name ? token.name : token.email}, you are now logged in.
      </p>
    </>
  );
};

export default Navbar;
