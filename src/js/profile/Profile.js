import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import ProfileHistory from './ProfileHistory';
import ProfileLudoCard from './ProfileLudoCard';
import ProfileStatistic from './ProfileStatistic';
// import ProfilePrize from './ProfilePrize';

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
            activeKey: [2]
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
        debugger;
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
            <Masonry
                className="grid"
                options={masonryOptions}
                ref="masonry"
            >
                <div className="grid-item--profile">
                    <div className="profile-content">
                        <div className="profile-content-information">
                            <div className="profile-content-information-avatar">
                                <img className="profile-content-information-avatar__photo" 
                                    src={userProfileData.photo}
                                />
                            </div>
                            <div className="profile-content-information-tag">
                                <div className="profile-content-information-tag__element">{userProfileData.name}</div>
                                <div className="profile-content-information-tag__element">{'生日'}</div>
                                <div className="profile-content-information-tag__element">{'語言'}</div>
                                <div className="profile-content-information-tag__element">{'習慣'}</div>
                            </div>
                        </div>
                        <div className="profile-content-detail">
                            <div className="profile-content-detail__element"
                                id="1"
                                onClick={this.handleActiveClick}
                            >
                                {'等待加入'}
                            </div>
                            <div className="profile-content-detail__element"
                                id="2"
                                onClick={this.handleActiveClick}
                            >
                                {'正在進行'}
                            </div>
                            <div className="profile-content-detail__element"
                                id="3"
                                onClick={this.handleActiveClick}
                            >
                                {'之前參與'}
                            </div>
                            <div className="profile-content-detail__element"
                                id="4"
                                onClick={this.handleActiveClick}
                            >
                                {'統計資料'}
                            </div>
                            <div className="profile-content-detail__element--last"
                                id="6"
                                onClick={this.handleActiveClick}
                            >
                                {activeKey.indexOf(6) != -1 ? '關閉全部' : '顯示全部'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`grid-item--profile${activeKey.indexOf(1) != -1 ? '' : ' hidden'}`}>
                    <ProfileLudoCard 
                        forceMasonryUpdate={this.forceMasonryUpdate}
                        profileLudoData={this.props.profileWillLudoData}
                    />
                </div>
                <div className={`grid-item--profile${activeKey.indexOf(2) != -1 ? '' : ' hidden'}`}>
                    <ProfileLudoCard 
                        forceMasonryUpdate={this.forceMasonryUpdate}
                        profileLudoData={this.props.profileLudoingData}
                    />
                </div>
                <div className={`grid-item--profile${activeKey.indexOf(3) != -1 ? '' : ' hidden'}`}>
                    <ProfileHistory {...this.props} 
                        forceMasonryUpdate={this.forceMasonryUpdate}
                    />
                </div>
                <div className={`grid-item--profile${activeKey.indexOf(4) != -1 ? '' : ' hidden'}`}>
                    <ProfileStatistic {...this.props} />
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