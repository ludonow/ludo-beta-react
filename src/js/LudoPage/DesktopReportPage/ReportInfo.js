import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import { withMaybe } from '../../components/higher-order-components/index';

const Wrapper = styled.div`
    line-height: 1.1rem;
    margin-bottom: 50px;
    padding: 0 20px;
    text-align: left;
    white-space: pre-wrap;
`;

const Component = styled.div`
    font-size: 14px;
    margin-top: 20px;

    img {
        cursor: zoom-in;
        width: 100%;
    }
`;

// child components
const Content = ({ content }) => (
    <Component>
        {content}
    </Component>
);
const nullContentnConditionFn = (props) => !props.content;
const ContentWithNull = withMaybe(nullContentnConditionFn)(Content);

const Image = ({
    handleImageLightboxOpen,
    imageLocation,
}) => (
    <Component>
        <img
            onClick={handleImageLightboxOpen}
            src={imageLocation}
        />
    </Component>
);
const nullImageLocationConditionFn = (props) => !props.imageLocation;
const ImageWithNull = withMaybe(nullImageLocationConditionFn)(Image);

const Video = ({ video }) => (
    <Component>
        <ReactPlayer
            controls={true}
            height="240px"
            url={video}
            width="100%"
        />
    </Component>
);
const nullVideoConditionFn = (props) => !props.video;
const VideoWithNull = withMaybe(nullVideoConditionFn)(Video);

const ReportInfo = ({
    content,
    handleImageLightboxOpen,
    imageLocation,
    video,
}) => (
    <Wrapper>
        <ImageWithNull
            handleImageLightboxOpen={handleImageLightboxOpen}
            imageLocation={imageLocation}
        />
        <VideoWithNull video={video} />
        <ContentWithNull content={content} />
    </Wrapper>
);

export default ReportInfo;
