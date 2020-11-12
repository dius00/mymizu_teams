import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Background from './assets/bg4.jpg';
import Landing from "./components/Landing/Landing";
import Login from "./components/Landing/Login";
import Signup from "./components/Landing/Signup";
import TeamDashboard from "./components/TeamDashboard/TeamDashboard";
import Leaderboards from "./components/Leaderboards/Leaderboards";
// import PrivateRoute from "./components/PrivateRoute";
import { Container, Nav, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "./firebase";
import "./App.css";

// const firebase = require("firebase");
// const firebaseui = require("firebaseui");

export default function App() {

	const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // check if a user is logged in
        auth().onAuthStateChanged(user => {
            if(user) {
                console.log("set current user");
                // if a user is currently logged in, store them in state
                setCurrentUser(user);
            }
        })
    }, []);
	

	const logoutUser = async () => {
		console.log("logging out...");
        try {
            await auth().signOut();
            window.location = "/";
        } catch(error) {
            console.log("Logout failed: ", error);
        }
	}

	const invalidRoute = () => "Uh oh! Looks like that page doesn't exist :(";

	return (
		<div id="app" style={{
      backgroundImage:
        `url(${Background})`,
        opacity:'95%'
    }}>
    <Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>


<div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: "975px" }}>

      <Card className="m-3 w-100 d-flex justify-content-center" >
      <Router>
  <Card.Header>
        <Nav className="justify-content-center" activeKey="/home">
        { !currentUser &&
								<Nav.Item>
                  <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                </Nav.Item>
						 }
    { currentUser && <>
							<Nav.Item>
              <Nav.Link as={Link} to={"/dashboard"}>Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link as={Link} to={"/leaderboards"}>Leaderboards</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={ logoutUser }>Logout</Nav.Link>
          </Nav.Item>
						</>}		
  </Nav>
</Card.Header>

<Card.Body className="" >
  			{/* <div className="w-100 d-flex flex-column align-items-center justify-content-center" > */}

						<Switch>
							<Route path="/" exact render={ () => <Landing currentUser={ currentUser } /> } />
							<Route path="/signup" component={ Signup } />
							<Route path="/login" component={ Login } />
							<Route path="/dashboard" render={ () => <TeamDashboard currentUser={ currentUser } /> } />
							<Route path="/leaderboards" render={() => <Leaderboards currentUser={currentUser} /> } />
							<Route component={ invalidRoute } />
						</Switch>
            {/* </div> */}
            </Card.Body>
				</Router>
        </Card>

			</div>
		</Container>
		</div>
	);
	}

