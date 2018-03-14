import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RcSlider from 'rc-slider';

const maxDuration = 14;

const StyledSlider = styled(RcSlider)`
    padding: 0;
`;

// override material ui style
const styles = {
    hidden: {
        display: 'none'
    },
    labelStyle: {
        border: '1px solid #FFC645',
        borderRadius: '20px',
        display: 'flex',
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: '5px 0',
        padding: '8px 35px',
        textAlign: 'center',
        width: 'auto'
    }
};

// child components
const DaySlider = ({
    duration,
    handleDurationChange
}) => (
    <div className="slider-container">
        <StyledSlider
            max={maxDuration}
            min={3}
            defaultValue={duration}
            onChange={handleDurationChange}
            tipFormatter={value => `${value}天`}
            value={duration}
        />
        <div className="slider-label">
            持續天數：{duration}天
        </div>
    </div>
);

DaySlider.propTypes = {
    duration: PropTypes.number.isRequired,
    handleDurationChange: PropTypes.func.isRequired
};

const DayForm = ({
    duration,
    handleCheckPointChange,
    handleDurationChange,
    interval,
}) => (
    <div className="day-form">
        <DaySlider
            duration={duration}
            handleDurationChange={handleDurationChange}
        />
        <RadioButtonGroup
            className="radio-button-group"
            defaultSelected={Number(interval) ? Number(interval) : 1}
            name="frequency"
            onChange={handleCheckPointChange}
        >
            <RadioButton
                iconStyle={styles.hidden}
                label="每一天回報"
                labelStyle={styles.labelStyle}
                value={1}
            />
            <RadioButton
                iconStyle={styles.hidden}
                label="每兩天回報"
                labelStyle={styles.labelStyle}
                value={2}
            />
            <RadioButton
                iconStyle={styles.hidden}
                label="每三天回報"
                labelStyle={styles.labelStyle}
                value={3}
            />
        </RadioButtonGroup>
    </div>
);

DayForm.propTypes = {
    duration: PropTypes.number.isRequired,
    handleCheckPointChange: PropTypes.func.isRequired,
    handleDurationChange: PropTypes.func.isRequired
};

export default DayForm;
