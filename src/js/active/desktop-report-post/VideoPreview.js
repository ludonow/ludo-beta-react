import React, { Component } from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import ReactPlayer from 'react-player';

import { PreviewImage, PreviewWrapper } from './baseStyle';
import videoIconSrc from '../../../images/active/video-icon.png';

const IconWrapper = styled.div`
    text-align: center;
`;

const VideoPreviewWrapper = styled.div`
    margin: 0 1vw;
    max-height: 40vh;
    width: 40vw;
`;

const VideoPreview = ({
    handleVideoChange,
    video
}) => (
    <VideoPreviewWrapper>
        {
            video ?
                <PreviewWrapper>
                    <ReactPlayer
                        url={video}
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
