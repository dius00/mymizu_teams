  const axios = require('axios')
  // const token = process.env.TOKEN;

  const token = '7|qKwFQjE33LhkoKQg3WomPzF5zu6dHw4twHJ3upmt';
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
    axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=${userName}`,
      headers: {
        'Authorization': `Bearer ${token}`
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
          'Authorization': `Bearer ${token}`
        },
      }).then(resp => {
        return res.send(resp.data.refills)
      })
      .catch(error => res.send(false))
  });


  //get Weekly volume by User
  exports.getUserWeeklyVolume = functions.https.onRequest(async (req, res) => {
    const userName = req.query.name;
    const {data} = await axios({
        method: 'get',
        url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
        let history = data.refills;
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
  //get Monthly volume by User
  exports.getUserMonthlyVolume = functions.https.onRequest(async (req, res) => {
    const userName = req.query.name;
    axios({
        method: 'get',
        url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
        headers: {
          'Authorization': `Bearer ${token}`
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

  //get and update team volume 

  exports.getTeamWeeklyVolume = functions.https.onRequest((req, res) => {
    const targetName = req.query.name;
    const teamsRef = admin.database().ref("teams").orderByChild("team_name").equalTo(targetName)
    teamsRef.once("value", async (data) => {
      let result=0;
      const obj = data.val();
      const memberList = obj[obj.length-1].members;
      for (member of memberList) {
        console.log(member)
        // eslint-disable-next-line no-await-in-loop
        const {data}= await axios.get(`http://localhost:5001/mymizuonline/us-central1/getUserWeeklyVolume?name=${member}`)
        console.log(data)
        result+=data;
      }
      const index = data.node_.children_.root_.key;
      const targetRef = admin.database().ref(`teams/${index}`);
      targetRef.update({weekly_water: result});
      targetRef.once("value", (data) => {
        res.send(data)
      })
    });
  });

  // exports.experiment = functions.https.onRequest((req, res) => {
  //   const targetName = req.query.name;
  //   const teamsRef = admin.database().ref("teams/").orderByChild("team_name").equalTo(targetName)
  //   teamsRef.once("value", (data) => {
  //     const index = data.node_.children_.root_.key;
  //     console.log(index)
  //     const targetRef = admin.database().ref(`teams/${index}`);
  //     targetRef.update({team_name: "fuck"});
  //     targetRef.once("value", (data) => {
  //       res.send(data)
  //     })
  //   });
  // });




  exports.getTeamMonthlyVolume = functions.https.onRequest((req, res) => {
    const targetname = req.query.name;
    const teamsRef = admin.database().ref("teams").orderByChild("team_name").equalTo(targetname)
    teamsRef.once("value", async (data) => {
      let result=0;
      const obj = data.val();
      const memberList = obj[obj.length-1].members;
      for (member of memberList) {
        console.log(member)
        // eslint-disable-next-line no-await-in-loop
        const {data}= await axios.get(`http://localhost:5001/mymizuonline/us-central1/getUserMonthlyVolume?name=${member}`)
        console.log(data)
        result+=data;
      }
      const index = data.node_.children_.root_.key;
      const targetRef = admin.database().ref(`teams/${index}`);
      targetRef.update({monthly_water: result});
      targetRef.once("value", (data) => {
        res.send(data)
      })
    });
  });



  exports.testingThings = functions.https.onRequest(async (req, res) => {
    const {data} = await axios.get('http://localhost:5001/mymizuonline/us-central1/helloWorld')
    console.log(data)
    res.send(data)
  });



  //see team ordered by volume

  exports.weeklyLeaderBoard = functions.https.onRequest((req, res) => {
    const teamsRef = admin.database().ref("teams").orderByChild("weekly_water")
    teamsRef.once("value", (data) => {
      res.send(data.val());
    });
  });

  exports.monthlyLeaderBoard = functions.https.onRequest((req, res) => {
    const teamsRef = admin.database().ref("teams").orderByChild("monthly_water")
    teamsRef.once("value", (data) => {
      res.send(data.val());
    });
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
