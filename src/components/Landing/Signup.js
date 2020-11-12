import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { auth } from '../../firebase.js'


export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const history = useHistory();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const submitSignup = async (event) => {
        event.preventDefault();
		console.log("submitting form...");
		console.log(passwordRef.current.value, emailRef.current.value);
		
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			console.log("Passwords do not Match");
		}

        try {
			setError("");
			setLoading(true);
            await auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
			const user = await auth().currentUser;
			await user.updateProfile({ 
                displayName: usernameRef.current.value,
            });
            console.log("registered and logged in!");
            history.push("/");
        } catch(error) {
      return setError(error.message);
  		}
		setLoading(false);
    }

    return (
      <div className="w-100 d-flex justify-content-center landing-container">

		<Card className="p-4" style={{ maxWidth: "500px" }}>
			<div className="text-center">
				<img
					id="logo"
          src="https://static1.squarespace.com/static/5d2bebc1fc9ee70001122846/t/5dfc1ac767217d42bdd153a6/1605008796817/"
          alt="my mizu logo"
				></img>
				<h2 className="text-center mb-4">Sign up </h2>
				<h6>Make your own myMizu team: </h6>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={submitSignup}>
					<Form.Group id="username">
						<Form.Label>My Mizu Username</Form.Label>
						<Form.Control placeholder="save_the_planet" type="username" ref={usernameRef} />
					</Form.Group>
					<Form.Group id="email">
						<Form.Label >Email</Form.Label>
						<Form.Control placeholder="john@smith.com"type="email" ref={emailRef} />
					</Form.Group>
					<Form.Group id="password">
						<Form.Label >
							Create a password
						</Form.Label>
						<Form.Control type="password" placeholder="Create a password" ref={passwordRef} />
					</Form.Group>
					<Form.Group id="confirm-password">
						<Form.Label >
							Confirm your password
						</Form.Label>
						<Form.Control type="password" placeholder="Confirm your password"ref={passwordConfirmRef} />
					</Form.Group>

					<Button type="submit">Sign up</Button>
				</Form>
			</div>
		</Card>
    </div>
    )
}
