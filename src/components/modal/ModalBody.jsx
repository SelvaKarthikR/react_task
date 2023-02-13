import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { networkAdded, networkModalHandler } from "../../slice/NetworkSlice";
import { userAdded, userUpdated } from "../../slice/UserSlice";
import "./modalBodyStyles.css";

const ModalBody = ({
  setOpenModal,
  user,
  network,
  networkId,
  discription,
  setNetwork,
  setDiscription,
  setEditTitle,
  editTitle,
  isEditModal,
  handleEditNetwork,
}) => {
  console.log("Edit Modal", isEditModal);
  const dispatch = useDispatch();
  const path = localStorage.getItem("path");
  const [name, setName] = useState(user ? user[0].name : "");
  const [role, setRole] = useState(user ? user[0].role : "");
  const [status, setStatus] = useState(user ? user[0].status : "");
  const [password, setPassword] = useState(user ? user[0].password : "");
  const [confirmPassword, setConfirmPassword] = useState(
    user ? user[0].confirmPassword : ""
  );
  const [data, setData] = useState(user ? user[0].data : "");

  const [nameError, setNameError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState("required");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("required");

  const [networkError, setNetworkError] = useState(false);
  const [discriptionError, setDisriptionError] = useState(false);

  // const [myNetwork, setMyNetwork] = useState("");
  // const [myDiscription, setMyDiscription] = useState("");

  const handleSave = () => {
    console.log(name, "name");
    if (name === "") {
      console.log("running");
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (role === "") {
      setRoleError(true);
    } else {
      setRoleError(false);
    }
    if (status === "") {
      setStatusError(true);
    } else {
      setStatusError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
    if (data === "") {
      setDataError(true);
    } else {
      setDataError(false);
    }

    if (name && role && status && password && confirmPassword && data) {
      if (path !== "userDetail") {
        dispatch(
          userAdded({
            id: Math.floor(Math.random() * 1000000).toString(),
            name,
            role,
            status,
            password,
            confirmPassword,
            data,
          })
        );
        setOpenModal(false);
      }
      if (path === "userDetail") {
        dispatch(
          userUpdated({
            id: user && user[0].id,
            name,
            status,
            role,
            password,
            confirmPassword,
            data,
          })
        );
        setOpenModal(false);
      }
    }
  };

  const handleSaveNetwork = () => {
    if (network && discription) {
      setNetwork("");
      setDiscription("");
      dispatch(
        networkAdded({
          id: Math.floor(Math.random() * 1000000).toString(),
          network,
          discription,
        })
      );
    }
    if (network === "") {
      setNetworkError(true);
    } else {
      setNetworkError(false);
    }
    if (discription === "") {
      setDisriptionError(true);
    } else {
      setDisriptionError(false);
    }
    if (network !== "" && discription !== "") {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (data) {
      try {
        JSON.parse(data);
      } catch (e) {
        setDataError(true);
        setDataErrorMessage("enter valid json data");
        return;
      }
      setDataErrorMessage("required");
      setDataError(false);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (confirmPassword !== password) {
      setConfirmPasswordErrorMessage("password mismatching");
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordErrorMessage("required");
      setConfirmPasswordError(false);
    }
  }, [confirmPassword, password]);

  return (
    <>
      {path !== "networks" ? (
        <div>
          <div className="modalForm">
            <div className="loginfield">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                id="login"
                value={name}
                className="loginInput"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <span
                className="error"
                style={{ display: nameError ? "inline" : "none" }}
              >
                required
              </span>
            </div>
            <div className="roleField">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="" defaultValue></option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <span
                className="error"
                style={{ display: roleError ? "inline" : "none" }}
              >
                required
              </span>
            </div>
            <div className="statusfield">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                className="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="" defaultValue></option>
                <option value="Active">Active</option>
                <option value="Logout">Logout</option>
                <option value="Disabled">Disabled</option>
              </select>
              <span
                className="error"
                style={{ display: statusError ? "inline" : "none" }}
              >
                required
              </span>
            </div>
            <div className="pwdField">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                className="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span
                className="error"
                style={{ display: passwordError ? "inline" : "none" }}
              >
                required
              </span>
            </div>
            <div className="conpwdField">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                className="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <span
                className="error"
                style={{ display: confirmPasswordError ? "inline" : "none" }}
              >
                {confirmPasswordErrorMessage}
              </span>
            </div>

            <div className="dataField">
              <label htmlFor="data">Data(JSON)</label>
              <textarea
                id="data"
                value={data}
                style={{ height: "3rem" }}
                onChange={(e) => {
                  setData(e.target.value);
                }}
              ></textarea>
              <span
                className="error"
                style={{ display: dataError ? "inline" : "none" }}
              >
                {dataErrorMessage}
              </span>
            </div>
          </div>
          <div className="modalFooter">
            <button
              className="cancel-btn"
              onClick={() => {
                setOpenModal(false);
                // setEditTitle(false);
              }}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="">
            <form>
              <div className="networkfield">
                <label>Network</label>
                <input
                  type="text"
                  id="network"
                  value={network}
                  className="loginInput"
                  onChange={(e) => {
                    setNetwork(e.target.value);
                  }}
                />
                <span
                  className="error"
                  style={{ display: networkError ? "inline" : "none" }}
                >
                  Network Required
                </span>
              </div>
              <div className="discriptionfield">
                <label htmlFor="data">Discription</label>
                <textarea
                  id="data"
                  value={discription}
                  style={{ height: "3rem" }}
                  onChange={(e) => {
                    setDiscription(e.target.value);
                  }}
                ></textarea>
                <span
                  className="error"
                  style={{ display: discriptionError ? "inline" : "none" }}
                >
                  Discription Required
                </span>
              </div>
            </form>
          </div>
          <div className="modalFooter">
            <button
              className="cancel-btn"
              onClick={() => {
                setOpenModal(false);
                dispatch(networkModalHandler(false));

                // setEditTitle(false);
              }}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={() => {
                if (isEditModal) {
                  if (network && discription) {
                    handleEditNetwork();
                    setOpenModal(false);
                  }
                  if (network === "") {
                    setNetworkError(true);
                  } else {
                    setNetworkError(false);
                  }
                  if (discription === "") {
                    setDisriptionError(true);
                  } else {
                    setDisriptionError(false);
                  }
                  // if (network !== "" && discription !== "") {
                  //   setOpenModal(false);
                  // }
                } else {
                  handleSaveNetwork();
                }
                // dispatch(networkModalHandler(false));
                // setEditTitle(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBody;
