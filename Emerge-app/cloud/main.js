/** Create a chatroom
 * This creates a safe way of accessing the _User table since cloud runs the code on the server instead of the client.
 * Thus not exposing the data.
 * For now we will have this code in the back4app.
 * Later we will deploy it from here by following these steps:
 * 1. npm install -g b4a
 * 2. b4a login (uses Lukas github login)
 * 3. (in root folder run) b4a init
 * 4. Create a b4a.json in root folder
 * 5. should contain:
 * {
  "apps": {
    "default": {
      "applicationId": "YOUR_APP_ID",
      "masterKey": null,
      "javascriptKey": null
    }
  },
  "currentApp": "default",
  "cloud": "./cloud"
}
  6. (deploy by running) b4a deploy
 */

const crypto = require("crypto");

Parse.Cloud.define("createNewChatRoom", async () => {
  const deleteAfter = new Date(Date.now());
  deleteAfter.setUTCDate(deleteAfter.getUTCDate() + 30);

  // Find random Professional user
  const user = new Parse.User();
  const userQuery = new Parse.Query(user);
  userQuery.equalTo("roleLabel", "Professional");
  userQuery.limit(50);
  const allProfUsers = await userQuery.find({ useMasterKey: true }); //might have to remove useMasterKey since it overrides everything

  const randomProfUser =
    allProfUsers[Math.floor(Math.random() * allProfUsers.length)]; // random prof user

  const setProfUser = await userQuery.get("kbi2p0aoXq", { useMasterKey: true }); // constant user for testing.

  const anonPassword = crypto.randomBytes(32).toString("hex");
  // Create a new anonymous user
  const anonUser = new Parse.User();
  anonUser.set("username", "anon_" + Date.now());
  anonUser.set("password", anonPassword);
  anonUser.set("roleLabel", "Anonymous");
  anonUser.set("fullName", "Anon Ymous");

  const newAnon = await anonUser.signUp(null, { useMasterKey: true });

  // Create new Chat Room
  const newChatRoom = new Parse.Object("ChatRoom");
  newChatRoom.set("pro", setProfUser);
  newChatRoom.set("anon", newAnon);
  newChatRoom.set("status", "open");
  newChatRoom.set("deleteAfter", deleteAfter);
  newChatRoom.set("anonDisplayName", "anon" + Date.now());

  // Set ACL so only pro/anon can read/write to chatroom
  const acl = new Parse.ACL();

  acl.setReadAccess(setProfUser, true);
  acl.setWriteAccess(setProfUser, true);
  acl.setReadAccess(newAnon, true);
  acl.setWriteAccess(newAnon, true);

  newChatRoom.setACL(acl);

  const savedRoom = await newChatRoom.save(null, { useMasterKey: true });

  return {
    chatRoomId: savedRoom.id,
    anonUserId: newAnon.id,
    anonUserName: newAnon.get("username"),
    anonPassword: anonPassword,
  };
});

Parse.Cloud.define("getMessages", async (request) => {
  // request contains all params given to cloud code and current user logged in
  const { roomId } = request.params;
  if (!roomId) throw "roomId is required";

  // pointer to chatroom
  const ChatRoom = Parse.Object.extend("ChatRoom");
  const roomPointer = new ChatRoom();
  roomPointer.id = roomId;

  // Get messages from the chatroom (even though empty)
  const Message = Parse.Object.extend("Message");
  const q = new Parse.Query(Message);
  q.equalTo("chat", roomPointer);
  q.ascending("createdAt");
  q.include("sender");
  q.limit(1000); // how many messages to fetch

  const messages = await q.find({ useMasterKey: true });

  return messages;
});

Parse.Cloud.define("deleteChatAndMessages", async (request) => {
  const { roomId } = request.params;
  if (!roomId) throw "roomId is required";

  const ChatRoom = Parse.Object.extend("ChatRoom");
  const Message = Parse.Object.extend("Message");

  // Get the chatroom object
  const currentRoom = await new Parse.Query(ChatRoom).get(roomId, {
    useMasterKey: true,
  });
  if (!currentRoom) throw "Chat room not found";

  // get the pointer to the chatroom
  const roomPointer = new ChatRoom();
  roomPointer.id = roomId;

  // delete all messages that fit the current chatroom
  const msgQuery = new Parse.Query(Message);
  msgQuery.equalTo("chat", roomPointer);
  // msgQuery.limit(1000) <--- unsure about having a limit or not. Could take longer time?
  const messages = await msgQuery.find({ useMasterKey: true });

  await Parse.Object.destroyAll(messages, { useMasterKey: true });

  // delete the chatroom object
  await currentRoom.destroy({ useMasterKey: true });

  return "ok";
});
