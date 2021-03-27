
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const AdminNavbar = () => {

  const location = useLocation();

  var navItem = "";

  var loc = location.pathname

  console.log(loc.toString())

  if (loc === "/auth/admin/login") {
    console.log(location.pathname)
    navItem = <NavLink
      className="nav-link-icon"
      to="/auth/admin/register"
      tag={Link}
    >
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Register</span>
    </NavLink>
  }
  else if (loc === "/auth/admin/register") {
    navItem = <NavLink
      className="nav-link-icon"
      to="/auth/admin/login"
      tag={Link}
    >
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Login</span>
    </NavLink>
  }
  else if (loc === "/auth/student/login") {
    navItem = <NavLink
      className="nav-link-icon"
      to="/auth/student/register"
      tag={Link}
    >
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Register</span>
    </NavLink>
  }
  else {
    navItem = <NavLink
      className="nav-link-icon"
      to="/auth/student/login"
      tag={Link}
    >
      <i className="ni ni-circle-08" />
      <span className="nav-link-inner--text">Login</span>
    </NavLink>
  }

  console.log(navItem)

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={
                require("../../assets/img/brand/argon-react-white.png").default
              }
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/brand/argon-react.png")
                          .default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {navItem}
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/auth/admin/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
