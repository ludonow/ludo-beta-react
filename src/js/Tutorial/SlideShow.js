import React from 'react';
import { browserHistory, Link } from 'react-router';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import decorators from './decorators';
import {
    desktopImageList,
    mobileImageList
} from './imageList';
import { baseUrl } from '../baseurl-config';
import Button from '../components/Button';

const ButtonWrapper = styled.div`
    bottom: 0;
    margin-bottom: 15px;
    position: fixed;
    width: 90%;
`;

const ImageWrapper = styled.div`
    align-items: center;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    height: 100%;
    justify-content: center;

    img {
        height: 100%;
    }
`;

const Wrapper = styled.div`
    margin: 20px auto;
    width: 90%;

    .slider-list, .slider-slide {
        height: 80vh !important;
    }

    @media (max-width: 768px) {
        margin-top: 90px;
        .slider-decorator-2 {
            bottom: -40px !important;
        }

        li > button {
            padding: 0 2px !important;
        }
    }
`;

const SlideShow = () => {
    const width = window.innerWidth || document.body.clientWidth;
    const imageList = (width <= 768) ? mobileImageList : desktopImageList;
    const handleClick = (event) => { browserHistory.push('/cardList') }

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
                                    <Link to={`${baseUrl}/cardList?stage=0`}>
                                        <img src={image} />
                                    </Link>
                            }
                        </ImageWrapper>
                    ))
                }
            </Carousel>
            <ButtonWrapper>
                <Button
                    label="跳過教學"
                    onClick={handleClick}
                />
            </ButtonWrapper>
        </Wrapper>
    );
}

export default SlideShow;
