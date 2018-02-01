import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Button from '../../components/Button';

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
    handleDialogClose,
    handleDiscardAlertClose,
    isDiscardAlertOpen
}) => (
    <Dialog
        bodyStyle={bodyStyle}
        contentStyle={contentStyle}
        open={isDiscardAlertOpen}
        onRequestClose={handleDiscardAlertClose}
        titleStyle={titleStyle}
        title="關閉將捨棄本次回報"
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
                label="捨棄回報"
                onClick={handleDialogClose}
            />
        </ButtonListWrapper>
    </Dialog>
);

export default DiscardAlert;
