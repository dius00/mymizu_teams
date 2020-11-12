import React, { useState, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();
	const [error, setError] = useState("");

	const submitLogin = async event => {
		event.preventDefault();
		console.log("submit login...");

		try {
			setError("");
			await auth().signInWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			);
      console.log("logged in!");
      console.log(auth().currentUser.email)
			// redirect users to dashboard once they're logged in
			history.push("/dashboard");
		} catch (error) {
			console.log(error);
			setError(error.message.split(".")[0] + ".");
		}
	};

	return (
		<div className="w-100 d-flex justify-content-center landing-container">
			<Card className="p-4" style={{ maxWidth: "500px" }}>
				<div className="text-center">
					<img
						id="logo"
						src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
						alt="my mizu logo"
					></img>
					<h3 className="text-center mb-4" id="title">
						Login{" "}
					</h3>
					<h6 className="pb-3" id="label-desc">
						Check your score now!{" "}
					</h6>

					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={submitLogin}>
						<Form.Group id="email">
							<Form.Label>e-mail address</Form.Label>
							<Form.Control
								type="email"
								placeholder="john@smith.com"
								ref={emailRef}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								ref={passwordRef}
							/>
						</Form.Group>
						<Button type="submit">Log In</Button>
					</Form>
				</div>
			</Card>
		</div>
	);
}
