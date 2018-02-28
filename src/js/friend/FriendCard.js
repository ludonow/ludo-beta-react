import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";

import { baseUrl } from '../baseurl-config';

export default class FriendCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid-item--friend">
                {/* components/friend-list.scss */}
                <div className="friend-list__element">
                    <Link to={`${baseUrl}/ludo/${this.props.create_ludo_id}`}>
                        之前一起玩的Ludo
                    </Link>
                    <br/>
                    <br/>
                    <Link to={`${baseUrl}/invite/${this.props.friend_id}`}>
                        與該玩家再玩一局
                    </Link>
                </div>
            </div>
        );
    }
}

FriendCard.defaultProps = {
    friend_id: "ludo123",
    create_ludo_id: "firstludo"
};

FriendCard.propTypes = {
    friend_id: PropTypes.string.isRequired,
    create_ludo_id: PropTypes.string.isRequired
};