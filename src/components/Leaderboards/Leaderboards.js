import WeeklyBoard from "./WeeklyBoard";
import MonthlyBoard from "./MonthlyBoard";
import {Card, Nav} from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import axios from "axios"

export default function Leaderboards({ currentUser }) {
  if(!currentUser) window.location="/"

  const [listView, setListView] = useState("monthly");
  const [monthly, setMonthly] = useState([]);
  const [weekly, setWeekly] = useState([]);
  useEffect( ()=> {
     async function getLeaderBoard() {
       const {data} = await axios.get("https://us-central1-mymizuteams.cloudfunctions.net/sortTeams");
       setWeekly(data[0]);
       setMonthly(data[1]);
    }
    getLeaderBoard();
},[]);

    return (
      <Card className="mt-4 mr-2 ml-2 mb-2" >
  <Card.Header>
  <Nav fill variant="tabs" defaultActiveKey="#monthly" >
      <Nav.Item>
        <Nav.Link href="#weekly" onClick={() => setListView("weekly")}>Weekly</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#monthly" onClick={() => setListView("monthly")}>Monthly</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#alltimes" disabled>
          All Time
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
  { listView==="weekly" && <WeeklyBoard weeklySorted={weekly}/>}
  { listView==="monthly" && <MonthlyBoard monthlySorted={monthly}/>}
  </Card.Body>
</Card>
    )
}