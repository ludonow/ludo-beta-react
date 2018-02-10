import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import axios from '../axios-config';

import ActiveForBystander from '../active/active-for-bystander/ActiveForBystander';
import ActiveForPlayer from '../active/active-for-player/ActiveForPlayer';
import App from './App';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Invite from '../create/Invite';
import LogIn from './LogIn.js';
import LudoEdit from '../ludo-edit/LudoEdit';
import MobileReportForm from '../active/mobile-report-form/MobileReportForm';
import OpenedForStarter from '../opened/opened-for-starter/OpenedForStarter';
import OpenedForBystander from '../opened/opened-for-bystander/OpenedForBystander';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';
import SignUp from './SignUp';
import Template from '../create/Template';
import LoadingPage from '../LoadingPage';
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

const ludoPageArray = [
    OpenedForBystander,
    OpenedForStarter,
    OpenedForBystander,
    ActiveForPlayer,
    ActiveForPlayer,
    ActiveForBystander,
    ActiveForPlayer,
    Template,
    Template,
    Template
];

// TODO: modify auth 6 to ActiveForBystander
const ludoPageArrayForEdit = ludoPageArray.slice(0, 1).concat([LudoEdit], ludoPageArray.slice(2));

const isLoggedIn = (nextState, replace, callback) => {
    /* TODO: Look up the detail usage of replace function */
    axios.get('/apis/user')
    .then((response) => {
        if (response.data.status != '200') {
            if (window.confirm('登入後即可使用該功能！點選「確定」後進入登入頁面。')) {
                browserHistory.push('/login');
            }
        } else {
            callback();
        }
    })
    .catch((error) => {
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
        if (response.data.status === '200') {
            router_ludoPageIndex = response.data.auth;
            router_currentFormValue = response.data.ludo;
            router_currentLudoId = response.data.ludo.ludo_id;
            callback();
        } else {
            if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        }
    })
    .catch((error) => {
        if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
            window.open("https://www.facebook.com/messages/t/ludonow");
        }
    });
};

const ludoEditRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    axios.get(`/apis/ludo/${ludo_id}`)
    .then((response) => {
        if (response.data.status === '200') {
            if (response.data.auth != 1) {
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
            if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        }
    })
    .catch((error) => {
        if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
            window.open("https://www.facebook.com/messages/t/ludonow");
        }
    });
};

/* TODO: find out usage of getComponent callback */
export default class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route
                        component={App}
                        path="/"
                    >
                        <IndexRedirect to="playground" />
                        <Route
                            component={Create}
                            onEnter={isLoggedIn}
                            path="create"
                        />
                        <Route
                            component={Friend}
                            onEnter={isLoggedIn}
                            path="friend"
                        />
                        <Route
                            component={Invite}
                            onEnter={isLoggedIn}
                            path="invite/:friend_id"
                        />
                        <Route
                            component={LogIn}
                            path="login"
                        />
                        <Route
                            component={LoadingPage}
                            path="loading/:ludo_id"
                        />
                        <Route
                            component={LoadingPage}
                            path="loading"
                        />
                        <Route
                            component={LoadingPage}
                            path="redirect/:temp_ludo_id"
                        />
                        <Route
                            getComponent={(nextState, cb) => {
                                const Component = ludoPageArray[router_ludoPageIndex];
                                cb(
                                    null,
                                    props =>
                                        <Component
                                            {...props} 
                                            router_currentFormValue={router_currentFormValue}
                                            router_currentLudoId={router_currentLudoId}
                                        />
                                );
                            }}
                            onEnter={ludoRedirect}
                            path="ludo/:ludo_id"
                        />
                        <Route
                            getComponent={(nextState, cb) => {
                                cb(
                                    null,
                                    props =>
                                        <MobileReportForm
                                            {...props}
                                            router_currentFormValue={router_currentFormValue}
                                            router_currentLudoId={router_currentLudoId}
                                        />
                                );
                            }}
                            onEnter={ludoRedirect}
                            path="ludo/:ludo_id/mobile-report-form"
                        />
                        <Route
                            getComponent={(nextState, cb) => {
                                const Component = ludoPageArrayForEdit[router_ludoPageIndex];
                                cb(
                                    null,
                                    props =>
                                        <Component
                                            {...props}
                                            router_currentFormValue={router_currentFormValue}
                                            router_currentLudoId={router_currentLudoId}
                                        />
                                );
                            }} 
                            onEnter={[isLoggedIn, ludoEditRedirect]}
                            onLeave={ludoRedirect}
                            path="ludo-edit/:ludo_id"
                        />
                        <Route
                            component={Playground}
                            path="playground"
                        />
                        <Route
                            component={Profile}
                            onEnter={isLoggedIn}
                            path="profile(/:userId)"
                        />
                        <Route
                            component={SignUp}
                            path="signup"
                        />
                    </Route>
                </Router>
                <MediaQuery minDeviceWidth={768}>
                    <MessengerCustomerChat
                        appId="1075325352502513"
                        pageId="1557980337838066"
                    />
                </MediaQuery>
            </div>
        );
    }
}
