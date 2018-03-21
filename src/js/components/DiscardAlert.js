import React from 'react';
import PropTypes from 'prop-types';
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

const deskTopContentStyle = {
    maxWidth: 'none',
    width: '35%',
};
const mobileContentStyle = {
    maxWidth: 'none',
    width: '80%',
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
    handleDiscardAlertClose,
    handleDiscardConfirm,
    isDiscardAlertOpen,
}) => {
    const width = window.innerWidth || document.body.clientWidth;
    const contentStyle = (width <= 768) ? mobileContentStyle : deskTopContentStyle;

    return (
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
                    onClick={handleDiscardConfirm}
                />
            </ButtonListWrapper>
        </Dialog>
    );
}

DiscardAlert.propTypes = {
    alertTitle: PropTypes.string,
    buttonLabel: PropTypes.string,
    handleDiscardAlertClose: PropTypes.func.isRequired,
    handleDiscardConfirm: PropTypes.func.isRequired,
    isDiscardAlertOpen: PropTypes.bool.isRequired,
};

export default DiscardAlert;
