import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useApi } from "../../../contexts/ApiContext";

const SingUp = () => {
  const navigate = useNavigate();
  const { apiCall, token } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   // Check if the user is logged in by verifying the presence of the token
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // Redirect to login page if token is not present
  //     navigate('/home');
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    try {
      setErrorMessage("");
      setLoading(true);
      await apiCall.doSignUp(email, password);
      navigate("/login");
    } catch {
      setErrorMessage("Failed to create an account");
    }

    setLoading(false);
  };

  if (!token) {
    return (
      <>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="w-full h-screen flex flex-col"></div>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Create a New Account</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default SingUp;
