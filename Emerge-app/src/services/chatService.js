import Parse from "parse"; // <-- Important

export async function createNewChatRoom() {
  return Parse.Cloud.run("createNewChatRoom");
}

export async function sendMessage(text, chatRoomId) {
  const Message = new Parse.Object.extend("Message");
  const message = new Message();

  const ChatRoom = Parse.Object.extend("ChatRoom");
  const roomPointer = new ChatRoom();
  roomPointer.id = chatRoomId;

  message.set("body", text);
  message.set("chatRoom", roomPointer);
  message.set("sender", Parse.User.current());
  message.set("deliveredAt", new Date());

  const saved = await message.save();
  setMessages((prev) => [...prev, saved]);
}
