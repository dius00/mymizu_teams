import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {

    /* const currentUser = ??? need some way to check auth and find
    current user here
    */

   const currentUser = true; // just for testing purposes! remove this later :)

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/" />
            }}
        >
        </Route>
    )

}