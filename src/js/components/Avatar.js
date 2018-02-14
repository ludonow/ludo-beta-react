import React from 'react';
import styled from 'styled-components';

import { animalImageArray, colorArray } from './avatarImage';

const AvatarWrapper = styled.div`
    .avatar-in-report {
        width: 43px;
        height: 43px;
        /* background-color: #bababa; */
        
        margin-top:-22px; 
        margin-left: -30px;
        position:absolute;
    }
    .avatar-container__photo {
        width: 43px;
        height: 43px;
        border: solid 2px #707070;
        border-radius: 50%;
        /* background-color: #bababa; */
        /* border: solid 2px #707070;
        border-radius: 50%; */
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
    <AvatarWrapper>
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