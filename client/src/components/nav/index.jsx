import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

const Nav = () => {
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
      <ul class="nav flex-column">
        <CustomLink to="/home" className="nav-link nav-item">
          Home
        </CustomLink>
        <CustomLink to="/delivery" className="nav-link nav-item">
          Delivery
        </CustomLink>
        <CustomLink to="/admin" className="nav-link nav-item">
          Admin
        </CustomLink>
      </ul>
    </>
  );
};

export default Nav;
