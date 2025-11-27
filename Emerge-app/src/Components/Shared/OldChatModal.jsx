import { useEffect, useRef, useState } from "react";
import Button from "./button";
import LinkButton from "./LinkButton";
import { getOldChatRoom } from "../../services/chatService";
import { useNavigate } from "react-router-dom";

export default function OldChatModal({ open, onClose }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  const handleOldChatRoom = async () => {
    setError("");
    setLoading(true);
    try {
      const savedRoom = await getOldChatRoom(text); // Give inputCode to client function.
      console.log("Chat recovered: ", savedRoom);
      navigate(`/chat/${savedRoom.chatRoomId}`);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to create chatroom");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog className="" ref={dialogRef} onClose={onClose}>
        <h2>Enter previous chat</h2>
        <p>
          If you have a code from a previous chat session, please input it here.
        </p>
        <input
          type="text"
          placeholder="Type your code in here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textbar-input"
        />
        <div className="twoButtons">
          <Button
            styleName={"cancelOldChat"}
            onClick={onClose}
            buttonText={"Back"}
          />
          <LinkButton
            styleName={"goToChat"}
            buttonText={"Keep Chatting"}
            loading={loading}
            onClick={handleOldChatRoom}
          />
        </div>
      </dialog>
    </div>
  );
}
