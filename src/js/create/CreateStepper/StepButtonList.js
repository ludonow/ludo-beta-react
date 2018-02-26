import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import LoadingIcon from '../../components/LoadingIcon';
import { ButtonListWrapper } from '../../baseStyle';

const StepButtonList = ({
    handleDialogClose,
    handleStepNext,
    handleStepPrev,
    handleSubmit,
    handleTypeSelect,
    isNextStepButtonDisabled,
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
                        disabled={isNextStepButtonDisabled}
                        label="下一步"
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
                        backgroundColor={'#B1B1B1'}
                        data="text"
                        label="文字回報"
                        onClick={handleTypeSelect}
                    />
                </ButtonListWrapper>
            );
        case 2:
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
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 3:
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
        case 4:
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
                                label="創建模板"
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

StepButtonList.propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    handleTypeSelect: PropTypes.func.isRequired,
    handleStepNext: PropTypes.func.isRequired,
    handleStepPrev: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isPreviewButtonDisabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
};

export default StepButtonList;
