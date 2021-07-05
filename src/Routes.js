import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Countdown from "./components/Countdown";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <AuthenticatedRoute exact path="/countdowns">
                <Countdown />
            </AuthenticatedRoute>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}