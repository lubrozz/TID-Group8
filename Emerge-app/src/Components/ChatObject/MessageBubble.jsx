// src/Components/ChatObject/MessageBubble.jsx
export default function MessageBubble({ text, sender }) {
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
          marginBottom: ".5rem",
        }}
      >
        <div style={bubbleStyle}>{text}</div>
      </div>
    );
  }
  