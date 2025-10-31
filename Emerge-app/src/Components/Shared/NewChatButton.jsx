import "../../homePage.css";
import { Link } from "react-router-dom";

export default function NewChatButton() {
  return (
    <div className="newChatButton">
      <Link to="/NewChildChat" className="texts">
        <p>New chat</p>
        <span>&#10140;</span>
      </Link>
    </div>
  );
}
