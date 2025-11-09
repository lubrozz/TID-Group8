import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import "../../chat.css";

export default function ExitModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to exit the chat?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you exit the chat, your conversation will be deleted. But you
              are always welcome to come back to have another chat.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Back to chat</button>
            <button onClick={handleClose}>Exit Chat</button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
