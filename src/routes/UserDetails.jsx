import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./userDetailsStyle.css";
import Modal from "../components/modal/Index";

const UserDetails = ({ setLoginPage }) => {
  setLoginPage(false);
  localStorage.setItem("path", "userDetail");

  const { id } = useParams();
  const Navigate = useNavigate();
  const { entities } = useSelector((state) => state.users);
  const user = entities.filter((user) => user.id === id);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <>
      <div className="container">
        <div className="title">
          <div className="titleUser">
            <Link to="/home/users" className="link">
              Users
            </Link>
            <span>/{id}</span>
          </div>
        </div>
        <div className="content">
          <div className="cardHeader">
            <h3 className="head">User</h3>
          </div>
          <p>Login: {user[0].name}</p>
          <div className="forFlex">
            <p>Role: {user[0].role}</p>
            <p>Status: {user[0].status}</p>
          </div>
          <p>
            Data(json): <br />
            {user[0].data}
          </p>
          <button
            className="editbtn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <Modal
        title={"Edit User"}
        user={user}
        editmode={true}
        open={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default UserDetails;
