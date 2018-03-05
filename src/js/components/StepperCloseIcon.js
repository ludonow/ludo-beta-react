import React from 'react';
import styled from 'styled-components';

import closeIconSrc from '../../images/active/close-icon.png';

const CloseIconWrapper = styled.div`
    padding: ${props => props.padding ? props.padding : '1vw'};
    position: absolute;
    right: 0;
    top: 0;

    img {
        cursor: pointer;
    }
`;

const StepperCloseIcon = ({
    handleCloseClick,
    padding,
}) => (
    <CloseIconWrapper
        padding={padding}
    >
        <img
            onClick={handleCloseClick}
            src={closeIconSrc}
            title="關閉"
        />
    </CloseIconWrapper>
);

export default StepperCloseIcon;
