import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import decorators from './decorators';
import {
    desktopImageList,
    mobileImageList
} from './imageList';
import { baseUrl } from '../baseurl-config';

const ImageWrapper = styled.div`
    align-items: center;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    height: 100%;
    justify-content: center;

    a, img {
        height: 100%;
        width: 100%;
    }
`;

const Wrapper = styled.div`
    margin: 20px auto;
    width: 90%;

    .slider-list, .slider-slide {
        height: 80vh !important;
        @media (max-width: 768px) {
            height: 83vh !important;
        }
    }

    @media (max-width: 768px) {
        /* margin-top: 90px; */
        width: 100%;
        margin: 0;
        .slider-decorator-2 {
            bottom: -40px !important;
        }

        li > button {
            padding: 0 2px !important;
        }
    }
`;

class SlideShow extends Component {
    constructor() {
        super();
        this.state = { imageList: [] };
    }

    componentDidMount() {
        const width = window.innerWidth || document.body.clientWidth;
        const imageList = (width <= 768) ? mobileImageList : desktopImageList;
        this.setState({ imageList });
    }

    render() {
        const { imageList } = this.state;
        return (
            <Wrapper>
                <Carousel decorators={decorators}>
                    {
                        imageList.map((image, index) => (
                            <ImageWrapper key={`slide-show-image-${index}`}>
                                {
                                    index !== (imageList.length - 1) ? 
                                        <img src={image} />
                                    :
                                        <Link to={`${baseUrl}/cardList`}>
                                            <img src={image} />
                                        </Link>
                                }
                            </ImageWrapper>
                        ))
                    }
                </Carousel>
            </Wrapper>
        );
    }
}

export default SlideShow;
