import React from 'react';

import FriendList from './FriendList';

export default class Friend extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningProfilePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningProfilePage(false);
    }

    render() {
        return (
            <FriendList friendsArrayData={this.props.userProfileData.friends} />
        );
    }
}