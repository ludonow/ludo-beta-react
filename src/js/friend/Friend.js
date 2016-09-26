import React from 'react';

import FriendList from './FriendList';

export default class Friend extends React.Component {
    render() {
        return (
            <div className="main-container">
                <FriendList />
            </div>
        );
    }
}