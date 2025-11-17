import "../../styles/homePage.css";
import "../../styles/child-chat.css";
import { Link } from "react-router-dom";

export default function LinkButton({
  styleName,
  page,
  buttonText,
  buttonIcon,
}) {
  return (
    <div className={styleName}>
      <Link to={page} className="texts">
        <p>{buttonText}</p>
        {buttonIcon}
      </Link>
    </div>
  );
}
