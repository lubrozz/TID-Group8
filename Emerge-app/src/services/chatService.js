import Parse from "parse"; // <-- Important

export async function createNewChatRoom() {
  const { chatRoomId, anonUserId, anonUserName, anonPassword } =
    await Parse.Cloud.run("createNewChatRoom");

  // log in anon user to create a session
  await Parse.User.logIn(anonUserName, anonPassword);

  // store session token in sessionStorage
  // This will make the session token survive page reloads, but not page closure
  sessionStorage.setItem(
    "anonUserSessionToken",
    Parse.User.current().getSessionToken()
  );

  console.log("Client is now logged in as anon user:", Parse.User.current());

  return { chatRoomId, anonUserId };
}

export async function deleteChatRoom(chatRoomId) {
  if (!chatRoomId) throw new Error("chatRoomId is required");

  try {
    const result = await Parse.Cloud.run("deleteChatAndMessages", {
      roomId: chatRoomId,
    });

    console.log("Chatroom deleted: ", result);
    return result;
  } catch (error) {
    console.error("Error deleting chatroom: ", error);
    throw error;
  }
}

export async function sendMessage(text, chatRoomId) {
  const Message = Parse.Object.extend("Message");
  const message = new Message();

  const ChatRoom = Parse.Object.extend("ChatRoom");
  const roomPointer = new ChatRoom();
  roomPointer.id = chatRoomId;

  message.set("body", text);
  message.set("chat", roomPointer);
  message.set("sender", Parse.User.current());
  message.set("deliveredAt", new Date());

  const acl = new Parse.ACL();
  acl.setReadAccess(Parse.User.current(), true);
  acl.setWriteAccess(Parse.User.current(), true);
  message.setACL(acl);

  const savedMessage = await message.save();

  return savedMessage;
}

export async function setSubscriptionToMessages(chatRoomId, onMessageCreated) {
  try {
    // set pointer to chatroom
    const ChatRoom = Parse.Object.extend("ChatRoom");
    const roomPointer = new ChatRoom();
    roomPointer.id = chatRoomId;

    // create a query for messages in the chatroom
    const query = new Parse.Query("Message");
    query.equalTo("chat", roomPointer); // only messages from the created chatroom
    query.ascending("createdAt"); // newest messages first
    query.include("sender"); // query should also return who the sender is

    const subscription = await query.subscribe();

    // Handling new messages live
    // The users subscribe on the creation of every message object created
    subscription.on("create", (msg) => {
      onMessageCreated(msg);
    });

    return subscription;
  } catch (error) {
    console.error("LiveQuery subscription error: ", error);
  }
}

// Recommended subscription cleanup function
export async function unsubscribeFromMessages(subscription) {
  if (subscription) {
    try {
      await subscription.unsubscribe();
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  }
}

/**
 * Load all private notes for a given chat and professional user.
 * Returns { noteId: body, ... }
 */
export async function getNotesForChat(chatId, user) {
  if (!chatId || !user) return {};

  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);

  const chatRoom = new Parse.Object("ChatRoom");
  chatRoom.id = chatId;

  query.equalTo("chat", chatRoom);
  query.equalTo("isPrivate", true);
  query.equalTo("author", user);
  query.ascending("createdAt");

  const results = await query.find();

  const map = {};
  results.forEach((note, index) => {
    const key = `note-${index}-${note.id}`;
    map[key] = note.get("body") || "";
  });

  return map;
}

/**
 * Save notes back to Parse. Deletes old notes, writes new ones.
 */
export async function saveNotesForChat(chatId, user, notesMap) {
  if (!chatId || !user) return;

  // Only save non-empty notes
  const noteTexts = Object.values(notesMap)
    .map((t) => (t || "").trim())
    .filter((t) => t.length > 0);

  if (noteTexts.length === 0) {
    console.log("No non-empty notes, skipping save.");
    return;
  }

  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);

  const chatRoom = new Parse.Object("ChatRoom");
  chatRoom.id = chatId;

  query.equalTo("chat", chatRoom);
  query.equalTo("isPrivate", true);
  query.equalTo("author", user);

  const existing = await query.find();

  if (existing.length > 0) {
    await Parse.Object.destroyAll(existing);
  }

  const newNotes = noteTexts.map((text) => {
    const note = new Note();
    note.set("chat", chatRoom);
    note.set("author", user);
    note.set("body", text);
    note.set("isPrivate", true);
    return note;
  });

  await Parse.Object.saveAll(newNotes);
}
