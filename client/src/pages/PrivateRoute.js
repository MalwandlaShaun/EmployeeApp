import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ data }) => {
  const { Dashboard } = data;
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>{isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}</>
  );
};

export default PrivateRoute;
