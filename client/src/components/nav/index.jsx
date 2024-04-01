import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";
import "./Nav.css";
const Nav = () => {
  const { apiCall, token, paints, setPaints } = useApi();
  if (!token) {
    return null;
  } else {
    return (
      <>
        {/* Conditionally render links */}
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/delivery">Delivery</CustomLink>
        {token.role_id === 1 && ( //if user role_id = 1
          <CustomLink to="/admin">Admin</CustomLink>
        )}
      </>
    );
  }

  function CustomLink({ to, children }) {
    const path = window.location.pathname;
    return (
      <Link
        to={to}
        className={
          path === to ? "active nav-link nav-item h5" : "nav-link nav-item h5"
        }
      >
        {children}
      </Link>
    );
  }
};

export default Nav;
