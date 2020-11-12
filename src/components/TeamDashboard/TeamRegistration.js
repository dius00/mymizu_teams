import React, { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function TeamRegistration() {
	const teamNameRef = useRef();
	const username1Ref = useRef();
	const username2Ref = useRef();
	const username3Ref = useRef();
	const username4Ref = useRef();
	const username5Ref = useRef();

	const submitTeam = async event => {
		event.preventDefault();
		console.log("submitting team form...");

		try {
			// TODO:
			// verify all usernames exist
			// submit team info to our db
		} catch (error) {
			return console.log(error.message);
		}
	};

	return (
		<div className="container-fluid">
			<Card id="card">
				<div className="text-center">
					<h3 className="text-center mb-4" id="title">
						Create a team
					</h3>
					<Form onSubmit={submitTeam} className="text-left">
						<Form.Group id="form">
							<Form.Label id="label">Team name</Form.Label>
							<Form.Control
								type="username"
								ref={teamNameRef}
								placeholder="Enter a team name"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Label id="label">Team admin</Form.Label>
							<Form.Control
								type="username"
								ref={username1Ref}
								placeholder="Enter your mymizu username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Label id="label">Teammates</Form.Label>
							<Form.Control
								type="username"
								ref={username2Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username3Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username4Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username5Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<div className="text-center" id="button">
							<Button type="submit">Create team</Button>
						</div>
					</Form>
				</div>
			</Card>
		</div>
	);
}
