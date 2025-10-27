
import MessageList from "../ChatObject/MessageList";
import MessageBubble from "../ChatObject/MessageBubble";
import TextBar from "../ChatObject/TextBar";
import "../../App.css";

export default function ChatObject({ chat, onSend }) {
  return (
    <div className="chat-object-container">
    {/* 2️⃣ Message area grows to fill space */}
    <div className="chat-messages">
      <MessageList
        messages={chat.messages}
        renderItem={(m) => (
          <MessageBubble key={m.id} text={m.text} sender={m.sender} />
        )}
      />
    </div>
 
          {/* 3️⃣ Input bar stays fixed at bottom */}
          <div className="textbar-wrap">
        <TextBar onSend={onSend} />
      </div>
    </div>
  );
}