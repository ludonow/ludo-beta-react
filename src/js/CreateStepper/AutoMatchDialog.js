import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import {
    ButtonListWrapper,
    discardDialogStyle
} from '../components/DiscardAlert';
import Button from '../components/Button';

const StyledButtonListWrapper = ButtonListWrapper.extend`
    button {
        width: 190px;
    }
`;

const deskTopContentStyle = {
    maxWidth: 'none',
    width: '55%',
};

const AutoMatchDialog = ({
    handleAutoMatchConfirm,
    handleCardSubmit,
    handleRequestClose,
    open,
    isMyCard,
}) => {
    const width = window.innerWidth || document.body.clientWidth;
    const discardDialogContentStyle = (width <= 768) ? discardDialogStyle.mobileContent : deskTopContentStyle;

    return (
        <Dialog
            bodyStyle={discardDialogStyle.body}
            contentStyle={discardDialogContentStyle}
            onRequestClose={handleRequestClose}
            open={open}
            title={ isMyCard ? "你已經創建過此卡片囉！" : "你好幸運！已經有人在開了這張卡片你可以直接加入他！"}
            titleStyle={discardDialogStyle.title}
        >
            <StyledButtonListWrapper>
                { 
                    isMyCard ?
                        null   
                    :
                        <Button
                            backgroundColor="#FF6262"
                            label="加入已開啟之卡片"
                            onClick={handleAutoMatchConfirm}
                        />
                }
                
            </StyledButtonListWrapper>
        </Dialog>
    );
}

AutoMatchDialog.propTypes = {
    handleAutoMatchConfirm: PropTypes.func.isRequired,
    handleCardSubmit: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    isMyCard: PropTypes.bool.isRequired,
};

export default AutoMatchDialog;
