import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/table/Table";
import Modal from "../components/modal/Index";
import { networkUpdated, networkModalHandler } from "../slice/NetworkSlice";
import "./networkStyle.css";

const Networks = ({ setLoginPage }) => {
  setLoginPage(false);
  localStorage.setItem("path", "networks");
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [networkId, setNetworkId] = useState("");
  const { datas } = useSelector((state) => state.networks);
  const isEditModal = useSelector((state) => state.networks.networkModal);
  const [editTitle, setEditTile] = useState(false);
  // const networkData = networkId && datas.filter((i) => i.id === networkId);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (editTitle && networkData.length === 1) {
  //       setNetwork(networkData[0].network);
  //       setDiscription(networkData[0].discription);
  //     }
  //   }, [0]);
  // }, [editTitle, networkData]);
  const [index, setIndex] = useState("");
  const [id, setId] = useState("");
  const myValue = isEditModal ? datas[index].network : "";
  const [network, setNetwork] = useState(myValue);
  const [discription, setDiscription] = useState("");

  const myDiscription = isEditModal ? datas[index].discription : "";
  useEffect(() => {
    setNetwork(myValue);
    setDiscription(myDiscription);
  }, [isEditModal]);

  const Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      Navigate("/");
    }
  }, [Navigate]);

  const handleEditNetwork = () => {
    dispatch(
      networkUpdated({
        id,
        network: network,
        discription: discription,
      })
    );
  };

  return (
    <>
      <div className="networkContainer">
        <Table
          networks={datas}
          setOpenModal={setOpenModal}
          setNetworkId={setNetworkId}
          setEditTile={setEditTile}
          network={network}
          discription={discription}
          setIndex={setIndex}
          setId={setId}
        />
        <div className="networkFooter">
          <button
            className="network-add-btn"
            onClick={() => {
              setOpenModal(true);
              setEditTile(false);
              dispatch(networkModalHandler(false));
            }}
          >
            Create New Network
          </button>
        </div>
      </div>
      <Modal
        open={openModal}
        editmode={false}
        title={editTitle ? "Edit Network" : "Create New Network"}
        setOpenModal={setOpenModal}
        networkId={networkId}
        network={network}
        discription={discription}
        setNetwork={setNetwork}
        setDiscription={setDiscription}
        setEditTile={setEditTile}
        editTitle={editTitle}
        isEditModal={isEditModal}
        handleEditNetwork={handleEditNetwork}
      />
    </>
  );
};

export default Networks;
