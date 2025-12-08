// src/Components/ChatObject/ChatObject.jsx

import { useState } from "react";
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
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleAddNote = () => {
    const newId = addNote();
    setSelectedMessageId(newId);
  };

  return (
    <div className="chatobject-wrapper">
      {/* Report bar stays at top ALWAYS */}
      <div className="chatobject-header">
        <ReportNotification />
        <ProfessionalMenu />
      </div>

      <div className="chatobject-body">
        {/* LEFT — messages */}
        <div className="chatobject-messages">
          <MessageList
            messages={chat.messages}
            renderItem={(m) => {
              // m is Parse.Object("Message")
              const senderUser = m.get("sender");
              const roleLabel = senderUser?.get("roleLabel");

              // What MessageBubble expects:
              const sender =
              roleLabel === "Professional" ? "Anonymous" : "Professional";


              const deliveredAt = m.get("deliveredAt") || m.createdAt;
              const timestamp = deliveredAt
                ? deliveredAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <MessageBubble
                  key={m.id}
                  text={m.get("body")}
                  sender={sender}
                  timestamp={timestamp}
                />
              );
            }}
          />

          <TextBar onSend={onSend} />
        </div>

        {/* RIGHT — notes */}
        <div className="chatobject-notes">
          <div className="notes-header"></div>
          <NotesBar
            notesByMessageId={notes}
            selectedMessageId={selectedMessageId}
            onUpdateNote={updateNote}
            onAddNoteForSelected={handleAddNote}
          />
        </div>
      </div>
    </div>
  );
}
