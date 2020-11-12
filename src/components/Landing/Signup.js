import React, { useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { auth } from "../../firebase.js";
import axios from "axios";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const history = useHistory();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const submitSignup = async event => {
    event.preventDefault();
    setLoading(true);
    const {data} = await axios.get(`https://us-central1-mymizuteams.cloudfunctions.net/checkValidUser?name=${usernameRef.current.value}`);
    if(data){
		// console.log("submitting form...");

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError("Passwords do not match");
    }
    else{
		try {
			setError("");
			// setLoading(true);
			await auth().createUserWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			);
			const user = await auth().currentUser;
			await user.updateProfile({
				displayName: usernameRef.current.value,
			});
			console.log("registered and logged in!");
			history.push("/");
		} catch (error) {
			return setError(error.message);
		}
    // setLoading(false);
  }}
  else{
    setError("This is not a valid mymizu username")
  }
  setLoading(false);

	};

	return (
		<Card id="card">
			<div className="text-center">
				<img
					id="logo"
          src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
          alt="my mizu teams"
				></img>
				<h3 className="text-center mb-4" id="title">
					Sign up{" "}
				</h3>
				<h6 id="label-desc">Let's save the planet together</h6>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={submitSignup} className="text-left">
					<Form.Group id="form">
						<Form.Label id="label">mymizu username</Form.Label>
						<Form.Control
							type="username"
							ref={usernameRef}
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
						<Button type="submit" disabled={loading}>Sign up</Button>
					</div>
				</Form>
			</div>
		</Card>
	);
}
