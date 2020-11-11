import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../firebase";

export default function PrivateRoute({ component: RouteComponent, currentUser, ...rest }) {
    console.log("private route current user ", auth().currentUser);

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <RouteComponent {...props} /> : <Redirect to="/" />
            }}
        >
        </Route>
    )

}