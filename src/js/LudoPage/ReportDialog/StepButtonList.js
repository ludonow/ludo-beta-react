import React from 'react';
import styled from 'styled-components';

import { ButtonListWrapper } from '../../baseStyle';
import Button from '../../components/Button';
import LoadingIcon from '../../components/LoadingIcon';

const StepButtonList = ({
    handleDialogClose,
    handleReportTypeClick,
    handleStepNext,
    handleStepPrev,
    handleSubmit,
    isPreviewButtonDisabled,
    isSubmitting,
    step,
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
                        disabled={isSubmitting}
                        label="修改"
                        onClick={handleStepPrev}
                    />
                    {
                        !isSubmitting ?
                            <Button
                                backgroundColor={'#FF704E'}
                                label="送出回報"
                                onClick={handleSubmit}
                            />
                        :
                            <LoadingIcon />
                    }
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
