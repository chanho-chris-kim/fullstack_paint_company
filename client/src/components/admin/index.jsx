import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";
import Navbar from "../navbar";

const Admin = () => {
  const { apiCall, token, setToken, paints, setPaints } = useApi();
  const [errorMessage, setErrorMessage] = useState("");

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
  console.log(paints);

  return (
    <div className="p-3">
      <Navbar handleLogout={handleLogout} />
      <div className="vh-100 bg-light row">
        <div className="bg-dark col-sm-12 col-md-2 p-0">
          <Nav />
        </div>
        <div className="bg-secondary bg-gradient col-sm-12 col-md-10 p-0">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Role</th>
                <th scope="col">Started</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">chanho</th>
                <td>chanho8@gmail.com</td>
                <td>4391 rue de bullion</td>
                <td>6472378102</td>
                <td>admin</td>
                <td>2024-03-24</td>
              </tr>
              <tr>
                <th scope="row">chanho</th>
                <td>chanho8@gmail.com</td>
                <td>4391 rue de bullion</td>
                <td>6472378102</td>
                <td>admin</td>
                <td>2024-03-24</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
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

export default Admin;
