// src/Components/ChatObject/ChatObject.jsx
import MessageList from "./MessageList";
import MessageBubble from "./MessageBubble.jsx"; 
import TextBar from "../Shared/TextBar.jsx";
import NotesBar from "./NotesBar.jsx";
import "../../styles/prof-chat.css";   
import ReportNotification from "./ReportNotification.jsx";
import { useState, useEffect, useRef } from "react";
import ProfessionalMenu from "./ProfessionalMenu.jsx";
import Parse from "parse";


export default function ChatObject({ chat, onSend }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [notesByMessageId, setNotesByMessageId] = useState({});

  // Used for “anti-shake” that saves only once within 500ms
  const saveTimeoutRef = useRef(null);
  // Flag: Whether the initial notes for this chat have been fully loaded from the backend
  const hasLoadedInitialNotes = useRef(false);

  // 1. When entering a new chat, load notes from Note table
  useEffect(() => {
    if (!chat?.id) {
      setNotesByMessageId({});
      hasLoadedInitialNotes.current = false;
      return;
    }

    const loadNotes = async () => {
      try {
        const Note = Parse.Object.extend("Note");
        const query = new Parse.Query(Note);

        // Check only the notes in the current chat room
        const chatRoom = new Parse.Object("ChatRoom");
        chatRoom.id = chat.id;

        query.equalTo("chat", chatRoom);            // we only get the note of "this chatroom"
        query.equalTo("isPrivate", true);           // we only uese private note

        const currentUser = Parse.User.current();
        if (currentUser) {
          query.equalTo("author", currentUser);     // we only use this current prof user's note
        }

        query.ascending("createdAt");

        const results = await query.find();
        console.log(
          "loadNotes for chat", 
          chat.id, 
          "found", 
          results.length, 
          "notes"
        );

        // change to the structure of NotesBar: {localId: text} 
        const map = {};
        results.forEach((note, index) => {
          const key = `note-${index}-${note.id}`;   // The locally used key does not need to correspond one-to-one with the database ID
          map[key] = note.get("body") || "";
        });

        setNotesByMessageId(map);
        hasLoadedInitialNotes.current = true; // Flag: Initial load completed
      } catch (err) {
        console.error("Failed to load notes for chat:", err);
        setNotesByMessageId({});
        hasLoadedInitialNotes.current = true;
      }
    };

    loadNotes();
  }, [chat?.id]);


    // 2. save the contents of the current `notesByMessageId` to the `Note` table
    const persistNotesForChat = async (notesMap) => {
      if (!chat?.id) return;

      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.warn("No authenticated user – skipping save of notes.");
        return;
      }

      // Extract non-empty text from notesMap first
      const noteTexts = Object.values(notesMap)
        .map((t) => (t || "").trim())
        .filter((t) => t.length > 0);

      // If the current snapshot contains no non-empty notes, skip it entirely without deleting any backend data
      if (noteTexts.length === 0) {
        console.log("No non-empty notes, skip saving to avoid wiping backend.");
        return;
      }

      console.log("persistNotesForChat for chat", chat.id, "notesMap:", notesMap);

      try {
        const Note = Parse.Object.extend("Note");
        const query = new Parse.Query(Note);

        const chatRoom = new Parse.Object("ChatRoom");
        chatRoom.id = chat.id;

        // Find all old notes from the current chat + current professional users + private
        query.equalTo("chat", chatRoom);
        query.equalTo("isPrivate", true);
        query.equalTo("author", currentUser);

        const existing = await query.find();

        // delete the previous version of this chat + user (only delete own private notes)
        if (existing.length > 0) {
          await Parse.Object.destroyAll(existing);
        }
      
        // Regenerate the Note object and write it back to the database
        const newNotes = noteTexts.map((text) => {
          const note = new Note();
          note.set("chat", chatRoom);
          note.set("author", currentUser);
          note.set("body", text);
          note.set("isPrivate", true);
          return note;
        });

        await Parse.Object.saveAll(newNotes);

        console.log(
          `Saved ${newNotes.length} notes for chat ${chat.id} to Note table.`
        );
      } catch (err) {
        console.error("Failed to save notes for chat:", err);
      }
    }; 


    // 3. Notes: Local update: Only modify the state, do not directly update the backend
    const handleUpdateNote = (messageId, nextText) => {
      setNotesByMessageId((prev) => ({
        ...prev,
        [messageId]: nextText,
      }));
    };

    const handleAddNoteForSelected = () => {
      const newNoteId = `note-${Date.now()}`;
      setNotesByMessageId((prev) => ({
        ...prev,
        [newNoteId]: "",
      }));
      setSelectedMessageId(newNoteId);
    };


    // 4. When notesByMessageId changes, only one snapshot is saved to the database within 500ms
    useEffect(() => {
      if (!chat?.id) return;

      // If the initial notes for this chat haven't finished loading, do not save them to avoid “an empty snapshot clearing the backend.”
      if (!hasLoadedInitialNotes.current) return;
      
      // Each time notes change, clear the previous timer first
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Save the current snapshot after 500ms
      saveTimeoutRef.current = setTimeout(() => {
        persistNotesForChat(notesByMessageId);
      }, 500);

      // Cleanup function to prevent timers from lingering after component unmounting
      return () => {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
      };
    }, [notesByMessageId, chat?.id]); // Switching between notes content or chat will trigger


    return (
      <div className="chatobject-wrapper">

        {/* Report bar stays at top ALWAYS */}
        <div className="chatobject-header">
          <ReportNotification />
          <ProfessionalMenu />
        </div>

        <div className="chatobject-body">
          {/* Left: messages + input */}
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
            <div className="notes-header"></div>
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
