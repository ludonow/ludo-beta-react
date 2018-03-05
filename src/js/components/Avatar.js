import React from 'react';
import styled from 'styled-components';

import { animalImageArray, colorArray } from './avatarImage';

const AvatarWrapper = styled.div`
    ${props => props.usedInReport ? "position : absolute;" : ""}
    .avatar-in-report {
        height: 43px;
        margin-left: -30px;
        margin-top: -22px;
        position: absolute;
        width: 43px;
    }
    .avatar-container__photo {
        border: solid 2px #707070;
        border-radius: 50%;
        height: 43px;
        width: 43px;
    }
`;

/* components/_report-avatar.scss */
const Avatar = ({
    avatarBackgroundColorIndex,
    avatarImageIndex,
    isThisBelongToCurrentUser,
    userPhotoUrl,
    usedInReport
}) => (
    <AvatarWrapper usedInReport={usedInReport}>
        <div className={usedInReport ? "avatar-in-report" : "avatar-container"}>
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
    </AvatarWrapper>
);

export default Avatar;