import ModalBody from "./ModalBody";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./modalStyles.css";
import { networkModalHandler } from "../../slice/NetworkSlice";

const Modal = ({
  open,
  title,
  setOpenModal,
  user,
  networkId,
  network,
  discription,
  setNetwork,
  setDiscription,
  setEditTitle,
  editTitle,
  isEditModal,
  handleEditNetwork,
}) => {
  const path = localStorage.getItem("path");
  const dispatch = useDispatch();

  return (
    <div className="modalContainer" style={{ display: open ? "flex" : "none" }}>
      <div className="modal">
        <div className="modalHeader">
          <h3>{title}</h3>
          <FaTimes
            className="icon"
            size={20}
            onClick={() => {
              setOpenModal(false);
              // setEditTitle(false);
              dispatch(networkModalHandler(false));
            }}
          />
        </div>
        <ModalBody
          networkId={networkId}
          setOpenModal={setOpenModal}
          user={user}
          network={network}
          discription={discription}
          setNetwork={setNetwork}
          setDiscription={setDiscription}
          setEditTitle={setEditTitle}
          editTitle={editTitle}
          isEditModal={isEditModal}
          handleEditNetwork={handleEditNetwork}
        />
      </div>
    </div>
  );
};

export default Modal;
