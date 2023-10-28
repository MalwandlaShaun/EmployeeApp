import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { login } from "../features/auth/authSlice";
import { setPassword, setEmail, setAuth } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import useAuth from "../hooks/useAuth";
const Login = ({ data }) => {
  const { email, password } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);

  // const { setIsLogin } = data;
  // console.log(state);
  //const { setIsLogin } = useAuth();
  console.log("login in : ", useAuth().isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {}, [email, password]);

  const handleLogin = async () => {
    // dispatch(login());

    try {
      const response = await axios.post(
        "https://employee-app4.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const userdata = await response.data;

      console.log(userdata.data);
      if (userdata.data.user) {
        localStorage.setItem("token", userdata.token);
        // setIsLogin(true);
        navigate("/dashboard");
        //setIsLogin(true);
        alert("Login successful");
        dispatch(setAuth(true));
        console.log(state);
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      alert("Please check your username and password", error);
    }
  };

  return (
    <div className="dev-container">
      <div className="login-container">
        <img
          src={logo}
          style={({ width: "5vw" }, { height: "5vw" })}
          alt="company logo"
        />
        <h1 style={{ margin: "2vh" }}>Login</h1>

        <input
          type="email"
          placeholder="email"
          className="input-field"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button className="login-button" onClick={() => handleLogin()}>
          Login
        </button>

        <p>
          Don't have an account sign up <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
