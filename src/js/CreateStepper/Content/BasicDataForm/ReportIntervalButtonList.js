import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    RadioButton,
    RadioButtonGroup,
} from 'material-ui/RadioButton';

import { labelList } from '../../../assets/reportInterval';

// styled components
const StyledRadioButtonGroup = styled(RadioButtonGroup)`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
    @media (min-width: 769px) {
        flex-direction: row;
    }

    input:checked + div {
        label {
            background-color: #FFC645;
            color: white !important;
        }
    }
`;

// override material ui style
const styles = {
    hidden: {
        display: 'none',
    },
    labelStyle: {
        border: '1px solid #FFC645',
        borderRadius: '20px',
        color: '#FFC645',
        fontSize: '14px',
        fontFamily: 'Exo, Microsoft JhengHei',
        fontWeight: 'bold',
        padding: '2px 10px',
        textAlign: 'center',
        width: 'auto',
    },
    radioButtonStyle: {
        margin: '5px auto',
        width: 'auto',
    }
};

const ReportIntervalButtonList = ({
    handleCheckPointChange,
    interval,
}) => (
    <StyledRadioButtonGroup
        defaultSelected={interval ? Number(interval) : 1}
        name="frequency"
        onChange={handleCheckPointChange}
    >
        {
            labelList.map((label, index) => (
                <RadioButton
                    iconStyle={styles.hidden}
                    label={label}
                    labelStyle={styles.labelStyle}
                    key={`create-stepper-frequecy-button-${index}`}
                    style={styles.radioButtonStyle}
                    value={index+1}
                />
            ))
        }
    </StyledRadioButtonGroup>
);

ReportIntervalButtonList.propTypes = {
    handleCheckPointChange: PropTypes.func.isRequired,
    interval: PropTypes.number.isRequired,
}

export default ReportIntervalButtonList;
