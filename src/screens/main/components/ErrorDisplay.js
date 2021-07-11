import React from "react";
import { Alert } from "react-bootstrap";

const ErrorDisplay = ({ error }) => {
  return <>{error && <Alert variant="danger">{error}</Alert>}</>;
};

export default ErrorDisplay;
