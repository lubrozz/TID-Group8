import "../chat.css";

import ChildTextBar from "../Components/ChildChat/ChildTextBar";
import ExitModal from "../Components/ChildChat/ExitModal";
import MessageBubble from "../Components/ChildChat/MessageBubble";

const NewChildChat = () => {
  return (
    <div className="container">
      <div className="chat">
        <ExitModal />
        <div className="center">
          <MessageBubble bubbleStyle="message" isProf={true} />
          <MessageBubble bubbleStyle="message own" isProf={false} />
        </div>
        <div className="bottom">
          <ChildTextBar />
        </div>
      </div>
    </div>
  );
};
export default NewChildChat;
