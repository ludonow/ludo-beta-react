import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import {
    ButtonListWrapper,
    discardDialogStyle
} from '../components/DiscardAlert';
import Button from '../components/Button';

const AutoMatchDialog = ({
    handleAutoMatchSubmit,
    handleCardSubmit,
    handleRequestClose,
    open,
}) => {
    const width = window.innerWidth || document.body.clientWidth;
    const discardDialogContentStyle = (width <= 768) ? discardDialogStyle.mobileContent : discardDialogStyle.deskTopContent;

    return (
        <Dialog
            bodyStyle={discardDialogStyle.body}
            contentStyle={discardDialogContentStyle}
            onRequestClose={handleRequestClose}
            open={open}
            title="已有其他人開啟之卡片，要加入其他人創建的卡片嗎"
            titleStyle={discardDialogStyle.title}
        >
            <ButtonListWrapper>
                <Button
                    backgroundColor="#FFFFFF"
                    label="仍要創建新卡片"
                    onClick={handleCardSubmit}
                    textColor="#707070"
                />
                <Button
                    backgroundColor="#FF6262"
                    label="加入已開啟之卡片"
                    onClick={handleAutoMatchSubmit}
                />
            </ButtonListWrapper>
        </Dialog>
    );
}

AutoMatchDialog.propTypes = {
    handleAutoMatchSubmit: PropTypes.func.isRequired,
    handleCardSubmit: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AutoMatchDialog;
