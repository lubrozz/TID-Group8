import { Link } from "react-router-dom";

export default function NewChatButton() {
  return (
    <Link to="/ChildChat" style={{ textDecoration: "none" }}>
      <div className="new-chat-button">
        <h4 className="arrow-label-text">New chat</h4>
        <span className="arrow-label-icon">&#10140;</span>
      </div>
    </Link>
  );
}
