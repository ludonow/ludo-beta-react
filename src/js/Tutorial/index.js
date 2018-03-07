import React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import decorators from './decorators';
import desktopImage1 from '../../images/tutorial/d-1.png';
import desktopImage2 from '../../images/tutorial/d-2.png';
import desktopImage3 from '../../images/tutorial/d-3.png';
import desktopImage4 from '../../images/tutorial/d-4.png';
import desktopImage5 from '../../images/tutorial/d-5.png';
import desktopImage6 from '../../images/tutorial/d-6.png';
import desktopImage7 from '../../images/tutorial/d-7.png';
import desktopImage8 from '../../images/tutorial/d-8.png';
import desktopImage9 from '../../images/tutorial/d-9.png';
import mobileImage1 from '../../images/tutorial/m-1.png';
import mobileImage2 from '../../images/tutorial/m-2.png';
import mobileImage3 from '../../images/tutorial/m-3.png';
import mobileImage4 from '../../images/tutorial/m-4.png';
import mobileImage5 from '../../images/tutorial/m-5.png';
import mobileImage6 from '../../images/tutorial/m-6.png';
import mobileImage7 from '../../images/tutorial/m-7.png';
import mobileImage8 from '../../images/tutorial/m-8.png';
import mobileImage9 from '../../images/tutorial/m-9.png';

const desktopImageList = [
    desktopImage1,
    desktopImage2,
    desktopImage3,
    desktopImage4,
    desktopImage5,
    desktopImage6,
    desktopImage7,
    desktopImage8,
    desktopImage9,
];

const mobileImageList = [
    mobileImage1,
    mobileImage2,
    mobileImage3,
    mobileImage4,
    mobileImage5,
    mobileImage6,
    mobileImage7,
    mobileImage8,
    mobileImage9,
];

const ImageWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    img {
        width: 99%;
    }
`;

const Wrapper = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
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

const Tutorial = () => {
    const width = window.innerWidth || document.body.clientWidth;

    const imageList = (width <= 768) ? mobileImageList : desktopImageList;

    return (
        <Wrapper>
            <Carousel decorators={decorators}>
                {
                    imageList.map((image, index) => (
                        <ImageWrapper key={`tutorial-image-${index}`} >
                            <img src={image} />
                        </ImageWrapper>
                    ))
                }
            </Carousel>
        </Wrapper>
    );
}

export default Tutorial;
