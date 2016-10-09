import React from 'react';

export default class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userProfileData } = this.props;
        return (
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
                    <div className="profile-content-detail__element">{'等待他人加入的Ludo'}</div>
                    <div className="profile-content-detail__element">{'正在進行的Ludo'}</div>
                    <div className="profile-content-detail__element">{'之前參與的Ludo'}</div>
                    <div className="profile-content-detail__element">{'成就'}</div>
                    <div className="profile-content-detail__element">{'統計資訊'}</div>
                    <div className="profile-content-detail__element--last">{'顯示全部'}</div>
                </div>
            </div>
        );
    }
}