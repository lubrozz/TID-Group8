// To be deleted. Is now in ExitModal.jsx --Lukas

import "../../chat.css";

export default function ExitWarning({ onCancel }) {
  return (
    <div>
      <div className="popup-bg">
        <div className="popup">
          <div>
            <h1 className="warningText">
              Are you sure you want to exit the chat?
            </h1>
          </div>
          <div className="actionButtons">
            <button onClick={onCancel}>Back to chat</button>
            <button>Exit chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
