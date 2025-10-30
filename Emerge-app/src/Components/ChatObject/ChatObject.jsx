// src/Components/ChatObject/ChatObject.jsx
import MessageList from "../ChatObject/MessageList";
import MessageBubble from "../ChatObject/MessageBubble";
import TextBar from "../ChatObject/TextBar";
import NotesBar from "../Shared/NotesBar";
import "../../App.css";
import { useState } from "react";

export default function ChatObject({ chat, onSend }) {
  // Currently selected message ID or note ID
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Store all notes: { messageId or noteId: “Content” }
  const [notesByMessageId, setNotesByMessageId] = useState({});

  // Click the ellipsis on the message (to attach a note)
  const handleEllipsisClick = (message) => {
    setSelectedMessageId(message.id);
    setNotesByMessageId((prev) =>
      prev[message.id] !== undefined
        ? prev
        : { ...prev, [message.id]: "" } // If the message does not yet have a note, create one
    );
  };

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Left：Chat area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingRight: 20,
        }}
      >
        <MessageList
          messages={chat.messages}
          renderItem={(m) => (
            <MessageBubble
              key={m.id}
              text={m.text}
              sender={m.sender}
              onEllipsisClick={() => handleEllipsisClick(m)} // When click Ellipsis 
            />
          )}
        />
        <div className="textbar-wrap">
          <TextBar onSend={onSend} />
        </div>
      </div>

      {/* Right：NotesBar */}
      <div
        style={{
          width: 240,
          paddingLeft: 16,
          borderLeft: "1px solid var(--sand-color)",
        }}
      >
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