import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const ButtonWrapper = styled.div`
    margin: 30px auto;
    z-index: 10;
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
