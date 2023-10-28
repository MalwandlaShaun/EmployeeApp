import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ data }) => {
  const { Dashboard } = data;
  const [loggedIn, setLoggedIn] = useState(false);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  //const { isLogin } = useAuth();
  // console.log("isLogin", isLogin);
  // useEffect(() => {
  //   setLoggedIn(isLogin);
  // }, [setLoggedIn, loggedIn, isLogin]);

  const token = localStorage.getItem("token");

  console.log("reached here private route ");
  return <>{token ? <Dashboard /> : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
