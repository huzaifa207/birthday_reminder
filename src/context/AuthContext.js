import React, { createContext, useContext, useState, useEffect } from "react";

import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  let signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  let login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  let logout = () => {
    return auth.signOut();
  };

  let resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  let updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
