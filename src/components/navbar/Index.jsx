import { Outlet, Link } from "react-router-dom";
import "./navbarStyles.css";

const Navbar = ({ loginPage }) => {
  return (
    <>
      <nav className="navbar">
        <div className="header">
          <h2>Aequalis</h2>
        </div>
        <div
          className="menuItem"
          style={{ display: loginPage ? "none" : "flex" }}
        >
          <div>
            <Link to="/home/users">Users</Link>
            <Link to="/home/networks">Networks</Link>
          </div>
          <div
            className="logout"
            style={{ display: loginPage ? "none" : "block" }}
          >
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("auth");
                localStorage.removeItem("Login");
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
