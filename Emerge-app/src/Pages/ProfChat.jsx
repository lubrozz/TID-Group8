import { useState, useEffect } from "react";
import ConversationList from "../Components/prof-chat/ConversationList.jsx";
import ChatWindow from "../Components/prof-chat/ChatWindow.jsx";
import WelcomeScreen from "../Components/prof-chat/WelcomeScreen.jsx";

import {
  sendMessage,
  setSubscriptionToMessages,
  unsubscribeFromMessages, 
} from "../services/chatService";
import Parse from "parse";
import "../styles/prof-chat.css";

export default function ProfChat() {
  // State: all conversations
  const [chats, setChats] = useState([]);

  // Track which chat is selected
  const [selectedChat, setSelectedChat] = useState(null);
  const chatRoomId = selectedChat?.id;

  // -------------------------
  // 1. LOAD CHATROOMS
  // -------------------------
  useEffect(() => {
    const loadChatRooms = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) return;

      const ChatRoom = Parse.Object.extend("ChatRoom");
      const query = new Parse.Query(ChatRoom);
      query.equalTo("pro", currentUser);
      query.include("anon");

      const rooms = await query.find();

      const uiChats = rooms.map((room) => ({
        id: room.id,
        name: room.get("anonDisplayName") || "Anonymous",
        preview: room.get("status") || "Open chat",
        messages: [],
        parseObj: room, // keep pointer
      }));

      setChats(uiChats);
    };

    loadChatRooms();
  }, []);

  // -------------------------
  // 2. LIVEQUERY SUBSCRIPTION
  // -------------------------
  useEffect(() => {
    if (!chatRoomId) return; // Don't subscribe if no chat selected

    let subscription;

    const initSubscription = async () => {
      subscription = await setSubscriptionToMessages(chatRoomId, (msg) => {
        console.log("LiveQuery received message:", msg.id);

        // Update the selectedChat's messages
        setSelectedChat((prev) => {
          if (!prev || prev.id !== chatRoomId) return prev;

          // Prevent duplicates
          if (prev.messages.find((m) => m.id === msg.id)) {
            return prev;
          }

          return {
            ...prev,
            messages: [...prev.messages, msg],
          };
        });
      });
    };

    initSubscription();

    return () => {
      console.log("Unsubscribing from chat:", chatRoomId);
      unsubscribeFromMessages(subscription);
    };
  }, [chatRoomId]);

  // -------------------------
  // 3. LOAD MESSAGES FOR ONE CHAT
  // -------------------------
  const loadMessages = async (chatRoomId) => {
    const results = await Parse.Cloud.run("getMessages", {
      roomId: chatRoomId,
    });
    return results; // these are Parse objects!
  };

  // -------------------------
  // 4. SEND MESSAGE
  // -------------------------
  const handleSendMessage = async (chatRoomId, text) => {
    if (!chatRoomId) return;

    const sent = await sendMessage(text, chatRoomId);
    console.log("Message sent:", sent.id);

    // Optimistically update UI (LiveQuery will also trigger, but duplicate prevention handles it)
    setSelectedChat((prev) => {
      if (!prev || prev.id !== chatRoomId) return prev;

      // Prevent duplicates
      if (prev.messages.find((m) => m.id === sent.id)) {
        return prev;
      }

      return {
        ...prev,
        messages: [...prev.messages, sent],
      };
    });
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="prof-layout">
          <ConversationList
            chats={chats}
            selectedChat={selectedChat}
            onSelect={async (chat) => {
              if (!chat) return setSelectedChat(null);

              const msgs = await loadMessages(chat.id);
              setSelectedChat({ ...chat, messages: msgs });
            }}
          />

          {selectedChat ? (
            <ChatWindow chat={selectedChat} onSend={handleSendMessage} />
          ) : (
            <WelcomeScreen />
            
          )}


  
   

       

        </div>
      </div>
    </div>
  );
}
