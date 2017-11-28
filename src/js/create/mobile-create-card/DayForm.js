import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RcSlider from 'rc-slider';

const maxDuration = 14;

const styles = {
    hidden: {
        display: 'none'
    },
    inputStyle: {
    },
    labelStyle: {
        border: '1px solid #FFC645',
        borderRadius: '20px',
        display: 'flex',
        fontWeight: 'bold',
        fontSize: '1rem',
        margin: '5px 0',
        padding: '8px 35px',
        textAlign: 'center',
        width: 'auto'
    }
};

const DaySlider = ({
    duration,
    handleDurationChange
}) => (
    <div className="slider-container">
        <RcSlider
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

export default class DayForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            duration,
            interval,
            handleCheckPointChange,
            handleDurationChange
        } = this.props;

        return (
            <div className="day-form">
                <DaySlider
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                />
                <RadioButtonGroup
                    className="radio-button-group"
                    defaultSelected={interval || 1}
                    name="frequency"
                    onChange={handleCheckPointChange}
                >
                    <RadioButton
                        iconStyle={styles.hidden}
                        inputStyle={styles.inputStyle}
                        label="每一天回報"
                        labelStyle={styles.labelStyle}
                        value={1}
                    />
                    <RadioButton
                        iconStyle={styles.hidden}
                        inputStyle={styles.inputStyle}
                        label="每兩天回報"
                        labelStyle={styles.labelStyle}
                        value={2}
                    />
                    <RadioButton
                        iconStyle={styles.hidden}
                        inputStyle={styles.inputStyle}
                        label="每三天回報"
                        labelStyle={styles.labelStyle}
                        value={3}
                    />
                </RadioButtonGroup>
            </div>
        );
    }
}

DayForm.propTypes = {
    duration: PropTypes.number.isRequired,
    handleCheckPointChange: PropTypes.func.isRequired,
    handleDurationChange: PropTypes.func.isRequired
};
