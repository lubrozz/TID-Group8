import Ellipsis from "../Shared/Ellipsis";


export default function MessageBubble({ text, sender, onEllipsisClick }) {
  const isPro = sender === "professional";

  const bubbleStyle = {
    background: isPro ? "var(--blue-green-color)" : "var(--sand-color)",
    color: isPro ? "white" : "var(--dark-brown-text-color)",
    padding: ".5rem .75rem",
    borderRadius: "16px",
    maxWidth: "70%",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isPro ? "flex-end" : "flex-start",
        alignItems: "center",
        marginBottom: ".5rem",
        gap: "3px", 
      }}
    >
      {/* If it is kid user，Ellipsis will be on the right */}
      {!isPro && <Ellipsis onClick={onEllipsisClick} />}

      <div style={bubbleStyle}>{text}</div>

      {/* If it is professional user，Ellipsis will be on the left */}
      {isPro && <Ellipsis onClick={onEllipsisClick} />}
    </div>
  );
}