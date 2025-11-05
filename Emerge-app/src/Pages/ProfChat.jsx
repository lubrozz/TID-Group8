import { useState, useEffect } from "react";
import ChatObject from "../Components/ChatObject/ChatObject";
import "../chat.css";

export default function ProfChat() {
 // State: all conversations
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Chat1",
      preview: "Hi, I’m feeling a bit sad today.",
      messages: [
        { id: 1, sender: "child", text: "Hi, I’m feeling a bit sad today." },
        { id: 2, sender: "professional", text: "Do you want to tell me why?" },
      ],
    },
    {
      id: 2,
      name: "Chat2",
      preview: "Can we talk about what happened?",
      messages: [
        { id: 1, sender: "child", text: "Can we talk about what happened?" },
        { id: 2, sender: "professional", text: "Of course, I’m listening." },
      ],
    },
  ]);

  // Track which chat is selected
  const [selectedChat, setSelectedChat] = useState(null);

  // Handle sending message
  const handleSendMessage = (chatId, newText) => {
    if (!newText.trim()) return;
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: chat.messages.length + 1,
                  sender: "professional",
                  text: newText,
                },
              ],
            }
          : chat
      )
    );
  };

  // Keep selectedChat in sync with updated chats
  useEffect(() => {
    if (selectedChat) {
      const updated = chats.find((c) => c.id === selectedChat.id);
      if (updated) setSelectedChat(updated);
    }
  }, [chats]);

  // --- Return Layout ---
  return (
    <div className="prof-layout">
      {/* LEFT COLUMN: Conversations */}
      <div className="prof-chat-list">
        <h3>Conversations</h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${
              selectedChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <strong>{chat.name}</strong>
          <p>{chat.preview}</p>
        </div>
      ))}
    </div>

      {/* MIDDLE COLUMN: ChatObject */}
      <div className="prof-chat-center">
        {selectedChat ? (
          <ChatObject
            chat={selectedChat}
            onSend={(msg) => handleSendMessage(selectedChat.id, msg)}
          />
        ) : (
          <h2>This is the proffesional chat-site. Select a chat to begin</h2>
        )}
      </div>

    </div>
  );
}
