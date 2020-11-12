import React, { useState, useRef } from "react";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const username = useRef();
	const { signup } = useAuth();
	const history = useHistory;

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function submitSignup(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not Match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.pushState("/");
		} catch {
			setError("Failed to create account");
		}
		setLoading(false);
	}

	return (
		<Card>
			<div className="text-center">
				<img
					id="logo"
					src="https://static1.squarespace.com/static/5d2bebc1fc9ee70001122846/t/5dfc1ac767217d42bdd153a6/1605008796817/"
				></img>
				<h2 className="text-center mb-4" id="title">
					Sign up{" "}
				</h2>
				<h6 id="label-desc">Let's save the planet together</h6>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={submitSignup} className="text-left">
					<Form.Group id="form">
						<Form.Label id="label">mymizu username</Form.Label>
						<Form.Control
							type="username"
							ref={username}
							placeholder="Enter your mymizu username"
						/>
					</Form.Group>
					<Form.Group id="form">
						<Form.Label id="label">Email</Form.Label>
						<Form.Control
							type="email"
							ref={emailRef}
							placeholder="Enter your email"
						/>
					</Form.Group>
					<Form.Group id="form">
						<Form.Label id="label"> Password</Form.Label>
						<Form.Control
							type="password"
							ref={passwordRef}
							placeholder="Create a password"
						/>
					</Form.Group>

					<Form.Group id="form">
						<Form.Label id="label"> Confirm your password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm your password"
							ref={passwordConfirmRef}
						/>
					</Form.Group>
					<div className="text-center" id="button">
						<Button type="submit">Sign up</Button>
					</div>
				</Form>
			</div>
		</Card>
	);
}
