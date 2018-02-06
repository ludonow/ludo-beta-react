import React from 'react';
import DropZone from 'react-dropzone';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';

import ImageUploadAndPreview from './ImageUploadAndPreview';
import VideoPreview from './VideoPreview';
import { CustomScrollBarCSS } from './baseStyle';

// styled-components
const ImageDraftWrapper = styled.div`
    display: inline-flex;
    width: 100%;
`;

const TextAreaWrapper = styled.div`
    width: 100%;

    textarea {
        ${CustomScrollBarCSS}
    }
`

// child components
const TextReportArea = ({
    onChange,
    text
}) => (
    <TextAreaWrapper>
        <TextField
            fullWidth
            hintText="輸入文字回報"
            maxLength={1000}
            multiLine
            onChange={onChange}
            rowsMax={10}
            defaultValue={text}
        />
    </TextAreaWrapper>
);

const Draft = ({
    handleImageChange,
    handleImageResize,
    handleStepNext,
    handleTextChange,
    handleVideoChange,
    imagePreviewUrl,
    images,
    ludoId,
    reportType,
    resizedHeight,
    resizedWidth,
    text,
    video
}) => {
    switch(reportType) {
        case 'image':
            return (
                <ImageDraftWrapper>
                    <ImageUploadAndPreview
                        handleImageChange={handleImageChange}
                        handleImageResize={handleImageResize}
                        imagePreviewUrl={imagePreviewUrl}
                        images={images}
                        ludoId={ludoId}
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                    />
                    <TextReportArea
                        onChange={handleTextChange}
                        text={text}
                    />
                </ImageDraftWrapper>
            );
        case 'text':
            return (
                <TextReportArea
                    onChange={handleTextChange}
                    text={text}
                />
            );
        case 'video':
            return (
                <ImageDraftWrapper>
                    <VideoPreview
                        handleVideoChange={handleVideoChange}
                        video={video}
                    />
                    <TextReportArea
                        onChange={handleTextChange}
                        text={text}
                    />
                </ImageDraftWrapper>
            );
        default:
            return (
                <div>
                    please select a type
                </div>
            );
    }
};

export default Draft;
