import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
const teams = [
  {
      "team_name": "splashBros",
      "members": ["kenny01123","hakuba3301","heysivani","dius00"],
      "weekly_water": 1000,
      "monthly_water": 5000
    },
    {
      "team_name": "waterBros",
      "members": ["kenny01123","hakuba3301","heysivani","dius00"],
      "weekly_water": 1000,
      "monthly_water": 10
    },
    {
      "team_name": "waterFellas",
      "members": ["kenny01123","hakuba3301","heysivani","dius00"],
      "weekly_water": 1000,
      "monthly_water": 10
    },
    {
      "team_name": "splashBros",
      "members": ["kenny01123","hakuba3301","heysivani","dius00"],
      "weekly_water": 1000,
      "monthly_water": 10
    },
];


export default function MonthlyBoard({monthlySorted}) {
  const [avgView, setAvgView] = useState(true);

    return (
      <div>
<Form.Check 
    className="pb-3"
    type="switch"
    id="custom-switch"
    label="Toogle Average/Total view"
    checked={avgView}
    onChange = {() => setAvgView(!avgView)}
  />
      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Team Name</th>
      <th>{avgView ? "Avg." : "Total" } bottles saved</th>
      <th>{avgView ? "Avg." : "Total" } CO<small><strong>2</strong></small> saved</th>
    </tr>
  </thead>
  <tbody>
  {monthlySorted.map((team,index) => (
    <tr key={index}>
    <td>{index+1}</td>
    <td>{team.teamname}</td>
    <td>{avgView ? ((team.monthly_water/500)/team.members.length).toFixed(1) : (team.monthly_water/500).toFixed(1)} units</td>
    <td>{avgView ? (((team.monthly_water/500)/team.members.length)*82.8).toFixed(1) : ((team.monthly_water/500)*82.8).toFixed(1)} gr.</td>
    </tr>))}
  </tbody>
</Table>
</div>
    )
}



// (
//   <div className="monthlyboard-container">
//     Monthly
//    <ListGroup>
//      {teams.map((team,index) => (
//      <ListGroup.Item><strong>{(index+1)}. {team.team_name}</strong><br></br>
//      Avg. bottles saved: <strong>{((team.monthly_water/500)/team.members.length)}</strong><br></br>
//      Avg. CO<small>2</small> saved: <strong>{((team.monthly_water/500)/team.members.length)*82.8} grams</strong><br></br>
//      </ListGroup.Item>)
//    )}
//    </ListGroup>
//  </div>
// )
// }