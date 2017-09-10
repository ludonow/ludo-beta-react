import React from 'react';

import { animalImageArray, colorArray } from './avatarImage';

/* components/_report-avatar.scss */
const Avatar = ({
    avatarBackgroundColorIndex,
    avatarImageIndex,
    isThisBelongToCurrentUser,
    userPhotoUrl
}) => (
    <div className="avatar-container">
        {
            isThisBelongToCurrentUser ?
                <img
                    className="avatar-container__photo"
                    src={userPhotoUrl}
                />
            :
                <img
                    className="avatar-container__photo"
                    src={animalImageArray[avatarImageIndex]}
                    style={{'backgroundColor': colorArray[avatarBackgroundColorIndex]}} 
                />
        }
    </div>
);

export default Avatar;