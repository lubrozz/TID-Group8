// src/Components/ChatObject/ChatObject.jsx
import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble.jsx"; 
import TextBar from "../Shared/TextBar.jsx";
import NotesBar from "./NotesBar.jsx";
import "../../styles/prof-chat.css";   
import ReportNotification from "./ReportNotification.jsx";
import { useState, useEffect } from "react";
import ProfessionalMenu from "./ProfessionalMenu.jsx";
import Parse from "parse";


export default function ChatObject({ chat, onSend }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [notesByMessageId, setNotesByMessageId] = useState({});

  // When entering a new chat, load notes from ChatRoom.metadata.proNotes
  useEffect(() => {
    if (!chat?.id) {
      setNotesByMessageId({});
      return;
    }

    const loadNotes = async () => {
      try {
        const ChatRoom = Parse.Object.extend("ChatRoom");
        const query = new Parse.Query(ChatRoom);
        const room = await query.get(chat.id);   // use chat.id as objectId

        const metadata = room.get("metadata") || {};
        const remoteNotes = metadata.proNotes || {};
        setNotesByMessageId(remoteNotes);
      } catch (err) {
        console.error("Failed to load notes for chat:", err);
        setNotesByMessageId({});
      }
    };

    loadNotes();
  }, [chat?.id]);


    // Save notes back to the database
    const saveNotesForChat = async (nextNotes) => {
    if (!chat?.id) return;

    try {
      const ChatRoom = Parse.Object.extend("ChatRoom");
      const query = new Parse.Query(ChatRoom);
      const room = await query.get(chat.id);

      const metadata = room.get("metadata") || {};
      metadata.proNotes = nextNotes;          // lets say we put into the metadata.proNotes

      room.set("metadata", metadata);
      await room.save();

      console.log("Notes saved for chat", chat.id);
    } catch (err) {
      console.error("Failed to save notes for chat:", err);
    }
  };


  // Bind local state with remote storage
  const handleUpdateNote = (messageId, nextText) => {
    setNotesByMessageId((prev) => {
      const updated = { ...prev, [messageId]: nextText };
      saveNotesForChat(updated);   // save to Parse
      return updated;
    });
  };

  const handleAddNoteForSelected = () => {
    const newNoteId = `note-${Date.now()}`;
    setNotesByMessageId((prev) => {
      const updated = { ...prev, [newNoteId]: "" };
      saveNotesForChat(updated);
      return updated;
    });
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
