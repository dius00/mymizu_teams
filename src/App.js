import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Login from "./components/Landing/Login";
import Signup from "./components/Landing/Signup";
import TeamDashboard from "./components/TeamDashboard/TeamDashboard";
import Leaderboards from "./components/Leaderboards/Leaderboards";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {

  return (
    <div>
      <Router>
				<div className="app">
					<nav className="main-nav">
						<Link to="/">Home</Link>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
            <Link to="/dashboard">Team Dashboard</Link>
						<Link to="/leaderboards">Leaderboards</Link>
					</nav>
					<Switch>
						<Route path="/" exact component={ Landing } />
						<Route path="/login" exact component={ Login } />
						<Route path="/signup" exact component={ Signup } />
            <PrivateRoute path="/dashboard" exact component={ TeamDashboard } />
						<PrivateRoute path="/leaderboards" exact component={ Leaderboards } />
            {/* <Route component={NoMatch} /> */}
					</Switch>
				</div>
			</Router>
    </div>
  );
}
