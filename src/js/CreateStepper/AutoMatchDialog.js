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
}) => {
    const width = window.innerWidth || document.body.clientWidth;
    const discardDialogContentStyle = (width <= 768) ? discardDialogStyle.mobileContent : deskTopContentStyle;

    return (
        <Dialog
            bodyStyle={discardDialogStyle.body}
            contentStyle={discardDialogContentStyle}
            onRequestClose={handleRequestClose}
            open={open}
            title="已有其他人開啟之卡片，要加入其他人創建的卡片嗎"
            titleStyle={discardDialogStyle.title}
        >
            <StyledButtonListWrapper>
                <Button
                    backgroundColor="#FFFFFF"
                    label="仍要創建新卡片"
                    onClick={handleCardSubmit}
                    textColor="#707070"
                />
                <Button
                    backgroundColor="#FF6262"
                    label="加入已開啟之卡片"
                    onClick={handleAutoMatchConfirm}
                />
            </StyledButtonListWrapper>
        </Dialog>
    );
}

AutoMatchDialog.propTypes = {
    handleAutoMatchConfirm: PropTypes.func.isRequired,
    handleCardSubmit: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AutoMatchDialog;
