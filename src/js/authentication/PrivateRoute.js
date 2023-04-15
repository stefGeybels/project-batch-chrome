import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticatedUser from "./User";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AuthenticatedUser.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
)
