  
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const seeds = require('./seeds.json')
const axios = require("axios");
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//check mymizu user

//create db user

//create team

//see user

//see team

//see team ordered by water

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

exports.seed = functions.https.onRequest((req, res) => {
  const usersRef = admin.database().ref();
  admin
    .database()
    .ref()
    .set(seeds);
  usersRef.once("value", (data) => {
    res.send(data);
  });
});

//getting data 
exports.showData = functions.https.onRequest((req, res) => {
    const usersRef = admin.database().ref();
    usersRef.once("value", (data) => {
      res.send(data);
    });
  });

exports.showUsers = functions.https.onRequest((req, res) => {
  const usersRef = admin.database().ref("users");
  usersRef.once("value", (data) => {
    res.send(data);
  });
});

exports.showTeams = functions.https.onRequest((req, res) => {
    const teamsRef = admin.database().ref("teams");
    teamsRef.once("value", (data) => {
      res.send(data);
    });
  });

//post requests
exports.addUser = functions.https.onRequest((req, res) => {
  const usersRef = admin.database().ref("users");
  const newUserRef = usersRef.push();
  newUserRef.set({
    user_name: req.query.name,
    mm_user_name: req.query.mm_username,
  });
  usersRef.once("value", (data) => {
    res.send(data);
  });
});

exports.addTeam = functions.https.onRequest((req, res) => {
    const teamsRef = admin.database().ref("teams");
    const newTeamRef = usersRef.push();
    newTeamRef.set({
      team_name: req.query.name,
      members: req.query.memberList,
    });
    teamsRef.once("value", (data) => {
      res.send(data);
    });
  });
  

exports.updateUser = functions.https.onRequest((req, res) => {
  const usersRef = admin.database().ref("users");
  const user = usersRef.child(req.query.user_name);
  user.update({
    nickname: "Amazing Grace",
  });
  user.once("value", (data) => {
    res.send(data);
  });
});


exports.seedDrink = functions.https.onRequest(async (req, res) => {

const {data} = await axios({
method: 'post',
url: 'https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/refills',
headers: {'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'}, 
data: {
  "amount": "1000",
  "tap_id": "1"
}});
console.log(data);
res.send(data);
});


exports.getUserRefill = functions.https.onRequest(async (req, res) => {

  let user = "deprecatedotters";
  const {data} = await axios({
  method: 'get',
  url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${user}`,
  headers: {'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'} ,
  // data: {
  //   "username": "deprecatedotter",
  //   "bottle_size": "500"
  // }
});
  // });
  console.log(data);

  res.send(data);
  });
  

// exports.seed = functions.https.onRequest((req, res) => {
//     const usersRef = admin.database().ref();
//     admin
//       .database()
//       .ref()
//       .set([
//         {
//           user_name: "kenny",
//           mm_user_name: "kenny01123",
//           last_refill_id: 10,
//         },
//         {
//           user_name: "Jose",
//           mm_user_name: "hakuba3301",
//           last_refill_id: 20,
//         },
//         {
//           user_name: "Sivani",
//           mm_user_name: "sivanisivani",
//           last_refill_id: 25,
//         },
//         {
//           user_name: "Antonio",
//           mm_user_name: "dius00",
//           last_refill_id: 19,
//         },
//       ]);
//     usersRef.once("value", (data) => {
//       res.send(data);
//     });
//   });
