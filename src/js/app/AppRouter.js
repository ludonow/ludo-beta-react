import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import axios from '../axios-config';

import ActiveForBystander from '../active/active-for-bystander/ActiveForBystander';
import ActiveForPlayer from '../active/active-for-player/ActiveForPlayer';
import App from './App';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Invite from '../create/Invite';
import LogIn from './LogIn.js';
import LudoEdit from '../ludo-edit/LudoEdit';
import OpenedForStarter from '../opened/opened-for-starter/OpenedForStarter';
import OpenedForBystander from '../opened/opened-for-bystander/OpenedForBystander';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';
import SignUp from './SignUp';
import Template from '../create/Template';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-84701861-1'); //Unique Google Analytics tracking number

/*
    auth        statement：
    0           not login
    1           stage 1 creator
    2           stage 1 other players
    3           stage 2 playerA (creator)
    4           stage 2 playerB
    5           stage 2 other players
    6           stage 3 all
    7           stage 0 creator
    8           stage 0 other players
    9           stage 0 not login (same as 0, may be modified in the future)
*/

const ludoPageArray = [OpenedForBystander, OpenedForStarter, OpenedForBystander, ActiveForPlayer, ActiveForPlayer, ActiveForBystander, ActiveForBystander, Template, Template, Template];
const ludoPageArrayForEdit = [OpenedForBystander, LudoEdit, OpenedForBystander, ActiveForPlayer, ActiveForPlayer, ActiveForBystander, ActiveForBystander, Template, Template, Template];

const isLoggedIn = (nextState, replace, callback) => {
    /* TODO: Look up the detail usage of replace function */
    axios.get('/apis/user')
    .then((response) => {
        if(response.data.status != '200') {
            replace('/login');
        }
        callback();
    })
    .catch((error) => {
        console.error('AppRouter isloggedin error');
        callback(error);
    })
};

let router_ludoPageIndex = null;
let router_currentFormValue = {};
let router_currentLudoId = '';

const ludoRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    axios.get(`/apis/ludo/${ludo_id}`)
    .then((response) => {
        if(response.data.status === '200') {
            router_ludoPageIndex = response.data.auth;
            router_currentFormValue = response.data.ludo;
            router_currentLudoId = response.data.ludo.ludo_id;
            callback();
        } else {
            window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('AppRouter ludoRedirect getCurrentLudoData else response from server: ', response);
            console.error('AppRouter ludoRedirect getCurrentLudoData else message from server: ', response.data.message);
            if (response.data.err) {
                console.error('AppRouter ludoRedirect getCurrentLudoData else error from server: ', response.data.err);
            }
        }
    })
    .catch((error) => {
        window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        console.error('AppRouter ludoRedirect getCurrentLudoData error', error);
    });
};

const ludoEditRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    axios.get(`/apis/ludo/${ludo_id}`)
    .then((response) => {
        if(response.data.status === '200') {
            if(response.data.auth != 1) {
                /* TODO: Figure out how to use same url redirect to other component */
                callback();
                browserHistory.push(`/ludo/${ludo_id}`);
            } else {
                router_ludoPageIndex = response.data.auth;
                router_currentFormValue = response.data.ludo;
                router_currentLudoId = response.data.ludo.ludo_id;
                callback();
            }
        } else {
            window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('AppRouter ludoRedirect getCurrentLudoData else response from server: ', response);
            console.error('AppRouter ludoRedirect getCurrentLudoData else message from server: ', response.data.message);
            if (response.data.err) {
                console.error('AppRouter ludoRedirect getCurrentLudoData else error from server: ', response.data.err);
            }
        }
    })
    .catch((error) => {
        window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        console.error('AppRouter ludoRedirect getCurrentLudoData error', error);
    });
};

function GATracking() {
    ReactGA.pageview(window.location.hash);
}

/* TODO: find out usage of getComponent callback */
export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory} onUpdate={GATracking}>
                <Route path="/" component={App}>
                    <IndexRedirect to="playground"></IndexRedirect>
                    <Route path="create" component={Create} onEnter={isLoggedIn}></Route>
                    <Route path="friend" component={Friend} onEnter={isLoggedIn}></Route>
                    <Route path="invite/:friend_id" component={Invite} onEnter={isLoggedIn}></Route>
                    <Route path="login" component={LogIn}></Route>
                    <Route
                        path="ludo/:ludo_id"
                        getComponent={(nextState, cb) => {
                            const Component = ludoPageArray[router_ludoPageIndex];
                            cb(null, props => 
                                <Component 
                                    {...props} 
                                    router_currentFormValue={router_currentFormValue}
                                    router_currentLudoId={router_currentLudoId}
                                />);
                        }} 
                        onEnter={ludoRedirect}
                    >
                    </Route>
                    <Route
                        path="ludo-edit/:ludo_id"
                        getComponent={(nextState, cb) => {
                            const Component = ludoPageArrayForEdit[router_ludoPageIndex];
                            cb(null, props => 
                                <Component 
                                    {...props}
                                    router_currentFormValue={router_currentFormValue}
                                    router_currentLudoId={router_currentLudoId}
                                />);
                        }} 
                        onEnter={isLoggedIn, ludoEditRedirect}
                        OnLeave={ludoRedirect}
                    >
                    </Route>
                    <Route path="playground" component={Playground}></Route>
                    <Route path="profile(/:userId)" component={Profile} onEnter={isLoggedIn}></Route>
                    <Route path="signup" component={SignUp}></Route>
                </Route>
            </Router>
        );
    }
}