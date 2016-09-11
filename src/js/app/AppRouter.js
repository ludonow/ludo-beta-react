import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import axios from 'axios';

import Active from '../active/Active';
import App from './App';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Login from './Login';
import Opened from '../opened/Opened';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';

// import '../../stylesheets/main.scss';

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router 
                history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="playground"></IndexRedirect>
                    <Route path="active" component={Active}></Route>
                    <Route path="create" component={Create}></Route>
                    <Route path="friend" component={Friend}></Route>
                    <Route path="login" component={Login}></Route>
                    <Route path="opened" component={Opened}></Route>
                    <Route path="playground" component={Playground}></Route>
                    <Route path="profile" component={Profile}></Route>
                </Route>
            </Router>
        );
    }
};
