import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

// import Login from "./Login";
// import Signup from "./Signup";

export default function Landing({ currentUser }) {
	if (currentUser) window.location = "/dashboard";

	return (
		<div className="w-100 d-flex justify-content-center landing-container">
			<Card id="card" >
				{/* <Card.Header>Featured</Card.Header>  */}
				<div className="text-center">
					<img
						id="logo"
						src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
						alt="my mizu logo"
					></img>
					<Card.Body>
						<h3>
							<Card.Title id="title">Welcome to mymizu teams</Card.Title>
						</h3>
						{currentUser && (
							<Card.Text id="label-desc">
								Welcome back <strong>{currentUser.displayName}</strong>
							</Card.Text>
						)}
						{!currentUser && (
							<>
								<Card.Text id="label-desc">
									{" "}
									Join the next step in the recycling revolution.
								</Card.Text>
								<div className="mx-auto">
									<Button
										className="mt-2 mr-2"
										variant="primary"
										as={Link}
										to={"/login"}
									>
										Login
									</Button>
									<Button
										className="mt-2 mr-2"
										variant="primary"
										as={Link}
										to={"/signup"}
									>
										Sign Up
									</Button>
								</div>
							</>
						)}
					</Card.Body>
				</div>
			</Card>
		</div>
	);
}
