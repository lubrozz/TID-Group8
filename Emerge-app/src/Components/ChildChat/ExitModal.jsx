import { useEffect, useRef, useState } from "react";
import "../../styles/child-chat.css";
import Button from "../Shared/button";
import LinkButton from "../Shared/LinkButton";
import { deleteChatRoom } from "../../services/chatService";

export default function ExitModal({ chatRoomId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteChat = async () => {
    try {
      await deleteChatRoom(chatRoomId);
      console.log("Chat deleted");
    } catch (error) {
      console.error("Failed to delete the chat", error);
    }
  };

  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal(); // used to create modal and backdrop
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <div>
      <div className="top">
        <div className="exitBar">
          <p>You can at anytime exit and delete the chat here.</p>
          <p>Your chat key is: {chatRoomId}</p>
        </div>
        <Button
          styleName={"exitButton"}
          onClick={handleOpen}
          buttonText={"Exit"}
        />
      </div>
      <dialog className="dialog" ref={dialogRef} onClose={handleClose}>
        <h2>Exit and delete this chat?</h2>
        <p>
          If you exit the chat, your conversation will be deleted. But you are
          always welcome to come back to have another chat.
        </p>
        <div className="actionButtons">
          <Button
            styleName={"cancelExitButton"}
            onClick={handleClose}
            buttonText={"Back to chat"}
          />
          <LinkButton
            styleName={"confirmExitButton"}
            onClick={handleDeleteChat}
            page={"/"}
            buttonText={"Exit Chat"}
          />
        </div>
      </dialog>
    </div>
  );
}
