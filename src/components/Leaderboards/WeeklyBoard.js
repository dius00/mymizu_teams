import ListGroup from 'react-bootstrap/ListGroup'

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


export default function WeekyBoard() {
    return (
       <div className="weeklyboard-container">
         weekly
        <ListGroup>
          {teams.map((team,index) => (
          <ListGroup.Item><strong>{(index+1)}. {team.team_name}</strong><br></br>
          Avg. bottles saved: <strong>{((team.weekly_water/500)/team.members.length)}</strong><br></br>
          Avg. CO<small>2</small> saved: <strong>{((team.weekly_water/500)/team.members.length)*82.8} grams</strong><br></br>
          </ListGroup.Item>)
        )}
        </ListGroup>
      </div>
    )
}