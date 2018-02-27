import React, { PropTypes } from 'react';
import styled from 'styled-components';

import upArrowIcon from '../../images/up-arrow.png';
import downArrowIcon from '../../images/down-arrow.png';
import { StyledButton } from './Button';

const DownArrowImage = styled.img`
    margin-top: 2px;
`;

const UpArrowImage = styled.img`
    margin-bottom: 1px;
`;

const UpDownToggleButtonWrapper = StyledButton.extend`
    background-color: black;
    border: none;
    border-radius: 50%;
    height: 20px;
    margin-right: 10px;
    padding: 0;
    width: 20px;
`;

const UpDownToggleButton = ({
    handleClick,
    isArrowPointingDown,
    labelForDownArrowIcon,
    labelForUpArrowIcon,
}) => (
    <UpDownToggleButtonWrapper onClick={handleClick}>
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
