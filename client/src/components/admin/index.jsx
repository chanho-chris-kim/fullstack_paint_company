import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import Nav from "../nav";

const Admin = () => {
  const { apiCall, token, paints } = useApi();
  const [users, setUsers] = useState("");
  const [hasAdminRole, setHasAdminRole] = useState(false);

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

  useEffect(() => {
    checkRoles();
  }, []);

  const checkRoles = () => {
    const user = token;
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
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;
