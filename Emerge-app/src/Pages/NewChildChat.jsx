import "../styles/child-chat.css";
import "../styles/textbar.css";
import TextBar from "../Components/Shared/TextBar";
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
          <div className="textbar">
            <TextBar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewChildChat;
