import { useEffect, useState } from "react";

export function useChats(initialChats) {
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);

  const selectChat = (chat) => setSelectedChat(chat);

  const newChat = () => {
    const chat = {
      id: chats.length + 1,
      name: `Chat ${chats.length + 1}`,
      time: "Just now",
      messages: [],
      preview: "",
    };
    setChats((c) => [...c, chat]);
    setSelectedChat(chat);
  };

  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: chat.messages.length + 1, sender: "professional", text },
              ],
              preview: text,
            }
          : chat
      )
    );
  };

  // keep selectedChat reference fresh so UI updates instantly
  useEffect(() => {
    if (!selectedChat) return;
    const fresh = chats.find((c) => c.id === selectedChat.id);
    if (fresh) setSelectedChat(fresh);
  }, [chats]);

  return { chats, selectedChat, selectChat, newChat, sendMessage };
}
