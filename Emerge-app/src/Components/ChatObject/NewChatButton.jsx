// src/Components/NewChatButton.jsx
import "../App.css";

export default function NewChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full font-medium transition"
      style={{
        backgroundColor: "var(--blue-green-color)",
        color: "white",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      New Chat
    </button>
  );
}
