import React, { Component } from 'react';
import styled from 'styled-components';

import { CustomScrollBarCSS, PreviewImage, PreviewWrapper } from './baseStyle';

const ReportPreviewWrapper = styled.div`
    margin: 3vw 15vw;
    max-height: 40vh;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;

    ${CustomScrollBarCSS}
`;

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
            imagePreviewUrl ?
                <PreviewWrapper>
                    <PreviewImage
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        src={imagePreviewUrl}
                    />
                </PreviewWrapper>
            : null
        }
        {text}
    </ReportPreviewWrapper>
);

export default ReportPreview;
