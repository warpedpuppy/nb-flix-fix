import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";

export function Menubar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" to="/" as={Link}>
          NixFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="resposive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link to="/" as={Link}>
              Home
            </Nav.Link>

            {user && (
              <>
                <Nav.Link to={`/users/${user.Username}`}>Profile</Nav.Link>

                <Nav.Link to="/directors" as={Link}>
                  Directors
                </Nav.Link>

                <Nav.Link onClick={onLoggedOut} as={Link}>
                  Logout
                </Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link to="/" as={Link}>
                  Sign-in
                </Nav.Link>
                <Nav.Link to="/register" as={Link}>
                  Sign-up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
