import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Navigate, Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setErrorMessage("")

    try {
      await logout().then(() => { navigate('/login') })
    } catch {
      setErrorMessage("Failed to log out")
    }
  }

  if (currentUser) {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <p><strong>Email:</strong> {currentUser.email}</p>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={() => { handleLogout().then(() => { navigate('/login') }) }}>
            Log Out
          </Button>
        </div>
        <div className="text-2xl font-bold pt-14">
          <p>
            Hello {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            , you are now logged in.
          </p>
        </div>
      </>
    );
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

export default Home;
