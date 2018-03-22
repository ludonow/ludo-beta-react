import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { cyan800, deepOrange200 } from 'material-ui/styles/colors';

const RoundRadiusTag = styled.span`
    border-radius: 20px;
    padding: 8px 20px;
    background-color: ${cyan800};
    color: white;
    font-size: 0.8rem;
`;

const CardContentWrapper = styled.div`
    padding: 5px 30px;
    color: white;
`;

const CardImage = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    img {
        width: 200px;
    }
`;

const CardInterval = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 30px 0;
    text-align: center;
`;

const CardIntroduction = styled.div`
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.3;
    margin: 30px auto 70px auto;
    white-space: pre-line;
`;

const CardTitle = styled.div`
    margin: 35px 0;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;

const CardTags = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 15px 0;
    text-align: center;
`;

const CardTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
`;

const CardVideo = styled.div`
`;

const IntervalTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
    background-color: ${deepOrange200};
`;

const MobileCardContent = ({
    image_location,
    interval,
    introduction,
    tags,
    title,
    video,
}) => (
    <CardContentWrapper>
        <CardTitle>
            {title}
        </CardTitle>
        <CardTags>
            {
                tags.map((tag, index) => (
                    <CardTag
                        key={`introducton-${index}`}
                    >
                        #{tag}
                    </CardTag>
                ))
            }
        </CardTags>
        <CardInterval>
            <IntervalTag>每{interval}天回報</IntervalTag>
        </CardInterval>
        {
            video ?
                <CardVideo>
                    <ReactPlayer
                        height="auto"
                        url={video}
                        width="100%"
                    />
                </CardVideo>
            : null
        }
        {
            image_location ?
                <CardImage>
                    <img
                        onClick={handleImageLightboxOpen}
                        src={image_location}
                    />
                </CardImage>
            : null
        }
        <CardIntroduction>
            {introduction}
        </CardIntroduction>
    </CardContentWrapper>
);

MobileCardContent.propTypes = {
    handleImageLightboxOpen: PropTypes.func.isRequired,
    interval: PropTypes.number.isRequired,
    introduction: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
};

export default MobileCardContent;
