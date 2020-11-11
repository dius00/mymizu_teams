const axios = require('axios')
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const seeds = require('./seeds.json');
admin.initializeApp();
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

//check mymizu user
exports.checkValidUser = functions.https.onRequest(async (req, res) => {
  const userName = req.query.name;
  axios({
    method: 'get',
    url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=${userName}`,
    headers: {
      'Authorization': `Bearer ${test}`//${functions.config().mymizu.key}`
    },
  }).then(data => res.send(true)).catch(error => res.send(false))
});

//see user refill history 
exports.checkUserHistory = functions.https.onRequest(async (req, res) => {
  const userName = req.query.name;
  axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
      headers: {
        'Authorization': `Bearer ${test}`//${functions.config().mymizu.key}`
      },
    }).then(resp => {
      return res.send(resp.data.refills)
    })
    .catch(error => res.send(false))
});

//getSortedTeams 
exports.sortTeams = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams')
  const records = await teamRef.get();
  const mapped = [];
  records.forEach((data) => mapped.push(data.data()))
  const week_sort = [...mapped.sort((a, b) => (b.weekly_water/b.members.length) - (a.weekly_water/a.members.length))]
  const month_sort = [...mapped.sort((a, b) => (b.monthly_water/b.members.length) - (a.monthly_water/a.members.length))]
  res.send([week_sort,month_sort]);
});

//check if team exist if not creates it
exports.checkTeam = functions.https.onRequest(async (req, res) => {
  const team_name = req.query.name;
  console.log(team_name);
  const teamRef = db.collection('teams');
  const record = await teamRef.where('teamname','==', team_name).get();
  if(!record.empty) res.send("A team with that name already exists");
  else{
    const createTeam = {
      teamname: team_name,
      members: [],
      weekly_water: 0,
      monthly_water: 0,
    };
    teamRef.add(createTeam)
    res.send(record.empty);
  }});

  // seeding 
exports.seed = functions.https.onRequest(async (req, res) => {
  const randomTeams = ["abroad", "drive", "rule", "tourist", "still", "you", "depth", "analyst", "particular", "mention", "following", "presentation", "count", "plastic", "midnight", "company", "table", "king", "window", "analysis"];
  for(const team_name of randomTeams) {
  const teamRef = db.collection('teams');
  // eslint-disable-next-line no-await-in-loop
  // const record = await teamRef.where('teamname','==', team_name).get();
  // if(record.empty) {
    const createTeam = {
      teamname: team_name,
      members: [...('a'.repeat(Math.ceil(Math.random()*5)).split(''))].concat("deprecatedotters"),
      weekly_water: Math.floor(Math.random()*15000),
      monthly_water: Math.floor(Math.random()*50000),
    };
    teamRef.add(createTeam)
  // }
}
res.send("seeded");
});

//updates count
exports.updateCount = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams')
  const records = await teamRef.get();
  const response = [];

  records.forEach(async(team) => {
    const update = 0;
    for(const member of team.data().members){
      // console.log(member)
      try{
              // eslint-disable-next-line no-await-in-loop
      const {data} = await axios({
        method: 'get',
        url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${member}`,
        headers: {
          'Authorization': `Bearer ${test}`
        },
      });
      response.push(data);
      console.log("pushed")
    } catch(error) {
      // res.send(error);
    }
  }
  console.log("completed")
      // if(data.isJSON()) response.push('refills');
    // }
  })
  res.send(response);
})

exports.resetWeekly = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams');
  const records = await teamRef.get();
  const result = []
  records.forEach(team => {
    team.ref.update({weekly_water: 0})
  })
res.send("done");
});

exports.resetMonthly = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams');
  const records = await teamRef.get();
  const result = []
  records.forEach(team => {
    team.ref.update({monthly_water: 0})
  })
res.send("done");
});