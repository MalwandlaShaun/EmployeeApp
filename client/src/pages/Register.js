import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { register } from "../features/auth/authSlice";
import { setPassword, setEmail, setName } from "../features/auth/authSlice";
import logo from "../assets/images/logo.png";

const Register = () => {
  const { name, email, password } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);
  console.log(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any necessary side effects here when email or password changes
  }, [email, password]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        // Make sure to use "OK" instead of "ok"
        const userData = { token: data.token, userInfo: data.data.user };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
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
        <h1 style={{ margin: "2vh" }}>Register</h1>
        <input
          type="text"
          placeholder="name"
          className="input-field"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <input
          type="text"
          placeholder="Email"
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
        <button className="login-button" onClick={() => handleRegister()}>
          Register
        </button>
        <p>
          Already have an account sign in <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
