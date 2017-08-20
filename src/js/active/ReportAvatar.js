import React from 'react';

import { animalImageArray, colorArray } from './avatarImage';

/* components/_report-avatar.scss */
const ReportAvatar = ({
    avatarBackgroundColorIndex,
    avatarImageIndex,
    isThisBelongToCurrentUser,
    userPhotoUrl
}) => (
    <div className="player-avatar-container">
        {
            isThisBelongToCurrentUser ?
                <img
                    className="player-avatar-container__photo"
                    src={userPhotoUrl}
                />
            :
                <img
                    className="player-avatar-container__photo"
                    src={animalImageArray[avatarImageIndex]}
                    style={{'backgroundColor': colorArray[avatarBackgroundColorIndex]}} 
                />
        }
    </div>
);

export default ReportAvatar;