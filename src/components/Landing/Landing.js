import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";

// import Login from "./Login";
// import Signup from "./Signup";

export default function Landing( { currentUser }) {
  if(currentUser) window.location="/dashboard"

    return (
        <div className="w-100 d-flex justify-content-center landing-container" >
<Card style={{ maxWidth: "500px" }}>
   {/* <Card.Header>Featured</Card.Header>  */}
   <div className="text-center">
				<img
					id="logo"
          src="https://static1.squarespace.com/static/5d2bebc1fc9ee70001122846/t/5dfc1ac767217d42bdd153a6/1605008796817/"
          alt="my mizu logo"
				></img>
  <Card.Body>
    <Card.Title>Welcome to mymizu teams!</Card.Title>
    { currentUser && <Card.Text>Welcome back <strong>{currentUser.displayName}</strong></Card.Text>}
    { !currentUser &&  <><Card.Text> Join the next step in the recycling revolution!</Card.Text>
    <div className="d-flex justify-content-between">
    <Button className="mt-2 mr-2" variant="primary" as={Link} to={"/login"}>Login</Button>
    <Button className="mt-2 mr-2"variant="primary" as={Link} to={"/signup"}>Sign Up</Button>
    </div></>
  }
  </Card.Body>
  </div>

</Card></div>
    )
}