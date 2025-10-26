import { useState } from "react";
import ChatLayout from "../Components/Layout/ChatLayout";  

export default function ProfChat() {
  // Simulated Dialogue
  const conversations = [
    {
      id: 1,
      name: "Chat1",
      preview: "Hey there!",
      messages: [
        { id: 1, text: "Hello! How are you?", sender: "user" },
        { id: 2, text: "I'm fine, thanks!", sender: "professional" },
      ],
    },
    {
      id: 2,
      name: "Chat2",
      preview: "that looks so good!",
      messages: [
        { id: 1, text: "that looks so good!", sender: "user" },
        { id: 2, text: "Wow, technology!", sender: "professional" },
      ],
    },
  ];

  // The selected conversation which is chosen at present
  const [selectedChat, setSelectedChat] = useState(conversations[1]);

  return (
    <ChatLayout
      conversations={conversations}       // All the conversations on the left part
      selectedChat={selectedChat}         // Selected Chat in the middle part
      onSelectChat={setSelectedChat}      // Click on the conversation list to change the current chat, but need to change the "ConversationList" later for the real function, we now don't have this function to use yet
    />
  );
}