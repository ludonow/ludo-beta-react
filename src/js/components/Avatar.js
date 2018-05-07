import React from 'react';
import styled from 'styled-components';

import {
    animalImageList,
    colorList,
} from '../assets/avatarImage';
import defaultUserAvatar from '../../images/user.svg';

const AvatarWrapper = styled.div`
    ${props => props.usedInReport ? "position : absolute;" : ""}
    display: flex;
    justify-content: center;
    width: 100%;

    .avatar-in-comments {
        .avatar-container__photo  {
            height: 35px;
            width: 35px;
        }
    }
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
    usedInComments,
    usedInReport,
    userPhotoUrl,
}) => {
    let className = '';
    if (!usedInComments) {
        className = usedInReport ? "avatar-in-report" : "avatar-container";
    } else {
        className = "avatar-in-comments";
    }
    return (
        <AvatarWrapper usedInReport={usedInReport}>
            <div className={className}>
                {
                    isThisBelongToCurrentUser ?
                        <img
                            className="avatar-container__photo"
                            src={userPhotoUrl === 'default' ? defaultUserAvatar : userPhotoUrl}
                        />
                    :
                        <img
                            className="avatar-container__photo"
                            src={animalImageList[avatarImageIndex]}
                            style={{'backgroundColor': colorList[avatarBackgroundColorIndex]}} 
                        />
                }
            </div>
        </AvatarWrapper>
    );
}

export default Avatar;