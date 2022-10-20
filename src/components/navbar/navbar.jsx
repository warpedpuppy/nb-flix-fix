import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

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
        <Navbar.Brand className="navbar-logo" href="/">
          NixFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="resposive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth()} <Nav.Link href="/">Movies</Nav.Link>
            {isAuth()} <Nav.Link href="/directors">Directors</Nav.Link>
            {isAuth()} <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
            {isAuth()}{" "}
            <Button variant="link" onClick={onLoggedOut}>
              Logout
            </Button>
            {!isAuth() && <Nav.Link href="/"> Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register"> Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
