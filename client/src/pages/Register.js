import { useNavigate, Link } from "react-router-dom";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { setPassword, setEmail, setName } from "../features/auth/authSlice";

const Register = () => {
  const { name, email, password } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);
  console.log(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any necessary side effects here when email or password changes
  }, [email, password]);

  const handleRegister = () => {
    dispatch(register())
      .then((result) => {
        // if (result.payload.success) {
        //   alert("Registration successful!");
        //   navigate("/login");
        // } else {
        //   console.log("hello, I'm here!!!");
        //   alert("Registration failed: Email already exists");
        // }
        console.log("this is the result: " + result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <h1>Register</h1>
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
  );
};

export default Register;
