import React from 'react';

import { animalImageArray, colorArray } from './avatarImage';

/* components/_report-avatar.scss */
const ReportAvatar = (props) => (
    <div className="player-avatar-container">
        {
            props.isThisBelongToCurrentUser ?
                <img
                    className="player-avatar-container__photo"
                    src={props.userPhotoUrl}
                />
            :
                <img
                    className="player-avatar-container__photo"
                    src={animalImageArray[props.avatarImageIndex]}
                    style={{'backgroundColor': colorArray[props.avatarBackgroundColorIndex]}} 
                />
        }
    </div>
);

export default ReportAvatar;