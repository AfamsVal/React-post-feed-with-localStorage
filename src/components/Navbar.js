import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md  bg-info navbar-dark">
      <Link className="navbar-brand" to="/">
        LAFFOUT
      </Link>
      <button
        className="navbar-toggler text-white"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              <i className="fas fa fa-home"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="contact">
              <i className="fas fa fa-phone-square"></i> Contact Us
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">
              <i className="fas fa fa-pencil-square-o"></i> Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              <i className="fas fa fa-lock"></i> login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
