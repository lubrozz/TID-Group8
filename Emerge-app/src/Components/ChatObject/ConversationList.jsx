// Components/Chat/ConversationList.jsx
export default function ConversationList({ title="Conversations", items, selectedId, onSelect }) {
    return (
      <aside className="chat-sidebar">
        <div className="chat-sidebar__title">{title}</div>
        <div className="chat-list">
          {items.map((chat) => (
            <div
              key={chat.id}
              className={`chat-list-item ${selectedId === chat.id ? "active" : ""}`}
              onClick={() => onSelect(chat)}
              style={{ padding: "1rem", borderBottom: "1px solid var(--sand-color)", cursor: "pointer" }}
            >
              <strong>{chat.name}</strong>
              <p style={{ fontSize: ".9rem", marginTop: ".25rem", color: "var(--dark-brown-text-color)" }}>
                {chat.preview || "—"}
              </p>
            </div>
          ))}
        </div>
      </aside>
    );
  }