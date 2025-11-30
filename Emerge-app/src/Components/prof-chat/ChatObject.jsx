import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble.jsx";
import TextBar from "../Shared/TextBar.jsx";
import NotesBar from "./NotesBar.jsx";
import "../../styles/prof-chat.css";
import ReportNotification from "./ReportNotification.jsx";
import ProfessionalMenu from "./ProfessionalMenu.jsx";
import useChatNotes from "../../hooks/useChatNotes";

export default function ChatObject({ chat, onSend }) {
  const { notes, updateNote, addNote } = useChatNotes(chat);

  return (
    <div className="chatobject-wrapper">
      <div className="chatobject-header">
        <ReportNotification />
        <ProfessionalMenu />
      </div>

      <div className="chatobject-body">
        {/* Left: messages */}
        <div className="chatobject-messages">
          <MessageList
            messages={chat.messages}
            renderItem={(m) => {
              const senderUser = m.get("sender");
              const role = senderUser?.get("roleLabel");
              const sender =
                role === "Professional" ? "Anonymous" : "Professional";

              const ts = (m.get("deliveredAt") || m.createdAt)?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <MessageBubble
                  key={m.id}
                  text={m.get("body")}
                  sender={sender}
                  timestamp={ts}
                />
              );
            }}
          />

          <TextBar onSend={onSend} />
        </div>

        {/* Right: notes */}
        <div className="chatobject-notes">
          <NotesBar
            notesByMessageId={notes}
            onUpdateNote={updateNote}
            onAddNoteForSelected={addNote}
          />
        </div>
      </div>
    </div>
  );
}
