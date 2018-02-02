import React from 'react';
import styled from 'styled-components';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Button from '../../components/Button';

// styled components
const ButtonListWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vw 0;

    button {
        margin: 0 30px;
    }
`;

const LoadingIconWrapper = styled.div`
    position: relative;
    margin-left: 70px;
    margin-right: 90px;
    text-align: center;
`;

// override material-ui
const loadingStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'relative'
};

const StepButtonList = ({
    handleDialogClose,
    handleReportTypeClick,
    handleStepNext,
    handleStepPrev,
    handleSubmit,
    isPreviewButtonDisabled,
    isSubmitting,
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
                            <LoadingIconWrapper>
                                <RefreshIndicator
                                    left={10}
                                    size={40}
                                    status="loading"
                                    style={loadingStyle}
                                    top={0}
                                />
                            </LoadingIconWrapper>
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
