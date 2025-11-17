import { Link } from "react-router-dom";

export default function ExitChatButton() {
  return (
    <div className="confirmExitButton">
      <Link to={"/"} className="texts">
        <p>Exit and delete chat</p>
      </Link>
    </div>
  );
}
