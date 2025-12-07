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

  // -------------------------
  // 1. LIVEQUERY SUBSCRIPTION
  // -------------------------
  useEffect(() => {
    if (!chatRoomId) return;

    let subscription;

    const initSubscription = async () => {
      subscription = await setSubscriptionToMessages(chatRoomId, (msg) => {
        console.log("LiveQuery received message:", msg.id);

        setMessages((prev) => {
          // Prevent duplicates
          if (prev.find((m) => m.id === msg.id)) {
            console.log("Duplicate message prevented:", msg.id);
            return prev;
          }
          return [...prev, msg];
        });
      });

      console.log("LiveQuery subscription established for room:", chatRoomId);
    };

    initSubscription();

    return () => {
      console.log("Unsubscribing from chat:", chatRoomId);
      unsubscribeFromMessages(subscription);
    };
  }, [chatRoomId]);

  // -------------------------
  // 2. LOAD INITIAL MESSAGES
  // -------------------------
  useEffect(() => {
    const loadChatRoom = async () => {
      try {
        setLoading(true);
        const results = await Parse.Cloud.run("getMessages", {
          roomId: chatRoomId,
        });

        console.log("Loaded initial messages:", results.length);

        setMessages((prev) => {
          const newOnes = results.filter(
            (r) => !prev.some((m) => m.id === r.id)
          );
          return [...prev, ...newOnes];
        });
      } catch (err) {
        console.error("loadMessages error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (chatRoomId) {
      loadChatRoom();
    }
  }, [chatRoomId]);

  // -------------------------
  // 3. SEND MESSAGE
  // -------------------------
  const handleSendMessage = async (text) => {
    if (!chatRoomId || !text.trim()) return;

    try {
      const sent = await sendMessage(text, chatRoomId);
      console.log("Message sent:", sent.id);

      // Optimistically update UI (LiveQuery will also trigger, but duplicate prevention handles it)
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.find((m) => m.id === sent.id)) {
          return prev;
        }
        return [...prev, sent];
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading) return <div>loading chat...</div>;

  return (
    <div className="container">
      <div className="chat">
        <ExitModal chatRoomId={chatRoomId} />
        <div className="center">
          {messages.map((msg) => {
            const isProf =
              msg.get("sender")?.get("roleLabel") === "Professional";

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
