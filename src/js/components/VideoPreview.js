import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import ReactPlayer from 'react-player';

import videoIconSrc from '../../images/video-icon.png';
import {
    PreviewImage,
    PreviewWrapper,
} from '../baseStyle';

const IconWrapper = styled.div`
    text-align: center;
`;

const VideoPreviewWrapper = styled.div`
    margin: 0 2vw;

    @media (min-width: 769px) {
        width: 40vw;
    }
`;

const VideoPreview = ({
    handleVideoChange,
    video,
}) => (
    <VideoPreviewWrapper>
        {
            video ?
                <PreviewWrapper>
                    <ReactPlayer
                        height="100%"
                        url={video}
                        width="100%"
                    />
                </PreviewWrapper>
            :
                <IconWrapper>
                    <img src={videoIconSrc} />
                </IconWrapper>
        }
        <TextField
            fullWidth
            hintText="輸入網址"
            onChange={handleVideoChange}
            rowsMax={1}
            defaultValue={video}
        />
    </VideoPreviewWrapper>
);

export default VideoPreview;
