import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./components/App";
import Register from "./pages/Register";
//import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  // const { email, password } = useSelector((state) => state.auth);
  //const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute data={{ Dashboard }} />}
        />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
