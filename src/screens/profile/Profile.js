import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import CenteredContainer from "../../components/CenteredContainer";

import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const [error, setError] = useState("");

  const history = useHistory();

  const { currentUser, logout } = useAuth();
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
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="mb-4 text-center fw-bold">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenteredContainer>
  );
};

export default Profile;
