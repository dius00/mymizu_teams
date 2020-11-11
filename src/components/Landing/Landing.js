import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";

export default function Landing( { currentUser }) {

    return (
        <div className="landing-container">
            { !currentUser && 
                <div>
                    <h1> Welcome to mymizu teams! </h1>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            }
            { currentUser &&
                <div>
                  <h1> Welcome back { currentUser.displayName } </h1>
                </div>

            }
        </div>
    )
}