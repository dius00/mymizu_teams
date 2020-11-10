import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();

    const submitLogin = async () => {
        // try logging in with auth
        // if it works, take them to team dashboard
        history.push("/dashboard");
    }

    return (
        <div className="login-container">
            <h1>Login to your mymizu teams account: </h1>
            <button onClick={ submitLogin }>Login</button>
        </div>
    )
}