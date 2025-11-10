import "../../chat.css";
import ExitChatButton from "./ExitChatButton";

export default function ExitWarning({ onCancel, onConfirm }) {
  return (
    <div>
      <div className="popup-bg">
        <div className="popup">
          <div className="warningText">
            <h1>Are you sure you want to exit the chat?</h1>
          </div>
          <div className="actionButtons">
            <button className="cancelExitButton" onClick={onCancel}>
              Back to chat
            </button>
            <ExitChatButton onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
