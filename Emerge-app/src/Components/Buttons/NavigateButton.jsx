import "../../homePage.css";
import { Link } from "react-router-dom";

export default function NavigateButton({
  styleClass,
  page,
  buttonText,
  buttonIcon,
}) {
  return (
    <div className={styleClass}>
      <Link to={page} className="texts">
        <p>{buttonText}</p>
        {buttonIcon}
      </Link>
    </div>
  );
}
