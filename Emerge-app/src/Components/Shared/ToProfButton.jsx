import { Link } from "react-router-dom";
import "../../homePage.css";

export default function ToProfButton() {
  return (
    <button className="toProfButton">
      <Link to="/ProfChat" className="linkText">
        Go to Professional Chat
      </Link>
    </button>
  );
}
