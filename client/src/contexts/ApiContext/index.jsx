import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const ApiContext = createContext();

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};

// Provider component to wrap your app and provide the API context
export const ApiProvider = ({ children }) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [token, setToken] = useState(null);
  const [paints, setPaints] = useState(null);
  const [deliveries, setDeliveries] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of the token
    const storedToken = JSON.parse(localStorage.getItem("token"));
    if (storedToken) {
      setToken(storedToken);
    }
  }, [navigate]);

  const apiCall = {
    // USERS
    async getUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch paints");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching paints:", error.message);
        throw error;
      }
    },

    async doSignUp(email, user_pw, name, address, phone, role_id) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            user_pw,
            name,
            address,
            phone,
            role_id,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to sign up");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async doSignIn(email, user_pw) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, user_pw }),
        });
        const data = await response.json();
        const tokenValue = JSON.stringify({
          user_id: data.user.user_id,
          name: data.user.name,
          email: data.user.email,
          address: data.user.address,
          phone: data.user.phone,
          created_at: data.user.created_at,
          role_id: data.user.role_id,
        });
        if (!response.ok) {
          throw new Error(data.error || "Failed to log in");
        }
        localStorage.setItem("token", tokenValue);
        setToken(tokenValue);
        console.log(token);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async doLogout() {
      try {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      } catch (error) {
        throw new Error("Failed to log out");
      }
    },

    // PAINTS
    async getPaints() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/paints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch paints");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching paints:", error.message);
        throw error;
      }
    },

    // DELIVERIES
    async getDeliveries() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/deliveries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch paints");
        }
        const data = await response.json();
        setDeliveries(data);
        return data;
      } catch (error) {
        console.error("Error fetching paints:", error.message);
        throw error;
      }
    },

    async doAddDelivery(
      delivery_address,
      delivery_colour_id,
      status,
      assigned_by_id,
      quantity,
      delivery_order_created_at,
      delivered_at
    ) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/deliveries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            delivery_address,
            delivery_colour_id,
            status,
            assigned_by_id,
            quantity,
            delivery_order_created_at,
            delivered_at,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to create delivery");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async doUpdateDelivery(deliveryId, updatedData) {
      console.log(JSON.stringify(updatedData));
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/deliveries/${deliveryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to update delivery");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async doDeleteDelivery(deliveryId) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/deliveries/${deliveryId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete delivery");
        }
        return true; // Indicate successful deletion
      } catch (error) {
        console.error("Error deleting delivery:", error.message);
        throw error;
      }
    },
  };

  const value = {
    apiCall,
    token,
    setToken,
    paints,
    setPaints,
    deliveries,
    setDeliveries,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
