import Parse from "parse"; // <-- Important

export async function findRandomProfUser() {
  const user = new Parse.User();
  const userQuery = new Parse.Query(user);
  userQuery.equalTo("roleLabel", "Professional");
  userQuery.limit(50);
  const allUsers = await userQuery.find({ useMasterKey: true }); //might have to remove useMasterKey since it overrides everything

  const randomProfUser = allUsers[Math.floor(Math.random() * allUsers.length)];

  return randomProfUser;
}

export async function createNewAnonUser() {
  const anonUser = new Parse.User();
  anonUser.set("username", "anon_" + Date.now());
  anonUser.set("password", Parse.Object.generateKey());
  anonUser.set("roleLabel", "Anonymous");
  anonUser.set("fullName", "Anon Ymous");

  await anonUser.signUp(null, { useMasterKey: true });

  return anonUser;
}
