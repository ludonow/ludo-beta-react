import React, { Component } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Lightbox from 'react-image-lightbox';

import tagIcon from '../../../images/active/tag-icon.png';
import BasicInfo from './BasicInfo';

const CardImage = styled.div`
    margin-top: 42px;

    img {
        cursor: zoom-in;
        height: 250px;
        max-width: 100%;
    }
`;

const CardTags = styled.div`
    margin: 22px 0;
    text-align: left;
    .ludo-tag {
        display: inline-block;
        margin: 5px;
        padding: 5px 10px;
        background-color: rgba(0,0,0,0.6);
        color: white;
        font-size: 14px;
    }
    img {
        position:relative;
        top: 10px;
        display: inline-block;
        height: 30px;
    }
`;

const CardVideo = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 42px;
`;

const IntroductionWrapper = styled.div`
    color: #484848;
	font-size: 14px;
	line-height: 1.2;
    margin-top: 35px;
	text-align: left;
    white-space: pre-wrap;
    width: 100%;
`;

const Wrapper = styled.div`
    background-color: #fff;
    padding: 30px 7.5%;
    text-align: center;
`;

class DesktopCardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageLightBoxOpen: false,
        };
        this.handleImageLightboxClose = this.handleImageLightboxClose.bind(this);
        this.handleImageLightboxOpen = this.handleImageLightboxOpen.bind(this);
    }

    handleImageLightboxClose() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    handleImageLightboxOpen() {
        this.setState({
            isImageLightBoxOpen: true
        });
    }

    render() {
        const { router_currentFormValue } = this.props;
        const {
            category_id,
            checkpoint,
            duration,
            image_location,
            introduction,
            marbles,
            tags,
            title,
            video,
        } = router_currentFormValue;

        const {
            isImageLightBoxOpen,
        } = this.state;

        const renderedInterval = router_currentFormValue.interval ? Number(router_currentFormValue.interval) : 1;

        return (
            <Wrapper>
                <BasicInfo
                    duration={duration}
                    title={title}
                    renderedInterval={renderedInterval}
                />
                <IntroductionWrapper>
                    {introduction}
                </IntroductionWrapper>
                {
                    video ?
                        <CardVideo>
                            <ReactPlayer
                                url={video}
                            />
                        </CardVideo>
                    : null
                }
                {
                    image_location ?
                        <CardImage>
                            <img
                                onClick={this.handleImageLightboxOpen}
                                src={image_location}
                            />
                        </CardImage>
                    : null
                }
                <CardTags>
                    <img src={tagIcon} />
                    {
                        tags.length ?
                            tags.map((tagString, index) => {
                                return (
                                    <div className="ludo-tag" key={`ludo-tag-${index}`}>
                                        {tagString}
                                    </div>
                                );
                            })
                        : null
                    }
                </CardTags>
                {
                    isImageLightBoxOpen ?
                        <Lightbox
                            mainSrc={image_location}
                            onCloseRequest={this.handleImageLightboxClose}
                        />
                    : null
                }
            </Wrapper>
        );
    }
}

export default DesktopCardContent;
