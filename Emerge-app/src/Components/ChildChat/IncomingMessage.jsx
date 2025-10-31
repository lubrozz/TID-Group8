import "../../chat.css";

export default function IncomingMessage() {
  return (
    <div className="message">
      <img src=".avatar.png" alt="" />
      <div className="texts">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus et
          facere deserunt ad, voluptatibus harum accusamus dolore, at deleniti
          veniam voluptatum alias nulla illo assumenda quae repellendus culpa
          dolor iure.
        </p>
        <span>1 min ago</span>
      </div>
    </div>
  );
}
