import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthorContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoader } = useContext(AuthContext);
  const location = useLocation();
  if (isLoader) {
    return <p>Loading.......</p>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
