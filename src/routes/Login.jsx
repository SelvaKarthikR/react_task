import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./loginStyles.css";

const Login = ({ setLoginPage, setAuth }) => {
  setLoginPage(true);
  localStorage.setItem("path", "login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const userData = useSelector((state) => state.users.entities);
  let test1 = userData.map((val) => val.name);
  let test2 = userData.map((val) => val.password);

  const userName = test1.includes(username);
  const userPassword = test2.includes(password);

  const Navigate = useNavigate();

  const handleClick = () => {
    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (userName && userPassword) {
      localStorage.setItem("auth", true);
      localStorage.setItem("Login", true);
      Navigate("/home/users");
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="alert" style={{ display: alert ? "flex" : "none" }}>
          <h4>Invalid Username/Password</h4>
          <FaTimes
            size={15}
            style={{ marginRight: "0.5rem" }}
            onClick={() => {
              setAlert(!alert);
            }}
          />
        </div>
        <div className="input">
          <div className="userName group">
            <label>Login</label>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span
              className="error"
              style={{ display: usernameError ? "inline" : "none" }}
            >
              Enter Username
            </span>
          </div>
          <div className="password group">
            <label>Password</label>
            <input
              type="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              className="error"
              style={{ display: passwordError ? "inline" : "none" }}
            >
              Enter Password
            </span>
          </div>
        </div>
        <button className="btn" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
