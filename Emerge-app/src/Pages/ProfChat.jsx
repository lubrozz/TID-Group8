import { useState, useEffect } from "react";
import ChatLayout from "../Components/ChatObject/ChatLayout";
import "../App.css";

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "var(--light-sand-color)",
        color: "var(--dark-brown-text-color)",
        padding: "2rem",
      }}
    >
      <div
        className="flex rounded-xl shadow-lg overflow-hidden"
        style={{
          width: "90%",
          maxWidth: "1000px",
          height: "80vh",
          backgroundColor: "var(--white-bg-color)",
          border: "2px solid var(--sand-color)",
        }}
      >
        {/* Reuse your ChatLayout component */}
        <ChatLayout
          conversations={chats}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onSend={(msg) => handleSendMessage(selectedChat?.id, msg)}
        />
      </div>
    </div>
  );
}
