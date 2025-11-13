import "../../child-chat.css";

export default function MessageBubble({ bubbleStyle, isProf }) {
  return (
    <div className={bubbleStyle}>
      {isProf && <img src=".avatar.png" alt="" />}
      <div className="texts">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          magni nihil eligendi, mollitia repellat dolor sunt voluptas iste minus
          dolore itaque, illo ut possimus alias rem ipsam ex odio voluptatibus.
        </p>
        <span>1 min ago</span>
      </div>
    </div>
  );
}
