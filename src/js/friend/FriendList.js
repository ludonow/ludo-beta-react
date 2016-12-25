import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import FriendCard from './FriendCard.js';

const masonryOptions = {
    itemSelector: ".grid-item--friend",
    columnWidth: 185,
    fitWidth: true
};

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendsArrayDataWithoutDefaultData: [],
            isDefaultDataHasBeenRemoved: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.isDefaultDataHasBeenRemoved && nextProps.friendsArrayData[0].createAt) {
            this.state.friendsArrayDataWithoutDefaultData = nextProps.friendsArrayData.slice(1);
            this.setState({
                isDefaultDataHasBeenRemoved: true
            });
        }
    }

    render() {
        return (
            /* components/_card.scss */
            <Masonry
                className="grid"
                options={masonryOptions}>
                {
                    this.state.friendsArrayDataWithoutDefaultData.map((singleFriendObjectData, index) => {
                        return <FriendCard {...singleFriendObjectData} key={index} />
                    })
                }
            </Masonry>
        );
    }
}

FriendList.defaultProps = {
    friendsArrayData: [
        {
            friend_id: "0",
            create_ludo_id: "0"
        }
    ]
};

FriendList.propTypes = {
    friendsArrayData: PropTypes.arrayOf(
        PropTypes.shape({
            friend_id: PropTypes.string.isRequired,
            create_ludo_id: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};