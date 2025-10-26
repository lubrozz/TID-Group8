// Components/Chat/MessageList.js
export default function MessageList({ messages, renderItem }) {
    return (
      <div className="messages">
        {messages.map((m) => renderItem(m))}
      </div>
    );
  }
  
