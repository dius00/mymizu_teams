import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect } from 'react'

export default function WeekyBoard({weeklySorted}) {
  const [avgView, setAvgView] = useState(true);
  // useEffect(()=>setAvgView(true),[]);
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

      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Team Name</th>
      <th>{avgView ? "Bottles saved per person" : "Total bottles saved" } </th>
      <th>CO<small><strong>2</strong></small> saved {avgView ? "per person" : "in total" } </th>
    </tr>
  </thead>
  <tbody>
  {weeklySorted.map((team,index) => (
    <tr key={index}>
    <td>{index+1}</td>
    <td>{team.teamname}</td>
    <td>{avgView ? ((team.weekly_water/500)/team.members.length).toFixed(1) : (team.weekly_water/500).toFixed(1)} units</td>
    <td>{avgView ? (((team.weekly_water/500)/team.members.length)*82.8).toFixed(1) : ((team.weekly_water/500)*82.8).toFixed(1)} gr.</td>
    </tr>))}
  </tbody>
</Table>
</div>
    )
}