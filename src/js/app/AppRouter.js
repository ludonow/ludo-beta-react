import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from "react-router";

import App from './App';
import Login from './Login';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Active from '../active/Active';
import Opened from '../opened/Opened';

// import '../../stylesheets/main.scss';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router 
                history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="playground"></IndexRedirect>
                    <Route path="playground" component={Playground}></Route>
                    <Route path="profile" component={Profile}></Route>
                    <Route path="create" component={Create}></Route>
                    <Route path="friend" component={Friend}></Route>
                    <Route path="active" component={Active}></Route>
                    <Route path="opened" component={Opened}></Route>
                    <Route path="login" component={Login}></Route>
                </Route>
            </Router>
        );
    }
};
