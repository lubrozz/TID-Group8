import "../styles/child-chat.css";
import "../styles/textbar.css";
import TextBar from "../Components/Shared/TextBar";
import ExitModal from "../Components/ChildChat/ExitModal";
import MessageBubble from "../Components/ChildChat/MessageBubble";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendMessage } from "../services/chatService";

export default function NewChildChat() {
  const { chatRoomId } = useParams(); // read from URL (set from WelcomeSplash.jsx)
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  /* Load current chatroom and it's messages (even if there are none) */

  useEffect(() => {
    const loadChatRoom = async () => {
      const Message = Parse.Object.extend("Message");
      const query = new Parse.Query(Message);

      const ChatRoom = Parse.Object.extend("ChatRoom");
      const roomPointer = new ChatRoom();
      roomPointer.id = chatRoomId;

      query.equalTo("chatRoom", roomPointer);
      query.ascending("createdAt");
      query.include("sender");

      const results = await query.find();
      setMessages(results);
      setLoading(false);
    };

    loadChatRoom();
  }, [chatRoomId]);

  /* loading component while data is being fetched */

  if (loading) return <div>loading chat...</div>; //can always make a prettier loading element...

  /* save message to database */
  const handleSendMessage = async (text) => {
    const sentMessage = await sendMessage(text, chatRoomId);
    console.log("message *" + sentMessage + "* sent");
  };

  return (
    <div className="container">
      <div className="chat">
        <ExitModal />
        <div className="center">
          {messages.map((msg) => {
            const isProf =
              msg.get("sender")?.get("roleLabel") === "Professional";

            return (
              <MessageBubble
                key={msg.id}
                bubbleStyle={isProf ? "message" : "message.own"}
                isProf={isProf}
              >
                {/* Override inner text */}
                <p>{msg.get("body")}</p>
                <span>
                  {new Date(msg.get("deliveredAt")).toLocaleTimeString()}
                </span>
              </MessageBubble>
            );
          })}
        </div>
        <div className="bottom">
          <div className="textbar">
            <TextBar onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
