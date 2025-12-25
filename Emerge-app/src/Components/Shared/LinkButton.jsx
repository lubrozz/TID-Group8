import "../../styles/homePage.css";
import "../../styles/child-chat.css";
import { Link } from "react-router-dom";

export default function LinkButton({
  styleName,
  isDisabled,
  page,
  buttonText,
  buttonIcon,
  onClick,
}) {
  return (
    <button onClick={onClick} className={styleName} disabled={isDisabled}>
      <Link to={page} className="texts">
        <p>{buttonText}</p>
        {buttonIcon}
      </Link>
    </button>
  );
}
