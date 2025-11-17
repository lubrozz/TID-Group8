import { Link } from "react-router-dom";
import "../../homePage.css";

export default function ToProfButton() {
  return (
    <button className="toProfLoginButton">
      <Link to="/LoginPage" className="linkText">
        Go to Proffesional Login
      </Link>
    </button>
  );
}
