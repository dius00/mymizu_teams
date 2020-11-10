import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import './App.css';
import Landing from "./components/Landing/Landing";
import Login from "./components/Landing/Login";
import Signup from "./components/Landing/Signup";
import TeamDashboard from "./components/TeamDashboard/TeamDashboard";
import Leaderboards from "./components/Leaderboards/Leaderboards";
import PrivateRoute from "./components/PrivateRoute";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
// const firebase = require("firebase");
// const firebaseui = require("firebaseui");

export default function App() {
	
	// TODO: set current user after authentication!
	const currentUser = true; // just for testing; remove later :)

	const logoutUser = async () => {
		
		try {
			// TODO: logs out currently logged in user
			// assuming logout works, redirect to landing:
			window.location = "/";			
		} catch(error) {
			console.error(error);
		}
	}

	const invalidRoute = () => "Uh oh! Looks like that page doesn't exist :(";

	return (
    <Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
							{/* <PrivateRoute exact path="/" component={Dashboard} /> */}
							{/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
              <Route path="/" exact component={ Landing } />

							{/* <Route path="/forgot-password" component={ForgotPassword} /> */}
              <PrivateRoute path="/dashboard" exact component={ TeamDashboard } />
							<PrivateRoute path="/leaderboards" exact component={ Leaderboards } />
							<Route component={ invalidRoute } />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
		// <div>
		// <Router>
		// 			<div className="app">
		// 					{ !currentUser &&
		// 						<nav className="main-nav">
		// 							<Link to="/">Home</Link>
		// 						</nav>
		// 					}
		// 					{ currentUser &&
		// 						<nav className="main-nav">
		// 							<Link to="/dashboard">Team Dashboard</Link>
		// 							<Link to="/leaderboards">Leaderboards</Link>
		// 							<a href="#!" onClick={ logoutUser }>Logout</a>
		// 						</nav>
		// 					}						<Switch>
		// 					<Route path="/" exact component={ Landing } />
		// 					<Route path="/login" exact component={ Login } />
		// 					<Route path="/signup" exact component={ Signup } />
							
		// 				</Switch>
		// 			</div>
		// 		</Router>
		// </div>
	);
	}

