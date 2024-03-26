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
        <div className="pl-2 pl-lg-0">
          <div className="w-100 bg-dark">
            <h2 className="text-center text-white mb-0">Admin</h2>
          </div>
          <table class="table">
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
        </div>
      </>
    );
  }
};

export default Admin;
