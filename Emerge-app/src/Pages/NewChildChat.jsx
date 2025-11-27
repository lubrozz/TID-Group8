import "../styles/child-chat.css";
import "../styles/textbar.css";
import TextBar from "../Components/Shared/TextBar";
import ExitModal from "../Components/ChildChat/ExitModal";
import MessageBubble from "../Components/ChildChat/MessageBubble";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  sendMessage,
  setSubscriptionToMessages,
  unsubscribeFromMessages,
} from "../services/chatService";
import Parse from "parse";

export default function NewChildChat() {
  const { chatRoomId } = useParams(); // read from URL (set from WelcomeSplash.jsx)
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  /* Load current chatroom and it's messages (even if there are none) */

  useEffect(() => {
    const loadChatRoom = async () => {
      try {
        setLoading(true);
        const results = await Parse.Cloud.run("getMessages", {
          roomId: chatRoomId,
        });
        setMessages(results || []);
      } catch (err) {
        console.error("loadMessages error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChatRoom();
  }, [chatRoomId]);

  /* loading component while data is being fetched */

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

  if (loading) return <div>loading chat...</div>; //can always make a prettier loading element...

  /* save message to database */
  const handleSendMessage = async (text) => {
    const sentMessage = await sendMessage(text, chatRoomId);
    setMessages((prev) => [...prev, sentMessage]);
    console.log("message *" + sentMessage + "* sent" + chatRoomId);
  };

  return (
    <div className="container">
      <div className="chat">
        <ExitModal chatRoomId={chatRoomId} />
        <div className="center">
          {messages.map((msg) => {
            console.log(
              "the sender is: " + msg.get("sender")?.get("roleLabel")
            );
            const isProf =
              msg.get("sender")?.get("roleLabel") === "Anonymous";

            return (
              <MessageBubble
                key={msg.id}
                bubbleStyle={isProf ? "message" : "message-child"}
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
