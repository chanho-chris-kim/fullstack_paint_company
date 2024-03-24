import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useApi } from "../../../contexts/ApiContext";

const Login = () => {
  const { apiCall, token } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      await apiCall.doSignIn(email, password);
      navigate("/home");
    } catch {
      setErrorMessage("Failed to log in");
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
            <div className="w-full h-screen flex flex-col">
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Log In</h2>
                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}
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
                    <Button disabled={loading} className="w-100" type="submit">
                      {loading ? "Logging In..." : "Log In"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <div className="w-100 text-center mt-2">
                <p>
                  Need an account? <Link to="/singup">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return navigate("/home");
  }
};

export default Login;
