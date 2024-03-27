import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Nav = () => {
  const { apiCall, token, paints, setPaints } = useApi();

  if (!token) {
    return null;
  } else {
    return (
      <>
        <ul className="nav d-flex justify-content-between">
          {/* Conditionally render links */}
          <CustomLink to="/home" className="nav-link nav-item text-white">
            Home
          </CustomLink>
          <CustomLink to="/delivery" className="nav-link nav-item text-white">
            Delivery
          </CustomLink>
          {token.role_id === 1 && ( //if user role_id = 1
            <CustomLink to="/admin" className="nav-link nav-item text-white">
              Admin
            </CustomLink>
          )}
        </ul>
      </>
    );
  }

  function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname;

    return (
      <li className={path === to ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }
};

export default Nav;
