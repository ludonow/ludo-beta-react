import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const ButtonWrapper = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    margin: 30px auto;
    position: fixed;
    width: 1130px;
    z-index: 2;
`;

const ToggleButton = ({ onClick }) => (
    <ButtonWrapper>
        <Button
            label="我要回報"
            onClick={onClick}
        />
    </ButtonWrapper>
);

export default ToggleButton;
