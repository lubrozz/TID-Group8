// Components/Chat/ChatLayout.jsx
import "../../styles/chat.css";
export default function ChatLayout({ left, right }) {
  return (
    <div className="chat-app">
      <div className="chat-layout">
        {left}
        {right}
      </div>
    </div>
  );
}