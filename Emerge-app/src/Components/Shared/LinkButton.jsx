import "../../styles/homePage.css";
import "../../styles/child-chat.css";
import { Link } from "react-router-dom";

export default function LinkButton({
  styleName,
  page,
  buttonText,
  buttonIcon,
  onClick,
}) {
  return (
    <button onClick={onClick} className={styleName}>
      <Link to={page} className="texts">
        <p>{buttonText}</p>
        {buttonIcon}
      </Link>
    </button>
  );
}
