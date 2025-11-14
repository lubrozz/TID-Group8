import Ellipsis from "../Shared/Ellipsis";
import "../../prof-chat.css";

export default function MessageBubble({ text, sender, timestamp, onEllipsisClick }) {
  const isPro = sender === "professional";

  return (
    <div
      className={`message-bubble-row ${isPro ? "sent" : "received"}`}
      style={{ width: "100%" }}
    >
      {/* Ellipsis on the left for received (child) */}
      {!isPro && <Ellipsis onClick={onEllipsisClick} />}

      {/* Message bubble */}
      <div className={`message-bubble ${isPro ? "sent" : "received"}`}>
        <p className="message-text">{text}</p>
        <span className="message-timestamp">
          {timestamp ? timestamp : "3 min ago"}
        </span>
      </div>

      {/* Ellipsis on the right for professional */}
      {isPro && <Ellipsis onClick={onEllipsisClick} />}
    </div>
  );
}
