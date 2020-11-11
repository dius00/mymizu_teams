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
			return console.log("Sign up failed: ", error);
		}
		setLoading(false);
    }

    return (
		<Card>
			<div className="p-3 mb-2 bg-primary text-white">
				<h2 className="text-center mb-4">Sign up </h2>
				<h6>Make your own myMizu team: </h6>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={ submitSignup }>
					<Form.Group id="username">
						<Form.Label>My Mizu Username</Form.Label>
						<Form.Control type="username" ref={usernameRef} />
					</Form.Group>
					<Form.Group id="email">
						<Form.Label placeholder="Email">Email</Form.Label>
						<Form.Control type="email" ref={emailRef} />
					</Form.Group>
					<Form.Group id="password">
						<Form.Label placeholder="Create a password"> Create a password</Form.Label>
						<Form.Control type="password" ref={passwordRef} />
					</Form.Group>
					<Form.Group id="confirm-password">
						<Form.Label placeholder="Confirm your password"> Confirm your password</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef} />
					</Form.Group>

					<Button 
						type="submit">
						Sign up
					</Button>
				</Form>
				</div>
		</Card>
    )
}
