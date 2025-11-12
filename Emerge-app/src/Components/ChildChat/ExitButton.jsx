// To be deleted. Is now in ExitModal.jsx --Lukas

import "../../child-chat.css";

export default function ExitButton({ onClick }) {
  return (
    <button className="exitButton" onClick={onClick}>
      <p>Exit</p>
    </button>
  );
}
