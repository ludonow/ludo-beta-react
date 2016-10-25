import React from 'react';

import FriendList from './FriendList';

export default class Friend extends React.Component {
    render() {
        return (
            /* layout/main-container */
            <div className="main-container">
                <FriendList />
            </div>
        );
    }
}