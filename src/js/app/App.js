import React from 'react';

import Header from './header/Header';
import Search from './search/Search';
import Sidebar from './sidebar/Sidebar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";

        return (
            <div>
                <Header isProfile={isProfile} />
                <Sidebar />
                <div className="main-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
};