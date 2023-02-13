// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./tableStyle.css";
import { userDeleted } from "../../slice/UserSlice";
import {
  networkDeleted,
  // networkUpdated,
  networkModalHandler,
} from "../../slice/NetworkSlice";

const Table = ({
  users,
  networks,
  setOpenModal,
  setNetworkId,
  setEditTile,
  // network,
  // discription,
  setIndex,
  setId,
}) => {
  const path = localStorage.getItem("path");
  const header = path === "networks" ? "Network" : "Login";
  const role = path === "networks" ? "Description" : "Role";
  const action = path === "networks" ? "Action" : "Action";
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleDeleteUser = (id) => {
    dispatch(userDeleted({ id }));
  };

  const handleDeleteNetwork = (id) => {
    dispatch(networkDeleted({ id }));
  };

  const handleDetails = (id) => {
    Navigate(`/home/user/${id}`);
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>{header}</th>
            <th>{role}</th>
            <th style={{ display: path === "networks" ? "none" : "" }}>
              Status
            </th>
            <th style={{ display: path === "networks" ? "none" : "" }}>data</th>
            <th>{action}</th>
          </tr>
        </thead>
        {path === "networks" ? (
          <tbody>
            {networks.map(({ id, network, discription }, index) => (
              <tr key={index}>
                <td>{network}</td>
                <td>{discription}</td>
                <td className="btn-container">
                  <button
                    onClick={() => {
                      setNetworkId(id);
                      setOpenModal(true);
                      setEditTile(true);
                      dispatch(networkModalHandler(true));
                      setIndex(index);
                      setId(id);
                      // networkEdithandler(id);
                    }}
                    className="details-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteNetwork(id);
                    }}
                    className="del-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.data}</td>
                <td className="btn-container">
                  <button
                    onClick={() => handleDetails(user.id)}
                    className="details-btn"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="del-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
