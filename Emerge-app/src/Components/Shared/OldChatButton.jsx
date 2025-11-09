// To be deleted. Now using NavigateButton.jsx --Lukas
import { Link } from "react-router-dom";

export default function OldChatButton() {
  return (
    <div className="oldChatButton">
      <Link to="/new-child-chat" className="texts">
        <p>Old chat</p>
        <span>&#10560;</span>
      </Link>
    </div>
  );
}
