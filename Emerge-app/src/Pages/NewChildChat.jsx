import "../chat.css";

import ChildTextBar from "../Components/ChildChat/ChildTextBar";
import ExitBar from "../Components/ChildChat/ExitBar";
import IncomingMessage from "../Components/ChildChat/IncomingMessage";
import OutgoingMessage from "../Components/ChildChat/OutgoingMessage";
import ExitButton from "../Components/ChildChat/ExitButton";

const NewChildChat = () => {
  return (
    <div className="container">
      <div className="chat">
        <div className="top">
          <ExitBar />
          <ExitButton />
        </div>
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
