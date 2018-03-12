import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import TextField from 'material-ui/TextField';

import videoIconSrc from '../../../images/active/video-icon.png';

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const PreviewWrapper = styled.div`
`;

const Wrapper = styled.div`
    background-color: white;
    margin-top: 20px;
    padding: 10px;
`;

const VideoPreview = ({
    handleVideoChange,
    video,
}) => (
    <Wrapper>
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
            hintText="輸入影片網址"
            onChange={handleVideoChange}
            rowsMax={1}
            defaultValue={video}
        />
    </Wrapper>
);

VideoPreview.propTypes = {
    handleVideoChange: PropTypes.func.isRequired,
    video: PropTypes.string,
};

export default VideoPreview;