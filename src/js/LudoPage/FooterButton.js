import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import deskTopCancelSettingsIcon from '../../images/active/cancel-settings.svg';
import deskTopSettingsIcon from '../../images/active/settings.svg';
import mobileCancelSettingsIcon from '../../images/active/mobile-cancel-settings.svg';
import mobileSettingsIcon from '../../images/active/mobile-settings.svg';

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
`;

const ButtonListWrapper = styled.div`
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;

    @media (max-width: 768px) {
        flex-direction: row-reverse;
        margin-bottom: 17px;
        width: calc(100% - 90px);
    }
    @media (min-width: 769px) {
        flex-direction: row;
        margin-bottom: 30px;
        width: 100%;
    }
`;

const SettingsIconButton = styled.button`
    background: transparent;
    border: none;
    bottom: 0;
    display: flex;

    img {
        height: 50px;
    }

    @media (max-width: 768px) {
        margin: 0 25px;
        padding-top: 5px;
    }
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
            const width = window.innerWidth || document.body.clientWidth;
            const cancelSettingsIcon = (width <= 768) ? mobileCancelSettingsIcon : deskTopCancelSettingsIcon;
            const settingsIcon = (width <= 768) ? mobileSettingsIcon : deskTopSettingsIcon;
            const backgroundColor = isShowingDeleteButton ? '#FF6060' : '';
            const handleClick = isShowingDeleteButton ? handleLudoDelete : handleReportDialogOpen;
            const label = isShowingDeleteButton ? '刪除戰局' : '我要回報';
            const src = isShowingDeleteButton ? cancelSettingsIcon : settingsIcon;
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={backgroundColor}
                        label={label}
                        margin="0"
                        padding="10px 30px"
                        onClick={handleClick}
                    />
                    <SettingsIconButton onClick={handleFooterButtonChange}>
                        <img src={src} />
                    </SettingsIconButton>
                </ButtonListWrapper>
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
