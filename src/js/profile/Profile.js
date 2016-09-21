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
        // this.getDifferentStageLudo = this.getDifferentStageLudo.bind(this);
    }

    componentDidMount() {
        this.props.getProfileData();
        this.props.getUserLudoData(this.props.currentUserId);
    }

    // getDifferentStageLudo() {
    //     userLudoData.map( (ludoObject, index) => {
    //         switch (ludoObject.stage) {
    //             case 1:
    //                 this.state.newLudo.push(ludoObject);
    //             case 2:
    //                 this.state.activeLudo.push(ludoObject);
    //             case 3:
    //                 this.state.finishedLudo.push(ludoObject);
    //             default:
    //                 break;
    //         }
    //     });
    //     const { newLudo, activeLudo, finishedLudo } = this.state;
    //     this.setState({
        //     newLudo,
        //     activeLudo,
        //     finishedLudo
        // };
    // }

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
