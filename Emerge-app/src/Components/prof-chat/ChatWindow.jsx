import ChatObject from "./ChatObject.jsx";
export default function ChatWindow({ chat, onSend, onUpdateNotes }) {
  return (
    <div className="prof-chat-center">
      <ChatObject
        key={chat.id}
        chat={chat}
        onSend={(msg) => onSend(chat.id, msg)}
        onUpdateNotes={(notes) => onUpdateNotes(chat.id, notes)}
      />
    </div>
  );
}
