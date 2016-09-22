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
    }

    componentWillMount() {
        this.props.handleIsOpeningProfile(true);
        this.props.handleShouldProfileUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningProfile(false);
    }

    render() {
        return ( 
            <div className="main-container">
                <Masonry
                    className="grid"
                    options={masonryOptions}>
                    <div className="grid-item--half">
                        <ProfileContent {...this.props} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileNewLudo {...this.props} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileLudoing {...this.props} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileHistory {...this.props} />
                    </div>
                    <div className="grid-item--half">
                        <ProfileStatistic {...this.props} />
                    </div>
                    <div className="grid-item--half">
                        <ProfilePrize {...this.props} />
                    </div>
                </Masonry>
            </div>
        );
    }
}
