import "../../styles/child-chat.css";

export default function MessageBubble({ bubbleStyle, isProf, children }) {
  return (
    <div className={bubbleStyle}>
      {isProf && <img src=".avatar.png" alt="" />}
      <div className="texts">{children}</div>
    </div>
  );
}
