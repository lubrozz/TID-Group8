import { useRef, useState, useEffect } from "react";
import Button from "../Shared/LinkButton";
import { enterOldChat } from "../../services/chatService";
import { useNavigate } from "react-router-dom";

export default function OldChatModal({ open, onClose }) {
  const dialogRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const codeComplete = inputValue.trim().length >= 8;

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const handleOldChat = async () => {
    if (!codeComplete) return;

    try {
      const oldRoom = await enterOldChat(inputValue);
      console.log("Code correct, entering old chat: ", oldRoom);
      navigate(`/chat/${oldRoom.oldChatRoomId}`);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal(); // used to create modal and backdrop
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog className="dialog" ref={dialogRef} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2>Welcome back</h2>
        <p>Please input your conversation code:</p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            styleName={"newChatButton"}
            buttonText={"Chat"}
            buttonIcon={<span>&#10140;</span>}
            onClick={handleOldChat}
            isDisabled={!codeComplete}
          />
        </div>
      </div>
    </dialog>
  );
}
