import "../chat.css";

import ChildTextBar from "../Components/ChildChat/ChildTextBar";
import ExitBar from "../Components/ChildChat/ExitBar";
import IncomingMessage from "../Components/ChildChat/IncomingMessage";
import OutgoingMessage from "../Components/ChildChat/OutgoingMessage";
import ExitButton from "../Components/ChildChat/ExitButton";
import ExitWarning from "../Components/ChildChat/ExitWarning";
import { useState } from "react";
import ExitModal from "../Components/ChildChat/ExitModal";

const NewChildChat = () => {
  const [showExit, setShowExit] = useState(false);

  return (
    <div className="container">
      <div className="chat">
        <ExitModal />
        <div className="center">
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
