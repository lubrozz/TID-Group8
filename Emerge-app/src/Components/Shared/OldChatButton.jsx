import { Link } from "react-router-dom";

export default function OldChatButton() {
  return (
    <div className="oldChatButton">
      <Link to="/NewChildChat" className="texts">
        <p>Old chat</p>
        <span>&#10560;</span>
      </Link>
    </div>
  );
}
