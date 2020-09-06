import React from "react";
import Navigation from "./NavigationComponent";
import Dashboard from "./DashboardComponent";
import { Switch, Route, Redirect } from "react-router-dom";

export default class Main extends React.Component {
    render() {
        const HomePage = () => {
            return (
                <div className="container">
                    <h4>Home</h4>
                </div>
            );
        };

        const DashboardPage = () => {
            return <Dashboard />;
        };

        return (
            <div>
                <Navigation />

                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/dashboard" component={DashboardPage} />

                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}
