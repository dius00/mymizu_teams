import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

export default function MonthlyBoard({monthlySorted}) {
  const [avgView, setAvgView] = useState(true);

    return (
      <div className="d-flex flex-column align-items-center">
        <p><strong>Teams are ranked based on per person average.</strong></p>
<Form.Check 
    className="pb-3"
    type="switch"
    id="custom-switch"
    label="Select to toggle global team statistics"
    checked={avgView}
    onChange = {() => setAvgView(!avgView)}
  />
      <Table striped bordered hover variant="dark" >
  <thead>
    <tr>
      <th>#</th>
      <th>Team Name</th>
      <th>{avgView ? "Bottles saved per person" : "Total bottles saved" } </th>
      <th>CO<small><strong>2</strong></small> saved {avgView ? "per person" : "in total" } </th>
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
