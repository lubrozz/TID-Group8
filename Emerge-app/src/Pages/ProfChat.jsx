import { useState, useEffect } from "react";
import ChatObject from "../Components/ChatObject/ChatObject";
import { Link } from "react-router-dom"; 
import "../Prof-chat.css";

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

  const handleSendMessage = (chatId, newText) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: chat.messages.length + 1,
                  sender: "professional",
                  text: newText,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }
              ],
            }
          : chat
      )
    );
  };
  

   //new: update notes inside the correct chat
   const handleUpdateNotes = (chatId, updatedNotes) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, notes: updatedNotes } : chat
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
    <div className="container">
      
    <div className="chat">
      
      <div className="top">
        
    <div className="prof-layout">
      
      {/* LEFT COLUMN: Conversations */}
      <div className="prof-chat-list">
      <button
    onClick={() => setSelectedChat(null)} // clears selected chat
  >
    <h1>Conversations</h1>
  </button>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`prof-chat-list-item ${
              selectedChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => setSelectedChat(selectedChat?.id == chat.id ? null : chat)}
          >
            <strong>{chat.name}</strong>
          <p>{chat.preview}</p>
          
        </div>
        
      ))}
        
      
    </div>
    

           {/* RIGHT: Chat + Notes (combined in ChatObject) */}

 <div className="prof-chat-center">
    {selectedChat ? (
      <ChatObject
        key={selectedChat.id}
        chat={selectedChat}
        onSend={(msg) => handleSendMessage(selectedChat.id, msg)}
        onUpdateNotes={(notes) => handleUpdateNotes(selectedChat.id, notes)}
      />
    ) : (
      <div className="welcome-screen">
        <h2>Welcome back</h2>
        <p>Select a conversation on the left to begin chatting.</p>
        <div className="welcome-divider"></div>
        <p className="welcome-tip">
          You can also take notes while chatting — they’ll stay linked to each child.
        </p>
      </div>
    )}
  </div>
</div>

  
  
      </div>

    </div>
    </div>


  );
}
