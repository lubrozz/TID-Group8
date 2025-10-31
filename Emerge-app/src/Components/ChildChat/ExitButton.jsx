import "../../chat.css";

export default function ExitButton({ onClick }) {
  return (
    <button className="exitButton" onClick={onClick}>
      <p>Exit</p>
    </button>
  );
}
