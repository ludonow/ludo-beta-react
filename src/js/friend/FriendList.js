import React from 'react';
import Masonry from 'react-masonry-component';

import { rawFriendData } from './FriendData';

const masonryOptions = {
    itemSelector: ".grid-item--friend",
    columnWidth: 185,
    fitWidth: true
}

export default class Friend extends React.Component {
    constructor() {
        super();
        this.state = { friendList: [] };
    }

    getFriendList() {
        this.state.friendList = this.props.data.map( (data, index) => {
            return (
                <div className="grid-item--friend" key={index}>
                    <div className="friend-list__element">
                        <img className="friend-list__icon" src={data.value} />
                    </div>
                </div>
            );
        });
    }

    render() {
        this.getFriendList();
        return (
            <Masonry
                className="grid"
                options={masonryOptions}>
                {this.state.friendList}
            </Masonry>
        );
    }
}