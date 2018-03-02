import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Button from './Button';

const ButtonListWrapper = styled.div`
    display: flex;
    justify-content: center;
    & > button {
        font-size: 0.8rem;
        margin: 0 1vw;
    }
`;

// override material-ui style
const bodyStyle = {
    backgroundColor: '#374867',
    border: '1px solid #374867',
    overflowX: 'hidden'
};

const contentStyle = {
    width: '35%',
    maxWidth: 'none'
};

const titleStyle = {
    backgroundColor: '#374867',
    border: '1px solid #374867',
    color: 'white',
    fontFamily: 'Microsoft JhengHei',
    padding: '2vw 0 2vw 0',
    textAlign: 'center'
};

const DiscardAlert = ({
    alertTitle,
    buttonLabel,
    handleDialogClose,
    handleDiscardAlertClose,
    isDiscardAlertOpen,
}) => (
    <Dialog
        bodyStyle={bodyStyle}
        contentStyle={contentStyle}
        open={isDiscardAlertOpen}
        onRequestClose={handleDiscardAlertClose}
        titleStyle={titleStyle}
        title={alertTitle ? alertTitle : '關閉將捨棄已輸入的內容'}
    >
        <ButtonListWrapper>
            <Button
                backgroundColor={'#FFFFFF'}
                label="取消"
                onClick={handleDiscardAlertClose}
                textColor={'#707070'}
            />
            <Button
                backgroundColor={'#FF6262'}
                label={buttonLabel ? buttonLabel : '捨棄'}
                onClick={handleDialogClose}
            />
        </ButtonListWrapper>
    </Dialog>
);

export default DiscardAlert;
