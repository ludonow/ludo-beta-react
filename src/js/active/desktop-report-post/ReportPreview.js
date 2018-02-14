import React, { Component } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import { CustomScrollBarCSS, PreviewImage, PreviewWrapper } from './baseStyle';

const ReportPreviewWrapper = styled.div`
    font-family: "Microsoft JhengHei";
    margin: 3vw 15vw;
    max-height: 40vh;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;

    ${CustomScrollBarCSS}
`;

const VideoPreviewWrapper = PreviewWrapper.extend`
    margin: 10px;
`

const ReportPreview = ({
    imagePreviewUrl,
    reportType,
    resizedHeight,
    resizedWidth,
    text,
    video
}) => (
    <ReportPreviewWrapper>
        {
            reportType === 'image' && imagePreviewUrl ?
                <PreviewWrapper>
                    <PreviewImage
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        src={imagePreviewUrl}
                    />
                </PreviewWrapper>
            : null
        }
        {
            reportType === 'video' && video ?
                <VideoPreviewWrapper>
                    <ReactPlayer
                        height="100%"
                        url={video}
                        width="100%"
                    />
                </VideoPreviewWrapper>
            : null
        }
        {text}
    </ReportPreviewWrapper>
);

export default ReportPreview;
