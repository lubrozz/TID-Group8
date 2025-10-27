// Components/Chat/ChatWindow.jsx

//Not currently in use - for later
export default function ChatWindow({ header, children }) {
    return (
      <section className="chat-pane">
        <div className="chat-panel">
          <div className="chat-header">{header}</div>
          {children}
        </div>
      </section>
    );
  }