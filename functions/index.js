  const axios = require('axios')
  const token = '7|qKwFQjE33LhkoKQg3WomPzF5zu6dHw4twHJ3upmt'
  // axios.defaults.baseURL = 'https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api'
  // axios.defaults.headers = {'Authorization': `bearer ${token}`}


  const functions = require("firebase-functions");
  const admin = require("firebase-admin");
  const seeds = require('./seeds.json')
  admin.initializeApp();


  // // Create and Deploy Your First Cloud Functions
  // // https://firebase.google.com/docs/functions/write-firebase-functions

  //check mymizu user

  exports.checkValidUser = functions.https.onRequest(async (req, res) => {
    const userName = req.query.name;
    axios({
      method: 'get',
      url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=${userName}`,
      headers: {
        'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'
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
          'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'
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
          'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'
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
                         .map(one=>one.amount);
        Promise.all(history).then((value) => {
          let result = 0;
          for(let amount of value) result+=value;
          res.send(result)
          return;}).catch((error)=>console.log(error));
          return;
      });



  // });
  //get Monthly volume by User
  exports.getUserMonthlyVolume = functions.https.onRequest(async (req, res) => {
    const userName = req.query.name;
    axios({
        method: 'get',
        url: `https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername/refills?username=${userName}`,
        headers: {
          'Authorization': 'Bearer 8|PXsa6gAg0ptkiSFpxWVUlPlKj6QCQ93xGCh4cWeY'
        },
      }).then(resp => {
        let result=0;
        let history = resp.data.refills;
        let curDate = new Date();
        let curMonth = curDate.getMonth();
        let curYear = curDate.getFullYear();
        //Target date is new than a certain date
        history = history.filter(one => new Date(one.created_at) > new Date(curYear, curMonth))
                         .map(one => one.amount);
        // for (const amount of history) result+=amount;
        return res.send(history);
      })
      .catch(error => res.send(false))
  });


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
