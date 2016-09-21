import React from 'react';
import axios from '../axios-config';
import Masonry from 'react-masonry-component';

import ProfileContent from './ProfileContent';
import ProfileNewLudo from './ProfileNewLudo';
import ProfileLudoing from './ProfileLudoing';
import ProfileHistory from './ProfileHistory';
import ProfileStatistic from './ProfileStatistic';
import ProfilePrize from './ProfilePrize';

/* LUDO TODO: make columnWidth a variable */
const masonryOptions = {
    itemSelector: ".grid-item--half",
    columnWidth: 570,
    fitWidth: true
};

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLudo: [],
            activeLudo: [],
            finishedLudo: []
        };
    }

    componentDidMount() {
        console.log('Profile componentDidMount');
        this.props.getProfileData();
    }

    componentWillReceiveProps(nextProps) {
        console.log('Profile componentWillReceiveProps');
        if(this.props.isUpdatingProfile) {
            console.log('Profile getProfileData');
        }
    }

    render() {
        const { currentUserId, userProfileData } = this.props;
        return ( 
            <div className="main-container">
                <Masonry
                    className="grid"
                    options={masonryOptions}>
                    <div className="grid-item--half">
                        <ProfileContent user={userProfileData} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileNewLudo currentUserId={currentUserId} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileLudoing currentUserId={currentUserId} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileHistory />
                    </div>
                    <div className="grid-item--half">
                        <ProfilePrize />
                    </div>
                    <div className="grid-item--half">
                        <ProfileStatistic />
                    </div>
                </Masonry>
            </div>
        );
    }
}
