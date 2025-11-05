import ConversationList from "../ChatObject/ConversationList";
import ChatObject from "../ChatObject/ChatObject";

export default function ChatLayout({ conversations, selectedChat, onSelectChat }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        backgroundColor: "var(--white-bg-color)",
      }}
    >
      {/* The Left Part: ConversationList */}
      <div
        style={{
          width: "320px",
          borderRight: "1px solid var(--sand-color)",
          backgroundColor: "var(--white-bg-color)",
        }}
      >
        <ConversationList
          items={conversations}
          selectedId={selectedChat?.id}
          onSelect={onSelectChat}
        />
      </div>

      {/* The Middle Part: ChatObject */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--white-bg-color)",
        }}
      >
        {selectedChat ? (
          <ChatObject chat={selectedChat} onSend={(msg) => console.log("send:", msg)} />
        ) : (
          <div style={{ textAlign: "center", marginTop: "100%", color: "gray" }}>
         
          </div>
        )}
      </div>
    </div>
  );
}