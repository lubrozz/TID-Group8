
import MessageList from "../ChatObject/MessageList";
import MessageBubble from "../ChatObject/MessageBubble";
import TextBar from "../ChatObject/TextBar";
import "../../App.css";

export default function ChatObject({ chat, onSend }) {
  return (
    <>
      <MessageList
        messages={chat.messages}
        renderItem={(m) => <MessageBubble key={m.id} text={m.text} sender={m.sender} />}
      />
      <div className="textbar-wrap">
        <TextBar onSend={onSend} />
      </div>
    </>
  );
}