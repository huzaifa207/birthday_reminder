import React, { useState } from "react";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const [error, setError] = useState("");

  return (
    <>
      <Navbar setError={setError} />
      <div className="container d-flex justify-content-center mt-4">
        <AddRecord />
      </div>
    </>
  );
};

export default Dashboard;
