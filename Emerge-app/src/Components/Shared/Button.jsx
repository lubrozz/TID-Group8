import "../../App.css";
import "../../styles/LoginPage.css";

export default function Button({
  onClick,
  styleName,
  buttonText,
  buttonIcon,
  children,
  isDisabled,
}) {
  return (
    <button className={styleName} onClick={onClick} disabled={isDisabled}>
      <p className="texts">{buttonText}</p>
      {buttonIcon}
      {children}
    </button>
  );
}
