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
