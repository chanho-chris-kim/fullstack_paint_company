import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import logo from "../../img/panda-bear.png";

const Navbar = () => {
  const { token, apiCall } = useApi();

  async function handleLogout() {
    try {
      await apiCall.doLogout();
    } catch(err) {
      console.log(err)
    }
  }
  if (token) {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/home">
            <img src={logo} width="50px" style={{ marginRight: "0.5rem" }} />{" "}
            Panda Paint
          </Link>

          <ul>
            <Link to="/update-profile" className="btn btn-link h-50">
              <strong>Email:</strong> {token.email}
            </Link>
            <Button
              className="btn btn-primary text-white"
              variant="link"
              onClick={() => {
                handleLogout();
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
  } else {
    return null;
  }
};

export default Navbar;
