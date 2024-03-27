import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Admin = () => {
  const { apiCall, token, paints } = useApi();
  const [users, setUsers] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    let isCancelled = false;
    const fetchData = async () => {
      const data = await apiCall.getUsers();
      if (!isCancelled) {
        setUsers(data);
      }
    };
    if (!isCancelled) {
      fetchData();
    }
    // cleanup
    return () => {
      isCancelled = true;
    };
  }, []);

  if (!token) {
    return navigate("/login");
  } else {
    return (
      <>
        <div className="w-100 bg-dark py-2">
          <h3 className="text-center text-white mb-0">Admin</h3>
        </div>
        {/* mobile size */}
        {users &&
          users.users.map((user) => (
            <table
              key={user.user_id}
              className="table d-lg-none mw-100 mb-2 border-bottom"
            >
              <tbody>
                <tr className="bg-secondary">
                  <th scope="row">Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th scope="row">Role</th>
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <th scope="row">Started</th>
                  <td>
                    {new Date(user.created_at).toISOString().split("T")[0]}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        {/* tablet and up size */}
        <table class="table table-striped d-none d-lg-table">
          <thead class="bg-secondary">
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
            {users &&
              users.users.map((user) => (
                <tr key={user.user_id}>
                  <th scope="row">{user.name}</th>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    {new Date(user.created_at).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Admin;
