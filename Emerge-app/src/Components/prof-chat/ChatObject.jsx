// src/Components/ChatObject/ChatObject.jsx
import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble.jsx"; 
import TextBar from "../Shared/TextBar.jsx";
import NotesBar from "./NotesBar.jsx";
import "../../styles/prof-chat.css";   
import ReportNotification from "./ReportNotification.jsx";
import { useState } from "react";
import ProfessionalMenu from "./ProfessionalMenu.jsx";


export default function ChatObject({ chat, onSend }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [notesByMessageId, setNotesByMessageId] = useState({});

  const handleUpdateNote = (messageId, nextText) => {
    setNotesByMessageId((prev) => ({ ...prev, [messageId]: nextText }));
  };

  const handleAddNoteForSelected = () => {
    const newNoteId = `note-${Date.now()}`;
    setNotesByMessageId((prev) => ({
      ...prev,
      [newNoteId]: "",
    }));
    setSelectedMessageId(newNoteId);
  };

  return (
    <div className="chatobject-wrapper">

      {/* Report bar stays at top ALWAYS */}
      <div className="chatobject-header">
        <ReportNotification />
        <ProfessionalMenu />
      </div>

      <div className="chatobject-body">
        
        {/* Left: messages */}
        <div className="chatobject-messages">
          <MessageList
            messages={chat.messages}
            renderItem={(m) => (
              <MessageBubble
                key={m.id}
                text={m.text}
                sender={m.sender}
                timestamp={m.timestamp}
              />
            )}
          />
          <TextBar onSend={onSend} />
        </div>

        {/* Right: notes */}
        <div className="chatobject-notes">
          <div className="notes-header">
          </div>
          <NotesBar
            notesByMessageId={notesByMessageId}
            selectedMessageId={selectedMessageId}
            onUpdateNote={handleUpdateNote}
            onAddNoteForSelected={handleAddNoteForSelected}
          />
        </div>
      </div>
    </div>
  );
}
