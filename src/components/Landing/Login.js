import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase";

export default function Login() {
    const emailRef = useRef();
	const passwordRef = useRef();
    const history = useHistory();

    const submitLogin = async (event) => {
        event.preventDefault();
        console.log("submit login...");

        try {
            await auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
            console.log("logged in!");
            // redirect users to dashboard once they're logged in
            history.push("/dashboard");

        } catch(error) {
            console.log("Error logging in: ", error);
        }
    }

    return (
        <div className="login-container">
            <h1>Login to your mymizu teams account: </h1>
            <form>
                <input type="text" placeholder="Email" ref={emailRef}></input>
                <input type="text" placeholder="Password" ref={passwordRef}></input>
                <button 
                    onClick={ submitLogin }
                    type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}