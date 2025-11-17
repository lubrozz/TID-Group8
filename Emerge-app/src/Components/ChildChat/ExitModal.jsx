import { useEffect, useRef, useState } from "react";
import "../../styles/child-chat.css";
import Button from "../Shared/button";
import LinkButton from "../Shared/LinkButton";

export default function ExitModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            page={"/"}
            buttonText={"Exit Chat"}
          />
        </div>
      </dialog>
    </div>
  );
}
