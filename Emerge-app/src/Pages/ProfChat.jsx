import { useState, useEffect } from "react";
import ConversationList from "../Components/prof-chat/ConversationList.jsx";
import ChatWindow from "../Components/prof-chat/ChatWindow.jsx";
import WelcomeScreen from "../Components/prof-chat/WelcomeScreen.jsx";
import Parse from "parse";
import "../styles/prof-chat.css";

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
      notes: {},
    },
    {
      id: 2,
      name: "Chat2",
      preview: "Can we talk about what happened?",
      messages: [
        { id: 1, sender: "child", text: "Can we talk about what happened?" },
        { id: 2, sender: "professional", text: "Of course, I’m listening." },
      ],
      notes: {},
    },
  ]);

  // Track which chat is selected
  const [selectedChat, setSelectedChat] = useState(null);

  // Sending messages
  const handleSendMessage = (chatId, newText) => {
  };

  const handleUpdateNotes = (chatId, updatedNotes) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, notes: updatedNotes } : chat
      )
    );
  };

  
  return (
    <div className="chat">
      <div className="top">
        <div className="prof-layout">

          <ConversationList
            chats={chats}
            selectedChat={selectedChat}
            onSelect={setSelectedChat}
          />

          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onSend={handleSendMessage}
              onUpdateNotes={handleUpdateNotes}
            />
          ) : (
            <WelcomeScreen />
          )}

        </div>
      </div>
    </div>
  );
}
