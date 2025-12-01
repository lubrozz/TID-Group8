import { useState, useEffect } from "react";
import ConversationList from "../Components/prof-chat/ConversationList.jsx";
import ChatWindow from "../Components/prof-chat/ChatWindow.jsx";
import WelcomeScreen from "../Components/prof-chat/WelcomeScreen.jsx";
import { useParams } from "react-router-dom";
import ProfessionalMenu from "../Components/prof-chat/ProfessionalMenu.jsx";
import {
  sendMessage,
  setSubscriptionToMessages,
  unsubscribeFromMessages, 
} from "../services/chatService";
import Parse from "parse";
import "../styles/prof-chat.css";

export default function ProfChat() {
// Read the chatRoomId from the URL (e.g. /chat/abc123)
const { chatRoomId } = useParams();

// All chatrooms assigned to this professional
const [chats, setChats] = useState([]);

// Currently selected chatroom (the one being viewed)
const [selectedChat, setSelectedChat] = useState(null);

  // ---------------------------------------
  // 1. Load all chatrooms for this pro
  // ---------------------------------------

useEffect(() => {
  // Runs once on mount (empty dependency array)
  async function loadRooms() {
    // Get currently logged-in user (should be a professional)
    const user = Parse.User.current();
    if (!user) return; // If no user is logged in, do nothing

    // Query ChatRoom objects where this user is the assigned professional
    const query = new Parse.Query("ChatRoom")
      .equalTo("pro", user)  // only rooms assigned to this pro
      .include("anon");      // also fetch the linked anonymous user (child)

    // Fetch matching chatrooms from the backend
    const rooms = await query.find();

    // Map Parse objects → plain objects used by the UI
    setChats(
      rooms.map((room) => ({
        id: room.id,                                      // ChatRoom ID
        name: room.get("anonDisplayName") ?? "Anonymous", // name shown in chat list
        preview: room.get("status") ?? "Open chat",       // short status/preview text
        messages: [],                                     // messages will be loaded later
        parseObj: room,                                   // keep original Parse object if needed
      }))
    );
  }
  loadRooms();
}, []); // [] → run only once when the component mounts
  
  // ---------------------------------------
  // 2. Live subscription for incoming msgs
  // ---------------------------------------
  useEffect(() => {
    if (!chatRoomId) return;
  
    let sub;
  
    (async () => {
      sub = await setSubscriptionToMessages(chatRoomId, (msg) => {
        // Append message to the open chat
        setSelectedChat((prev) =>
          prev && prev.id === chatRoomId
            ? { ...prev, messages: [...prev.messages, msg] }
            : prev
        );
      });
    })();
  
    return () => sub && unsubscribeFromMessages(sub);
  }, [chatRoomId]);
  
  
  // ---------------------------------------
  // 3. Load messages for a specific chat
  // ---------------------------------------
  async function loadMessages(chatId) {
    return await Parse.Cloud.run("getMessages", { roomId: chatId });
  }
  // ---------------------------------------
  // 4. Send a message
  // ---------------------------------------
  async function handleSendMessage(chatId, text) {
    const sent = await sendMessage(text, chatId);
  
    setSelectedChat((prev) =>
      prev && prev.id === chatId
        ? { ...prev, messages: [...prev.messages, sent] }
        : prev
    );
  }

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
             <WelcomeScreen/>
          )}
             <ProfessionalMenu/>

        </div>
      </div>
    </div>
  );
}
