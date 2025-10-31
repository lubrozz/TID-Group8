import "../../chat.css";
import { Plus, Smile, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function ChildTextBar() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  return (
    <>
      <div className="icons">
        <button className="plusButton">
          <Plus
            size={18}
            color="var(--dark-brown-text-color)"
            strokeWidth={2}
          />
        </button>
        <div className="emoji">
          <button
            className="emojiButton"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Smile
              size={18}
              color="var(--dark-brown-text-color)"
              strokeWidth={2}
            />
          </button>
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="sendButton">
        <Send
          size={18}
          color="var(--dark-brown-text-color)"
          style={{ transform: "rotate(0deg)" }}
        />
      </button>
    </>
  );
}
