import React, { useState } from "react";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar";
import ErrorDisplay from "./components/ErrorDisplay";

const Dashboard = () => {
  const [error, setError] = useState("");

  return (
    <>
      <Navbar setError={setError} />
      <div className="container d-flex flex-column align-items-center justify-content-center mt-4">
        <ErrorDisplay error={error} />
        <AddRecord setError={setError} />
      </div>
    </>
  );
};

export default Dashboard;
