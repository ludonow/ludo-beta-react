import React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import image1 from '../../images/tutorial/1.png';
import image2 from '../../images/tutorial/2.png';
import image3 from '../../images/tutorial/3.png';
import image4 from '../../images/tutorial/4.png';
import image5 from '../../images/tutorial/5.png';

const ImageWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
`;

const Wrapper = styled.div`
    background-color: rgba(70, 70, 70, 0.7);
    margin: 20px auto;
    width: 90%;

    @media (max-width: 767px) {
        margin-top: 90px;
    }

    .slider-list, .slider-slide {
        height: 80vh !important;
    }
`;

const Tutorial = () => (
    <Wrapper>
        <Carousel>
            <ImageWrapper><img src={image1} /></ImageWrapper>
            <ImageWrapper><img src={image2} /></ImageWrapper>
            <ImageWrapper><img src={image3} /></ImageWrapper>
            <ImageWrapper><img src={image4} /></ImageWrapper>
            <ImageWrapper><img src={image5} /></ImageWrapper>
        </Carousel>
    </Wrapper>
);

export default Tutorial;
