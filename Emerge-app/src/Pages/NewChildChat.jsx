import "../chat.css";

import ChildTextBar from "../Components/ChildChat/ChildTextBar";
import ExitBar from "../Components/ChildChat/ExitBar";
import IncomingMessage from "../Components/ChildChat/IncomingMessage";
import OutgoingMessage from "../Components/ChildChat/OutgoingMessage";
import ExitButton from "../Components/ChildChat/ExitButton";
import ExitWarning from "../Components/ChildChat/ExitWarning";
import { useState } from "react";

const NewChildChat = () => {
  const [showExit, setShowExit] = useState(false);

  return (
    <div className="container">
      <div className="chat">
        <div className="top">
          <ExitBar />
          <ExitButton onClick={() => setShowExit(true)} />
        </div>
        <div className="center">
          {showExit && (
            <ExitWarning
              onCancel={() => setShowExit(false)}
              onConfirm={() => setShowExit(false)}
            />
          )}
          <IncomingMessage />
          <OutgoingMessage />
        </div>
        <div className="bottom">
          <ChildTextBar />
        </div>
      </div>
    </div>
  );
};
export default NewChildChat;
