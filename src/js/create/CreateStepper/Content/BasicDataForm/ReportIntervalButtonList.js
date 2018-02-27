import React from 'react';
import styled from 'styled-components';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { labelList } from '../../../reportInterval';

// styled components
const StyledRadioButtonGroup = styled(RadioButtonGroup)`
    display: inline-flex;
    justify-content: center;

    input:checked + div {
        label {
            background-color: #FFC645;
            color: white !important;
        }
    }
`;

const Wrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    margin: 0 auto;
`;

// override material ui style
const styles = {
    hidden: {
        display: 'none'
    },
    labelStyle: {
        border: '1px solid #FFC645',
        borderRadius: '20px',
        color: '#FFC645',
        display: 'flex',
        fontSize: '14px',
        fontFamily: 'Exo, Microsoft JhengHei',
        fontWeight: 'bold',
        padding: '2px 10px',
        textAlign: 'center',
        width: 'auto'
    },
    radioButtonStyle: {
        display: 'flex',
        margin: '0 20px',
    }
};

const ReportIntervalButtonList = ({
    handleCheckPointChange,
    interval,
}) => (
    <Wrapper>
        <StyledRadioButtonGroup
            defaultSelected={Number(interval) ? Number(interval) : 1}
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
    </Wrapper>
);

export default ReportIntervalButtonList;
