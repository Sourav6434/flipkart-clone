import React from "react";
import "../css/DeleteAlert.css";
const DeleteAlert = ({
  handleOnDelete,
  setOpenAlert,
  headMessage,
  bodyMessage,
}) => {
  return (
    <div className="alert-wrapper">
      <div className="alert-modal">
        <div className="alert-message">
          <p>Remove {headMessage}</p>
          <p>Are you sure you want to {bodyMessage}?</p>
        </div>
        <div className="alert-button">
          <button onClick={() => setOpenAlert(false)}>Cancel</button>
          <button onClick={() => handleOnDelete()}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
