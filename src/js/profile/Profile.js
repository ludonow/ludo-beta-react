import React from 'react';
import Masonry from 'react-masonry-component';

import ProfileContent from './ProfileContent';
import ProfileLudoing from './ProfileLudoing';
import ProfileHistory from './ProfileHistory';
import ProfileStatistic from './ProfileStatistic';
import ProfilePrize from './ProfilePrize';

/* LUDO TODO: make columnWidth a variable */
const masonryOptions = {
    itemSelector: ".grid-item--half",
    columnWidth: 570,
    fitWidth: true
}

export default class Profile extends React.Component {
    render() {
        return ( 
            <div className="profile">
                <Masonry
                    className="grid"
                    options={masonryOptions}>
                    <div className="grid-item--half">
                        <ProfileContent />
                    </div>
                    <div className="grid-item--half">
                        <ProfileLudoing />
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
