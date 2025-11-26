import "../../styles/homePage.css";
import { useState } from "react";
import LinkButton from "./LinkButton";
import { createNewChatRoom } from "../../services/chatService";
import { useNavigate } from "react-router-dom";

export default function WelcomeSplash() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNewChatRoom = async () => {
    setError("");
    setLoading(true);

    try {
      const savedRoom = await createNewChatRoom();
      console.log("Chat created:", savedRoom);
      navigate(`/chat/${savedRoom.chatRoomId}`);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to create chatroom");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centerSplash">
      <div className="headerWrapper">
        {error && <div className="error-message">{error}</div>}

        <h1 className="mainHeader">Welcome</h1>
        <h2 className="subHeader">
          This is a safe and private space where you can chat and share your
          thoughts.
        </h2>
      </div>
      <div className="buttonWrapper">
        <LinkButton
          styleName={"oldChatButton"}
          page={"/new-child-chat"}
          buttonText={"Old chat"}
          buttonIcon={<span>&#10560;</span>}
        />
        <LinkButton
          styleName={"newChatButton"}
          buttonText={"New Chat"}
          buttonIcon={<span>&#10140;</span>}
          loading={loading}
          onClick={handleNewChatRoom}
        />
      </div>
    </div>
  );
}
