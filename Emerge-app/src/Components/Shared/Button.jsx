import "../../App.css";
import "../../styles/LoginPage.css";

export default function Button({
  onClick,
  styleName,
  buttonText,
  buttonIcon,
  children,
}) {
  return (
    <button className={styleName} onClick={onClick}>
      <p className="texts">{buttonText}</p>
      {buttonIcon}
      {children}
    </button>
  );
}
