import { useState, useEffect } from "react";
import ConversationList from "../Components/prof-chat/ConversationList.jsx";
import ChatWindow from "../Components/prof-chat/ChatWindow.jsx";
import WelcomeScreen from "../Components/prof-chat/WelcomeScreen.jsx";
import { useParams } from "react-router-dom";
import {
  sendMessage,
  setSubscriptionToMessages,
  unsubscribeFromMessages,
} from "../services/chatService";
import Parse from "parse";
import "../styles/prof-chat.css";

export default function ProfChat() {
  const { chatRoomId } = useParams(); 
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

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
        parseObj: room,   // keep pointer
      }));

      setChats(uiChats);
    };

    loadChatRooms();
  }, []);

  useEffect(() => {
    let subscription;

    const initSubscription = async () => {
      subscription = await setSubscriptionToMessages(chatRoomId, (msg) => {
        setMessages((prev) => [...prev, msg]); // onCreate callback
      });
    };

    initSubscription();

    return () => {
      unsubscribeFromMessages(subscription);
    };
  }, [chatRoomId]);


  // -------------------------
  // 2. LOAD MESSAGES FOR ONE CHAT
  // -------------------------
  const loadMessages = async (chatRoomId) => {
    const results = await Parse.Cloud.run("getMessages", { roomId: chatRoomId });
    return results; // these are Parse objects!
  };

  // -------------------------
  // 3. SEND MESSAGE
  // -------------------------
  const handleSendMessage = async (chatId, text) => {
    const sent = await sendMessage(text, chatId);

    // Update UI for selected chat
    setSelectedChat((prev) =>
      prev && prev.id === chatId ? { ...prev, messages: [...prev.messages, sent] } : prev
    );
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
            <ChatWindow
              chat={selectedChat}
              onSend={handleSendMessage}
            />
          ) : (
            <WelcomeScreen />
          )}

        </div>
      </div>
    </div>
  );
}
