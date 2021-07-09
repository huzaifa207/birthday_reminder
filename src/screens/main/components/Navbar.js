import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const NavbarComponent = ({ setError }) => {
  const history = useHistory();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      history.push("/login");
    } catch {
      setError("There is a problem in signing out.\nPlease, Try again Later");
    }
  };

  return (
    <Navbar bg="light" expand="sm" className="px-3">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        Birthday Reminder
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
