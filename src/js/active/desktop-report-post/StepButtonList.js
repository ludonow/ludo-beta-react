import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const ButtonListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 4vw 0;

    button {
        margin: 0 2vw;
    }
`;

const StepButtonList = ({
    handleStepNext,
    handleStepPrev,
    isReporting,
    step
}) => {
    switch(step) {
        case 0:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        data="text"
                        label="跳至文字回報"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 1:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        backgroundColor={'#717171'}
                        disabled={step <= 1}
                        label="預覽"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
    }
};

export default StepButtonList;
