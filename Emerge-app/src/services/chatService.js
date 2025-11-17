import Parse from "parse"; // <-- Important
import { findRandomProfUser, createNewAnonUser } from "./userService";

export async function createNewChatRoom() {
  const deleteAfter = new Date(Date.now());
  deleteAfter.setUTCDate(deleteAfter.getUTCDate() + 30);

  const pro = await findRandomProfUser();
  const anon = await createNewAnonUser();

  const newChatRoom = new Parse.Object("ChatRoom");
  newChatRoom.set("pro", pro);
  newChatRoom.set("anon", anon);
  newChatRoom.set("status", "open");
  newChatRoom.set("deleteAfter", deleteAfter);
  newChatRoom.set("anonDisplayName", "Anonymous user");

  return await newChatRoom.save();
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
