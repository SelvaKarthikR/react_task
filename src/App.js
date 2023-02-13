import { useEffect } from "react";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Index";
import Login from "./routes/Login";
import Users from "./routes/Users";
import Networks from "./routes/Networks";
import UserDetails from "./routes/UserDetails";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [loginPage, setLoginPage] = useState(false);
  // const login =
  const path = localStorage.getItem("path");
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Login") && path === "login") {
      console.log("from App", true);
      Navigate("/home/users");
    }
  }, [path, Navigate]);

  // const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   if (!auth && !loginPage) {
  //     setLoginPage(true);
  //   }
  // }, [auth, loginPage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar loginPage={loginPage} />}>
          {/* <Route
            index
            element={
              auth ? (
                <Navigate to="/home/users" />
              ) : (
                <Login setLoginPage={setLoginPage} setAuth={setAuth} />
              )
            }
          /> */}
          <Route index element={<Login setLoginPage={setLoginPage} />} />
          {/* <Route
            path="/home/users"
            element={
              auth ? (
                <Users setLoginPage={setLoginPage} setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/home/users"
            element={<Users setLoginPage={setLoginPage} />}
          />
          {/* <Route
            path="/home/user/:id"
            element={
              auth ? (
                <UserDetails setLoginPage={setLoginPage} setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/home/user/:id"
            element={<UserDetails setLoginPage={setLoginPage} />}
          />
          {/* <Route
            path="/home/networks"
            element={
              auth ? (
                <Networks setLoginPage={setLoginPage} setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/home/networks"
            element={<Networks setLoginPage={setLoginPage} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
