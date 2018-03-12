import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const ButtonWrapper = styled.div`
    bottom: 0;
    margin: 30px auto;
    position: fixed;
    z-index: 10;

    .hide {
        display:none;
    }
`;

const DesktopSubmitButton = ({
    disabled,
    label,
    onClick
}) => (
    <ButtonWrapper>
        <Button
            disabled={disabled}
            label={label}
            onClick={onClick}
        />
    </ButtonWrapper>
);

export default DesktopSubmitButton;
