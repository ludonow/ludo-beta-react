import React from 'react';
import styled from 'styled-components';
import RcSlider from 'rc-slider';

import CustomHandle from './CustomHandle';

const StyledSlider = styled(RcSlider)`
    margin: 80px auto 30px auto;
    padding: 0;
    width: 60%;
`;

// override default component style
const dotStyle = {
    backgroundColor: 'black',
    border: 'none',
    bottom: '0',
    height: '4px',
    width: '4px',
};

const railStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
};

const trackStyle = {
    backgroundColor: '#ffc645',
};

const Slider = ({
    duration,
    handleDurationChange,
}) => (
    <StyledSlider
        defaultValue={3}
        dots
        dotStyle={dotStyle}
        handle={CustomHandle}
        max={14}
        min={3}
        onChange={handleDurationChange}
        railStyle={railStyle}
        trackStyle={trackStyle}
        value={duration}
    />
);

Slider.defaultProps = {
    duration: 3
};

export default Slider;
