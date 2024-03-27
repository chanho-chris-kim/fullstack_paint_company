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
    } catch (err) {
      console.log(err);
    }
  }
  if (token) {
    return (
      <>
        <nav className="navbar p-0">
          <Link className="text-dark" to="/home">
            <img src={logo} width="50px" style={{ marginRight: "0.5rem" }} />{" "}
            Panda Paint
          </Link>
          <div className="d-flex justify-content-end">
            <div>
            <div className="d-flex">
              <p className="mr-1">Hi</p>
              <Link to="/update-profile" className="h-50 mr-2 text-dark">
                <u>{token.name ? token.name : token.email}</u>
              </Link>
            </div>
            <p
              to="/update-profile"
              className="h-50 mr-2 text-dark d-none d-md-block mb-0"
            >
              <strong>Email:</strong> {token.email}
            </p>
            </div>
            <Button
              className="btn btn-dark text-white"
              variant="link"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </Button>
          </div>
        </nav>
      </>
    );
  } else {
    return null;
  }
};

export default Navbar;
