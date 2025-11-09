// To be deleted. Now using NavigateButton.jsx --Lukas

import { Link } from "react-router-dom";
import "../../homePage.css";

export default function ToProfButton() {
  return (
    <button className="toProfButton">
      <Link to="/prof-chat" className="linkText">
        Go to Professional Chat
      </Link>
    </button>
  );
}
