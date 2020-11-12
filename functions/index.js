  const axios = require('axios')
  // const token = process.env.TOKEN;

  // axios.defaults.baseURL = 'https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api'
  // axios.defaults.headers = {'Authorization': `bearer ${token}`}


  const functions = require("firebase-functions");
  const admin = require("firebase-admin");
  const seeds = require('./seeds.json')
  admin.initializeApp();


  // // Create and Deploy Your First Cloud Functions
  // // https://firebase.google.com/docs/functions/write-firebase-functions


  exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
  });


  //check mymizu user

  exports.checkValidUser = functions.https.onRequest(async (req, res) => {
    const userName = req.query.name;
    console.log(userName);
    try{
    const { data } = await axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=${userName}`,
      headers: {
        'Authorization': `Bearer ${functions.config().mymizu.key}`//${functions.config().mymizu.key}`
      },
    });
    res.send(true);
    }catch(error) {
      res.send(false)
    }
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
  const record = await teamRef.where('teamname','==', team_name).get();
  if(record.empty) {
    const rand = Math.ceil(Math.random()*5);
    const fakeMemberList = new Array (rand).fill(false);
    fakeMemberList.push('deprecatedlemur')
    const createTeam = {
      teamname: team_name,
      members: fakeMemberList,
      weekly_water: Math.floor(Math.random()*15000),
      monthly_water: Math.floor(Math.random()*50000),
    };
    teamRef.add(createTeam)
  }
}
res.send("seeded");
});

// resets weekly total
exports.resetWeekly = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams');
  const records = await teamRef.get();
  const result = []
  records.forEach(team => {
    team.ref.update({weekly_water: 0})
  })
res.send("done");
});

// resets monthly total
exports.resetMonthly = functions.https.onRequest(async (req, res) => {
  const teamRef = db.collection('teams');
  const records = await teamRef.get();
  const result = []
  records.forEach(team => {
    team.ref.update({monthly_water: 0})
  })
res.send("done");
});

// add bogus refill
exports.addLemurRefill = functions.https.onRequest(async (req, res) => {
  try{
  const {data} = await axios({
    method: 'post',
    url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/refills`,
    headers: {
      'Authorization': `Bearer ${functions.config().mymizu.key}`
    },
    data: {
      tap_id: 1,
      amount: 500,
    }});
    res.send(data);
} catch(error) {
  res.send(error);
}});

// get user monthly volume
exports.getUserMonthlyVolume = functions.https.onRequest(async (req, res) => {
  const userName = req.query.name;
  axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
      headers: {
        'Authorization': `Bearer ${functions.config().mymizu.key}`
      },
    }).then(resp => {
      let result=0;
      let history = resp.data.refills;
      let curDate = new Date();
      let curMonth = curDate.getMonth();
      let curYear = curDate.getFullYear();
      //Target date is new than a certain date
      history = history.filter(one => new Date(one.created_at) > new Date(curYear, curMonth))
                       .map(one => one.amount)
                       .reduce((a,b)=>a+b);
      // for (const amount of history) result+=amount;

      return res.json(history);
    })
    .catch(error => res.send(false))
});

// get user weekly volume
exports.getUserWeeklyVolume = functions.https.onRequest(async (req, res) => {
  const userName = req.query.name;
  axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
      headers: {
        'Authorization': `Bearer ${functions.config().mymizu.key}`
      },
    }).then(resp => {
      let history = resp.data.refills;
      let curTime = new Date();
      let curMonth = curTime.getMonth();
      let curYear = curTime.getFullYear();
      let curDate = curTime.getDate();
      let curDay = curTime.getDay();
      //Target date is new than a certain date
      history = history.filter(one => new Date(one.created_at) > new Date(curYear, curMonth, curDate - curDay + 1))
                       .map(one=>one.amount)
                       .reduce((a,b)=>a+b)
      return res.json(history)
    })
    .catch(error => res.send(false))
});

//get and update team volume 
  exports.updateWeeklyVolume = functions.https.onRequest(async (req, res) => {
    const team_name = req.query.name;
    const teamRef = db.collection('teams');
    const record = await teamRef.get();
    record.forEach(async (team) => {
      let result=0;
      for (const member of team.data().members) {
        if(member) {
          try{
        // eslint-disable-next-line no-await-in-loop
        const {data}= await axios.get(`http://localhost:5001/mymizuteams/us-central1/getUserWeeklyVolume?name=${member}`)
        result+=data;
      }catch(error) {console.log(error)}
      }}
      team.ref.update({weekly_water: result});
      })
      res.send("done");
    });



  //seeding 
  exports.seed = functions.https.onRequest((req, res) => {
    const usersRef = admin.database().ref();
    admin
      .database()
      .ref()
      .set(seeds);
    usersRef.once("value", (data) => {
      res.send(data.val());
    });
  });

  //getting data 
  exports.showData = functions.https.onRequest((req, res) => {
    const usersRef = admin.database().ref();
    usersRef.once("value", (data) => {
      res.send(data.val());
    });
  });

  exports.showUsers = functions.https.onRequest((req, res) => {
    const usersRef = admin.database().ref("users");
    usersRef.once("value", (data) => {
      res.send(data.val());
    });
  });

  exports.showTeams = functions.https.onRequest((req, res) => {
    const teamsRef = admin.database().ref("teams")
    teamsRef.once("value", (data) => {
      res.send(data.val())
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
      res.send(data.val());
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
      res.send(data.val());
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
