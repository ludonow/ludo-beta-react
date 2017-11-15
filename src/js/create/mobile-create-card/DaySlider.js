import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';

const maxDuration = 14;

export default class DaySlider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            duration,
            handleDurationChange
        } = this.props;

        return (
            <div>
                <RcSlider
                    max={maxDuration}
                    min={3}
                    defaultValue={duration}
                    onChange={handleDurationChange}
                    value={duration}
                />
            </div>
        );
    }
}

DaySlider.propTypes = {
    duration: PropTypes.number.isRequired,
    handleDurationChange: PropTypes.func.isRequired
};
