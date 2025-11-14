import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../child-chat.css";

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
        <button className="exitButton" onClick={handleOpen}>
          Exit
        </button>
      </div>
      <dialog className="dialog" ref={dialogRef} onClose={handleClose}>
          <h2>Exit and delete this chat?</h2>
          <p>If you exit the chat, your conversation will be deleted. But you
              are always welcome to come back to have another chat.</p>
          <div className="actionButtons">
            <button className="cancelExitButton" onClick={handleClose}>
              <p className="texts">
                Back to chat
              </p>
              </button>
              <button className="confirmExitButton">
                <Link to="/" className="texts">
                  Exit Chat
                </Link>
              </button>
          </div>
      </dialog>
    </div>
  );
}
