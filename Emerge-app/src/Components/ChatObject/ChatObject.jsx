// src/Components/ChatObject/ChatObject.jsx
import MessageList from "../ChatObject/MessageList";
import MessageBubble from "../ChatObject/MessageBubble";
import TextBar from "../Shared/TextBar";
import NotesBar from "../Shared/NotesBar";
import "../../prof-chat.css";

import { useState } from "react";

export default function ChatObject({ chat, onSend }) {
  // Currently selected message ID or note ID
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Store all notes: { messageId or noteId: “Content” }
  const [notesByMessageId, setNotesByMessageId] = useState({});

  // Renew Notes
  const handleUpdateNote = (messageId, nextText) => {
    setNotesByMessageId((prev) => ({ ...prev, [messageId]: nextText }));
  };

  // Click AddNoteButton: Create a new note
  const handleAddNoteForSelected = () => {
    const newNoteId = `note-${Date.now()}`;
    setNotesByMessageId((prev) => ({
      ...prev,
      [newNoteId]: "", // Create a new note
    }));
    setSelectedMessageId(newNoteId); // Set as currently selected note
  };

  return (
    <div className="chatobject-wrapper">
      {/* Left side: message area */}
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
     
         {/* Right side: notes */}
         <div className="chatobject-notes">
        <NotesBar
          notesByMessageId={notesByMessageId}
          selectedMessageId={selectedMessageId}
          onUpdateNote={handleUpdateNote}
          onAddNoteForSelected={handleAddNoteForSelected}
        />
      </div>
      
    </div>
  );
}