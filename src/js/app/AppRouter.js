import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import axios from '../axios-config';

import ActiveForBystander from '../active/active-for-bystander/ActiveForBystander';
import ActiveForPlayer from '../active/active-for-player/ActiveForPlayer';
import App from './App';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Login from './Login';
import OpenedForStarter from '../opened/opened-for-starter/OpenedForStarter';
import OpenedForBystander from '../opened/opened-for-bystander/OpenedForBystander';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';

// import '../../stylesheets/main.scss';

const isLoggedIn = (nextState, replace, callback) => {
    // TODO: Look up the detail usage of replace function
    axios.get('apis/user').
    then(response => {
        if(response.data.status != '200') {
            replace(`/login`);
        }
        callback();
    })
    .catch(error => {
        console.log('isloggedin error');
        console.log(response.data.message);
        callback(error);
    })
};

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="playground"></IndexRedirect>
                    <Route path="active-for-bystander/:ludoId" component={ActiveForBystander}></Route>
                    <Route path="active-for-player/:ludoId" component={ActiveForPlayer}></Route>
                    <Route path="create" component={Create} onEnter={isLoggedIn}></Route>
                    <Route path="friend" component={Friend}></Route>
                    <Route path="login" component={Login}></Route>
                    <Route path="opened-for-starter/:ludoId" component={OpenedForStarter}></Route>
                    <Route path="opened-for-bystander/:ludoId" component={OpenedForBystander}></Route>
                    <Route path="playground" component={Playground}></Route>
                    <Route path="profile/:userId" component={Profile}></Route>
                </Route>
            </Router>
        );
    }
};
