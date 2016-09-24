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
            activeKey: [2]
        };
        this.handleActiveClick = this.handleActiveClick.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningProfilePage(true);
        this.props.handleShouldProfileUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningProfilePage(false);
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
            <div className="main-container">
                <Masonry
                    className="grid"
                    options={masonryOptions}>
                    <div className="grid-item--half">
                        <div className="profile-content">
                            <div className="profile-content-information">
                                <div className="profile-content-information-avatar">
                                    <img className="profile-content-information-avatar__photo" src={userProfileData.photo} />
                                </div>
                                <div className="profile-content-information-tag">
                                    <div className="profile-content-information-tag__element">{userProfileData.name}</div>
                                    <div className="profile-content-information-tag__element">生日</div>
                                    <div className="profile-content-information-tag__element">語言</div>
                                    <div className="profile-content-information-tag__element">習慣</div>
                                </div>
                            </div>
                            <div className="profile-content-detail">
                                <div className="profile-content-detail__element" id="1" onClick={this.handleActiveClick} >
                                    等待加入
                                </div>
                                <div className="profile-content-detail__element" id="2" onClick={this.handleActiveClick} >
                                    正在進行
                                </div>
                                <div className="profile-content-detail__element" id="3" onClick={this.handleActiveClick} >
                                    之前參與
                                </div>
                                <div className="profile-content-detail__element" id="4" onClick={this.handleActiveClick} >
                                    統計資料
                                </div>
                                <div className="profile-content-detail__element--last" id="6" onClick={this.handleActiveClick} >
                                    {activeKey.indexOf(6) != -1 ? `關閉全部` : `顯示全部`}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        activeKey.indexOf(1) != -1 ?
                        <div className="grid-item--half">
                            <ProfileNewLudo {...this.props} />
                        </div>
                        :null
                    }
                    {
                        activeKey.indexOf(2) != -1 ? 
                        <div className="grid-item--half">
                           <ProfileLudoing {...this.props} />
                       </div>
                        :null
                    }
                    {
                        activeKey.indexOf(3) != -1 ? 
                        <div className="grid-item--half">
                            <ProfileHistory {...this.props} />
                        </div>
                        :null
                    }
                    {
                        activeKey.indexOf(4) != -1 ? 
                        <div className="grid-item--half">
                            <ProfileStatistic {...this.props} />
                        </div>
                        :null
                    }
                </Masonry>
            </div>
        );
    }
}
                                // <div className="profile-content-detail__element" id="5" onClick={this.handleActiveClick} >
                                //     成就
                                // </div>

                    // {
                    //     activeKey.indexOf(5) != -1 ? 
                    //     <div className="grid-item--half">
                    //         <ProfilePrize {...this.props} />
                    //     </div>
                    //     :null
                    // }
