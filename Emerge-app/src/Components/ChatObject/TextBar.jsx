import { useState } from "react";
import { Plus, Smile, Send } from "lucide-react";
import "../../App.css";

// The TextBar component represents the message input area
// at the bottom of the chat window. It collects user input
// and sends it via the `onSend` callback.
export default function TextBar({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="textbar">
      {/* --- Left icons: Plus + Smile --- */}
      <div className="textbar-icons">
        <button className="icon-btn">
          <Plus size={18} color="var(--dark-brown-text-color)" strokeWidth={2} />
        </button>
        <button className="icon-btn">
          <Smile size={18} color="var(--dark-brown-text-color)" strokeWidth={2} />
        </button>
      </div>

      {/* --- Input field --- */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textbar-input"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* --- Send icon --- */}
      <button onClick={handleSend} className="icon-btn send-btn">
        <Send
          size={18}
          color="var(--dark-brown-text-color)"
          strokeWidth={2}
          style={{ transform: "rotate(0deg)" }}
        />
      </button>
    </div>
  );
}



