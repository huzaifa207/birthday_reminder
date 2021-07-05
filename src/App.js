import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";

import Profile from "./screens/profile/Profile";
import UpdateProfile from "./screens/profile/UpdateProfile";

import Signup from "./screens/authentication/Signup";
import Login from "./screens/authentication/Login";
import ForgotPassword from "./screens/authentication/ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Profile Screens */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Authentication Screens */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
