import Parse from "parse";

console.log("Parse is:", Parse);
console.log("keys:", Object.keys(Parse));
console.log("init:", Parse.initialize);

Parse.initialize("zMmQlW49bZ8poXbFzKOokRbWvlwJf2Jd9BYqjvTI",
    "LmonXzQwyZ5p5qp1TxiI3tVrRcg2PZ89ug9I5iai");

Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;