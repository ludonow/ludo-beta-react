import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import axios from '../axios-config';

import ActiveForBystander from '../active/active-for-bystander/ActiveForBystander';
import ActiveForPlayer from '../active/active-for-player/ActiveForPlayer';
import App from './App';
import Create from '../create/Create';
import Friend from '../friend/Friend';
import Login from './Login';
import LudoEdit from '../ludo-edit/LudoEdit';
import OpenedForStarter from '../opened/opened-for-starter/OpenedForStarter';
import OpenedForBystander from '../opened/opened-for-bystander/OpenedForBystander';
import Playground from '../playground/Playground';
import Profile from '../profile/Profile';

const ludoPageArray = [OpenedForBystander, OpenedForStarter, OpenedForBystander, ActiveForPlayer, ActiveForPlayer, ActiveForBystander];
const ludoPageArrayForEdit = [OpenedForBystander, LudoEdit, OpenedForBystander, ActiveForPlayer, ActiveForPlayer, ActiveForBystander];

// import '../../stylesheets/main.scss';

const isLoggedIn = (nextState, replace, callback) => {
    // TODO: Look up the detail usage of replace function
    axios.get('/apis/user')
    .then(response => {
        if(response.data.status != '200') {
            replace(`/login`);
        }
        callback();
    })
    .catch(error => {
        console.log('AppRouter isloggedin error');
        callback(error);
    })
};

let router_ludoPageIndex = null;
let router_currentFormValue = {};

const ludoRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    // console.log('ludoRedirect before get single ludo -- ludo_id', ludo_id);  // debug
    axios.get(`/apis/ludo/${ludo_id}`)
    .then(response => {
        if(response.data.status === '200') {
            router_ludoPageIndex = response.data.auth;
            // console.log('router_ludoPageIndex', router_ludoPageIndex);   // debug
            router_currentFormValue = response.data.ludo;
            // console.log('router_currentFormValue', router_currentFormValue);   // debug
            callback();
        } else {
            // console.log('AppRouter ludoRedirect getCurrentLudoData else response from server: ', response);
            window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.log('AppRouter ludoRedirect getCurrentLudoData else message from server: ', response.data.message);
            console.log('AppRouter ludoRedirect getCurrentLudoData else error from server: ', response.data.err);
        }
    })
    .catch(error => {
        window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        console.log('AppRouter ludoRedirect getCurrentLudoData error', error);
    });
};

const ludoEditRedirect = (nextState, replace, callback) => {
    const { ludo_id }= nextState.params;
    // console.log('ludoRedirect before get single ludo -- ludo_id', ludo_id);  // debug
    axios.get(`/apis/ludo/${ludo_id}`)
    .then(response => {
        if(response.data.status === '200') {
            if(response.data.auth != 1) {
                /* TODO: Figure out how to use same url redirect to other component */
                callback();
                browserHistory.push(`/ludo/${ludo_id}`);
            } else {
                router_ludoPageIndex = response.data.auth;
                // console.log('router_ludoPageIndex', router_ludoPageIndex);   // debug
                router_currentFormValue = response.data.ludo;
                // console.log('router_currentFormValue', router_currentFormValue);   // debug
                callback();
            }
        } else {
            // console.log('AppRouter ludoRedirect getCurrentLudoData else response from server: ', response);
            window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.log('AppRouter ludoRedirect getCurrentLudoData else message from server: ', response.data.message);
            console.log('AppRouter ludoRedirect getCurrentLudoData else error from server: ', response.data.err);
        }
    })
    .catch(error => {
        window.alert('取得Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        console.log('AppRouter ludoRedirect getCurrentLudoData error', error);
    });
};


/* TODO: find out usage of getComponent callback */
export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="playground"></IndexRedirect>
                    <Route path="create" component={Create} onEnter={isLoggedIn}></Route>
                    <Route path="friend" component={Friend}></Route>
                    <Route path="login" component={Login}></Route>
                    <Route path="ludo/:ludo_id" getComponent={(nextState, cb) => {
                        const Component = ludoPageArray[router_ludoPageIndex];
                        cb(null, props => <Component {...props} router_currentFormValue={router_currentFormValue} />);
                    }} onEnter={ludoRedirect}></Route>
                    <Route path="ludo-edit/:ludo_id" getComponent={(nextState, cb) => {
                        const Component = ludoPageArrayForEdit[router_ludoPageIndex];
                        cb(null, props => <Component {...props} router_currentFormValue={router_currentFormValue} />);
                    }} onEnter={isLoggedIn, ludoEditRedirect} OnLeave={ludoRedirect}></Route>
                    <Route path="playground" component={Playground}></Route>
                    <Route path="profile/:userId" component={Profile}></Route>
                </Route>
            </Router>
        );
    }
};

                    // <Route path="active-for-bystander/:ludoId" component={ActiveForBystander}></Route>
                    // <Route path="active-for-player/:ludoId" component={ActiveForPlayer}></Route>
                    // <Route path="create" component={Create} onEnter={isLoggedIn}></Route>
                    // <Route path="friend" component={Friend}></Route>
                    // <Route path="login" component={Login}></Route>
                    // <Route path="ludo-edit/:ludo_id" component={LudoEdit} onEnter={isLoggedIn}></Route>
                    // <Route path="opened-for-starter/:ludoId" component={OpenedForStarter} onEnter={isLoggedIn}></Route>
                    // <Route path="opened-for-bystander/:ludoId" component={OpenedForBystander}></Route>
                    // <Route path="playground" component={Playground}></Route>
                    // <Route path="profile/:userId" component={Profile}></Route>