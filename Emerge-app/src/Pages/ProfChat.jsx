

import { useState, useEffect } from "react";
import ChatObject from "../Components/ChatObject/ChatObject.jsx";
import "../App.css";

export default function ProfChat() {
  const [selectedChat, setSelectedChat] = useState(null);

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

  const handleSendMessage = (chatId, newText) => {
    if (!newText.trim()) return;
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: chat.messages.length + 1, sender: "professional", text: newText },
              ],
            }
          : chat
      )
    );
  };
  useEffect(() => {
    if (selectedChat) {
      const updated = chats.find((c) => c.id === selectedChat.id);
      if (updated) setSelectedChat(updated);
    }
  }, [chats]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "var(--light-sand-color)",
        color: "var(--dark-brown-text-color)",
        padding: "2rem",
      }}
    >
      {/* Main centered box */}
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
        {/* --- Left column: Chat list --- */}
        <div
          style={{
            width: "30%",
            borderRight: "1px solid var(--sand-color)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--white-bg-color)",
          }}
        >
          <h3
            style={{
              padding: "1rem",
              borderBottom: "1px solid var(--sand-color)",
              color: "var(--dark-brown-color)",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Conversations
          </h3>

          <div style={{ overflowY: "auto", flex: 1 }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid var(--sand-color)",
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat?.id === chat.id
                      ? "var(--sand-color)"
                      : "transparent",
                  transition: "background 0.2s ease",
                }}
              >
                <strong>{chat.name}</strong>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.25rem",
                    color: "var(--dark-brown-text-color)",
                  }}
                >
                  {chat.preview}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Center column: Active chat --- */}
        <div
          className="flex flex-1 justify-center items-center"
          style={{
            backgroundColor: "var(--white-bg-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedChat ? (
            <div
              className="flex flex-col justify-between rounded-xl shadow-md overflow-hidden"
              style={{
                width: "40%",
                maxWidth: "700px",
                height: "90%",
                border: "1px solid var(--sand-color)",
                backgroundColor: "var(--white-bg-color)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid var(--sand-color)",
                  color: "var(--dark-brown-color)",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Chat with {selectedChat.name}
              </div>

              {/* ChatObject */}
              <ChatObject
                key={selectedChat.id}
                chat={selectedChat}
                onSend={(msg) => handleSendMessage(selectedChat.id, msg)}
              />
            </div>
          ) : (
            <p
              style={{
                color: "var(--dark-brown-text-color)",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              Select a conversation to open chat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

