import React, { PropTypes } from 'react';
import styled from 'styled-components';

import upArrowIcon from '../../images/up-arrow.png';
import downArrowIcon from '../../images/down-arrow.png';
import { StyledButton } from './Button';

const DownArrowImage = styled.img`
    margin-top: 2px;
`;

const Label = styled.div`
    font-size: 12px;
    margin: 0 5px;
`;

const UpArrowImage = styled.img`
    margin-bottom: 1px;
`;

const UpDownToggleButtonWrapper = StyledButton.extend`
    background-color: black;
    border: none;
    border-radius: ${props => props.withLabel ? '50px' : '50%'};
    height: ${props => props.withLabel ? 'auto' : '20px'};
    margin-right: 10px;
    padding: ${props => props.withLabel ? '5px 0' : '0'};
    width: ${props => props.withLabel ? '80px' : '20px'};

    img {
        width: 10px;
    }
`;

const UpDownToggleButton = ({
    handleClick,
    isArrowPointingDown,
    label,
    labelForDownArrowIcon,
    labelForUpArrowIcon,
}) => (
    <UpDownToggleButtonWrapper
        onClick={handleClick}
        withLabel={!!label}
    >
        {
            label ?
                <Label>
                    {label}
                </Label>
            : null
        }
        {
            isArrowPointingDown ?
                <DownArrowImage
                    src={downArrowIcon}
                    title={labelForDownArrowIcon}
                />
            :
                <UpArrowImage
                    src={upArrowIcon}
                    title={labelForUpArrowIcon}
                />
        }
    </UpDownToggleButtonWrapper>
);

UpDownToggleButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isArrowPointingDown: PropTypes.bool.isRequired,
    labelForDownArrowIcon: PropTypes.string,
    labelForUpArrowIcon: PropTypes.string,
};

UpDownToggleButton.defaultProps = {
    handleClick: () => {},
    isArrowPointingDown: true,
    labelForDownArrowIcon: '往下打開',
    labelForUpArrowIcon: '往上收起',
};

export default UpDownToggleButton;
