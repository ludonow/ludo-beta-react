import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import ProfileLudoCard from './ProfileLudoCard';
import ProfileStatistic from './ProfileStatistic';
// import ProfilePrize from './ProfilePrize';   TODO: add this in the future

/* LUDO TODO: make columnWidth a variable */
const masonryOptions = {
    itemSelector: '.grid-item--profile',
    columnWidth: 534,
    fitWidth: true
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: [1,2,3,4,5,6]
        };
        this.forceMasonryUpdate = this.forceMasonryUpdate.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningProfilePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningProfilePage(false);
    }

    forceMasonryUpdate() {
        this.refs.masonry.performLayout();
    }

    handleActiveClick(event) {
        const { activeKey } = this.state;
        const toggleId = Number(event.target.id);
        const index = activeKey.indexOf(toggleId);
        if (toggleId == 6) {
            if (index == -1) { // index is not in the array
                this.setState({activeKey: [1,2,3,4,5,6]});
            } else {
                this.setState({activeKey: []});
            }
        } else {
            if (index == -1) { // index is not in the array
                this.setState({activeKey: activeKey.concat([toggleId])});
            } else {
                activeKey.splice(index, 1);
                this.setState({activeKey: activeKey});
            }
        }
    }

    render() {
        const { userProfileData } = this.props;
        const { activeKey } = this.state;
        return (
            /* components/_card.scss */
            <Masonry
                className="grid"
                options={masonryOptions}
                ref="masonry"
            >
                <div className="grid-item--profile">
                    {/* components/_profile-content.scss */}
                    <div className="profile-content">
                        <div className="profile-content-information-avatar">
                            <img
                                className="profile-content-information-avatar__photo"
                                src={userProfileData.photo}
                            />
                        </div>
                    </div>
                    {/* hidden is defined in helpers/_placeholders */}
                    <ProfileLudoCard
                        forceMasonryUpdate={this.forceMasonryUpdate}
                        profileLudoData={this.props.profileWillLudoData}
                        title="等待他人加入"
                    />
                    <ProfileLudoCard
                        forceMasonryUpdate={this.forceMasonryUpdate}
                        profileLudoData={this.props.profileLudoingData}
                        title="正在進行中"
                    />
                    <ProfileLudoCard
                        forceMasonryUpdate={this.forceMasonryUpdate}
                        profileLudoData={this.props.profileDidLudoData}
                        title="之前參與過"
                    />
                </div>
            </Masonry>
        );
    }
}

Profile.defaultProps = {
    handleIsOpeningProfilePage: function() {},
    profileLudoingData: [{
        category_id: 0
    }],
    profileWillLudoData: [{
        category_id: 0
    }]
};

Profile.propTypes = {
    handleIsOpeningProfilePage: PropTypes.func.isRequired,
    profileLudoingData: PropTypes.arrayOf(PropTypes.shape({
        category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
    })).isRequired,
    profileWillLudoData: PropTypes.arrayOf(PropTypes.shape({
        category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
    })).isRequired
};
