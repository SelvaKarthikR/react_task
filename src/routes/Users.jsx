import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/Index";
import Table from "../components/table/Table";
import "./userStyle.css";

const Users = ({ setLoginPage }) => {
  setLoginPage(false);
  localStorage.setItem("path", "users");
  const [openModal, setOpenModal] = useState(false);

  const { entities } = useSelector((state) => state.users);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <>
      <div className="container">
        <Table users={entities} />
        <div className="footer">
          <button
            className="add-btn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add Newuser
          </button>
        </div>
      </div>
      <Modal
        open={openModal}
        editmode={false}
        title={"Create Newuser"}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Users;
