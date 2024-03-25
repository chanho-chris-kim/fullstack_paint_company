import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Nav = ({
  hasAdminRole,
  hasPainterRole,
  hasManagerRole,
  hasSupervisorRole,
}) => {
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

  return (
    <>
      <ul className="nav flex-column">
        {/* Conditionally render links */}
        <CustomLink to="/home" className="nav-link nav-item">
          Home
        </CustomLink>
        {hasPainterRole ? (
          <></> // only display if user role_id = 2 is false
        ) : (
          <CustomLink to="/delivery" className="nav-link nav-item">
            Delivery
          </CustomLink>
        )}
        {hasAdminRole && ( //if user role_id = 1
          <CustomLink to="/admin" className="nav-link nav-item">
            Admin
          </CustomLink>
        )}
      </ul>
    </>
  );
};

export default Nav;
