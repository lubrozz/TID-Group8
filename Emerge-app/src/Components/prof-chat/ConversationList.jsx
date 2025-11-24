export default function ConversationList({ chats, selectedChat, onSelect }) {
  return (
    <div className="prof-chat-list">
      <button onClick={() => onSelect(null)}>
        <h1>Conversations</h1>
      </button>

      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`prof-chat-list-item ${
            selectedChat?.id === chat.id ? "active" : ""
          }`}
          onClick={() =>
            onSelect(selectedChat?.id === chat.id ? null : chat)
          }
        >
          <strong>{chat.name}</strong>
          <p>{chat.preview}</p>
        </div>
      ))}
    </div>
  );
}
