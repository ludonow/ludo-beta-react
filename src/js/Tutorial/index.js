import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Wrapper = styled.div`
`;

const Tutorial = () => (
    <Wrapper>
        <h2> Single Item</h2>
        <Slider {...settings}>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
            <div><h3>5</h3></div>
            <div><h3>6</h3></div>
        </Slider>
    </Wrapper>
);

export default Tutorial;
