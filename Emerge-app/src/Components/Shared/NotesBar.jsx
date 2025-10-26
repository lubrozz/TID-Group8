import NoteTaking from "./NoteTaking";
import AddNoteButton from "./AddNoteButton";
import { useEffect, useRef } from "react";

export default function NotesBar({
  notesByMessageId = {},
  selectedMessageId = null,
  onUpdateNote,
  onAddNoteForSelected,
}) {
  const topNoteRef = useRef(null);

  // When a user clicks on a new message, scroll the corresponding note to the top
  useEffect(() => {
    if (topNoteRef.current) {
      topNoteRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedMessageId]);

  // Build a sorted list
  const entries = Object.entries(notesByMessageId);
  const selectedEntry =
    selectedMessageId && notesByMessageId.hasOwnProperty(selectedMessageId)
      ? [[selectedMessageId, notesByMessageId[selectedMessageId]]]
      : [];
  const otherEntries = entries.filter(([id]) => id !== selectedMessageId);

  return (
    <aside
      style={{
        width: "198px",
        height: "651px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        padding: "10px 0",
        gap: "12px",
        overflowY: "auto",
      }}
    >
      {/* The currently selected note is at the top. */}
      {selectedEntry.map(([id, text]) => (
        <div key={id} ref={topNoteRef}>
          <NoteTaking
            value={text}
            onChange={(next) => onUpdateNote(id, next)}
            placeholder="Write a note for this message..."
          />
        </div>
      ))}

      {/* Other existing notes */}
      {otherEntries.map(([id, text]) => (
        <NoteTaking
          key={id}
          value={text}
          onChange={(next) => onUpdateNote(id, next)}
        />
      ))}

      {/* Add button at the bottom */}
      <div style={{ marginTop: "auto", paddingTop: "8px" }}>
        <AddNoteButton onClick={onAddNoteForSelected} />
      </div>
    </aside>
  );
}