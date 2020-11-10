import React, { useState, useRef } from "react";
import { useAuth } from "../../AuthContext";
import {useHistory} from "react-dom"

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const history = useHistory;

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
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
        <div className="signup-container">
            <h1>Sign up to make your own mymizu team: </h1>
        </div>
    )
}
