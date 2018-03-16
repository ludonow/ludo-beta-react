import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import cancelSettingsIcon from '../../images/active/cancel_settings.svg';
import settingsIcon from '../../images/active/settings.svg';

/*
    router_ludoPageIndex        statement：
    0                           not login
    1                           stage 1 creator
    2                           stage 1 other players
    3                           stage 2 playerA (creator)
    4                           stage 2 playerB
    5                           stage 2 other players
    6                           stage 3 all
*/

const ButtonWrapper = styled.div`
    bottom: 0;
    display: flex;
    position: fixed;

    .no-position-fixed {
        /* position: relative !important; */
    }
`;

const SettingsIconButton = styled.button`
    background: transparent;
    border: none;
    bottom: 0;
    height: 40px;
    margin-top: 30px;
    padding: 0px;
    width: 40px;
`;

const FooterButton = ({
    handleFooterButtonChange,
    handleLudoDelete,
    handleReportDialogOpen,
    handleSubmit,
    isJoinButtonDisabled,
    isShowingDeleteButton,
    router_ludoPageIndex,
}) => {
    switch (router_ludoPageIndex) {
        case 0:
        case 2:
            return (
                <ButtonWrapper>
                    <Button
                        disabled={isJoinButtonDisabled}
                        label="加入戰局"
                        margin="30px auto"
                        onClick={handleSubmit}
                    />
                </ButtonWrapper>
            );
        case 3:
        case 4:
            return (
                <ButtonWrapper>
                    <Button
                        label="我要回報"
                        margin="30px auto"
                        onClick={handleReportDialogOpen}
                    />
                </ButtonWrapper>
            );
        case 1:
            const backgroundColor = isShowingDeleteButton ? '#FF6060' : '';
            const className = isShowingDeleteButton ? '' : 'no-position-fixed';
            const handleClick = isShowingDeleteButton ? handleLudoDelete : handleReportDialogOpen;
            const label = isShowingDeleteButton ? '刪除戰局' : '我要回報';
            const src = isShowingDeleteButton ? cancelSettingsIcon : settingsIcon;
            return (
                <ButtonWrapper>
                    <Button
                        backgroundColor={backgroundColor}
                        className={className}
                        onClick={handleClick}
                        label={label}
                        margin="30px 0"
                    />
                    <SettingsIconButton onClick={handleFooterButtonChange}>
                        <img src={src} />
                    </SettingsIconButton>
                </ButtonWrapper>
            );
        default:
            return (
                <div></div>
            );
    }
}

FooterButton.propTypes = {
    handleFooterButtonChange: PropTypes.func.isRequired,
    handleLudoDelete: PropTypes.func.isRequired,
    handleReportDialogOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isJoinButtonDisabled: PropTypes.bool.isRequired,
    isShowingDeleteButton: PropTypes.bool.isRequired,
    router_ludoPageIndex: PropTypes.number.isRequired,
};

export default FooterButton;
