import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./../logo.svg";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Navbarr() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Navbar.Brand>
        <img src={logo} alt="logo_image" />
        Logo
      </Navbar.Brand>
      <Nav>
        <Button>
          <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
            Home
          </NavLink>
        </Button>
        <Button>
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to="/login"
          >
            Login
          </NavLink>
        </Button>
        <Button>
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to="/register"
          >
            Register
          </NavLink>
        </Button>
      </Nav>
    </Navbar>
  );
}
