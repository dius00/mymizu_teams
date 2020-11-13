import TeamRegistration from "./TeamRegistration";
import TeamStats from "./TeamStats";
import axios from "axios";
import React, {useState, useEffect} from "react"

export default function TeamDashboard({currentUser}) {
  if (!currentUser) window.location = "/404";
  const template = {
    teamname: '',
    weekly_water: 0,
    monthly_water: 0,
    members: [false]
  }
  const [teamStats, setTeamStats] = useState(template);

  useEffect(() => {
    async function getTeamStat () {
     const {data} = await axios.get(`https://us-central1-mymizuteams.cloudfunctions.net/getTeamFromUser?member=${currentUser.displayName}`);
     console.log(data);
     setTeamStats(data)
    }
    getTeamStat();
  },[])

	return (
		<div className="container">
		{ !teamStats && <TeamRegistration /> }
    { teamStats && <TeamStats teamStats={teamStats}/> }

		</div>
	);
}
