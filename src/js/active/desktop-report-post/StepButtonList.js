import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

const ButtonListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vw 0;

    button {
        margin: 0 30px;
    }
`;

const StepButtonList = ({
    handleDialogClose,
    handleReportTypeClick,
    handleStepNext,
    handleStepPrev,
    isPreviewButtonDisabled,
    step
}) => {
    switch(step) {
        case 0:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        data="text"
                        label="文字回報"
                        onClick={handleReportTypeClick}
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
                        disabled={isPreviewButtonDisabled}
                        label="預覽"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 2:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        label="修改"
                        onClick={handleStepPrev}
                    />
                    <Button
                        backgroundColor={'#FF704E'}
                        label="送出回報"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        default:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#717171'}
                        label="關閉"
                        onClick={handleDialogClose}
                    />
                </ButtonListWrapper>
            );
    }
};

export default StepButtonList;
