import { useState, useEffect, useRef } from "react";
import Parse from "parse";
import { getNotesForChat, saveNotesForChat } from "../services/chatService";

export default function useChatNotes(chat) {
  const [notes, setNotes] = useState({});
  const saveTimer = useRef(null);
  const initialLoaded = useRef(false);

  // Load notes when chat changes
  useEffect(() => {
    if (!chat?.id) {
      setNotes({});
      initialLoaded.current = false;
      return;
    }

    (async () => {
      const user = Parse.User.current();
      const data = await getNotesForChat(chat.id, user);
      setNotes(data);
      initialLoaded.current = true;
    })();
  }, [chat?.id]);

  // Debounced save
  useEffect(() => {
    if (!chat?.id || !initialLoaded.current) return;

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const user = Parse.User.current();
      saveNotesForChat(chat.id, user, notes);
    }, 500);

    return () => clearTimeout(saveTimer.current);
  }, [notes, chat?.id]);

  const updateNote = (id, text) =>
    setNotes((prev) => ({ ...prev, [id]: text }));

  const addNote = () => {
    const id = `note-${Date.now()}`;
    setNotes((prev) => ({ ...prev, [id]: "" }));
    return id;
  };

  return { notes, updateNote, addNote };
}
