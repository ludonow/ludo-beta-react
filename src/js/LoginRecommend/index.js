import React, { Component } from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';

import Button, { StyledButton } from '../components/Button';
import {
    StyledAnchor,
    StyledDialog,
    StyledLink,
} from '../baseStyle';
import StepperCloseIcon from '../components/StepperCloseIcon';
import rightArrowIcon from '../../images/login/right-arrow.png';

// styled components
const ButtonWrapper = styled.div`
    margin: 10px 0;
`;

const Hint = styled.div`
    color: #9D9D9D;
    line-height: 1.3rem;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        margin-top: 40px;
    }
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

const Paragraph = styled.div`
    display: flex;
    justify-content: center;

    @media (min-width: 769px) {
        flex-direction: row;
    }
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledImg = styled.img`
    margin-left: 20px;
`;

// override material ui
const desktopBodyStyle = {
    fontFamily: 'Helvetica',
    padding: '30px 0 80px 0',
};
const mobileBodyStyle = {
    ...desktopBodyStyle,
    padding: '0 0 20px 0',
};

const dialogStyle = {
    textAlign: 'center',
};

const desktopTitleStyle = {
    color: '#919191',
    fontFamily: 'Exo, Microsoft JhengHei',
    fontWeight: 'bold',
};
const mobileTitleStyle = {
    ...desktopTitleStyle,
    fontSize: '18px',
    padding: '70px 0 10px 0',
};

class LoginRecommend extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose() {
        const { currentUserId } = this.props;

        if (!currentUserId) {
            if (window.confirm('註冊尚未完成，確定不要繼續嗎？')) {
                this.setState({
                    open: false,
                });
                browserHistory.push('/cardList');
            }
        } else {
            browserHistory.push('/cardList');
        }
    }

    render() {
        const {
            open,
        } = this.state;

        const width = window.innerWidth || document.body.clientWidth;

        const bodyStyle = (width <= 768) ? mobileBodyStyle : desktopBodyStyle;
        const titleStyle = (width <= 768) ? mobileTitleStyle : desktopTitleStyle;

        return (
            <StyledDialog
                bodyStyle={bodyStyle}
                onRequestClose={this.handleDialogClose}
                open={open}
                style={dialogStyle}
                title="享受更好的平台體驗！"
                titleStyle={titleStyle}
            >
                <StepperCloseIcon
                    handleCloseClick={this.handleDialogClose}
                    padding="15px"
                />
                <Hint>
                    <Paragraph>
                        <div>
                            使用 Facebook 登入，
                        </div>
                        <div>
                            綁定 Messneger
                        </div>
                    </Paragraph>
                    <div>
                        享受更好的平台體驗！
                    </div>
                </Hint>
                <ButtonWrapper>
                    <StyledButton
                        backgroundColor="#3A5691"
                        fontSize="16px"
                        padding="8px 5px 8px 30px"
                        width="180px"
                    >
                        <StyledAnchor href="https://api.ludonow.com/auth/facebook">
                            facebook登入
                            <StyledImg src={rightArrowIcon} />
                        </StyledAnchor>
                    </StyledButton>
                </ButtonWrapper>
                <ButtonWrapper>
                    <StyledLink to="/signup">
                        <Button
                            backgroundColor="#B2B2B2"
                            fontSize="16px"
                            onClick={this.handleButtonClick}
                            label="繼續註冊"
                            padding="8px"
                            width="180px"
                        />
                    </StyledLink>
                </ButtonWrapper>
            </StyledDialog>
        );
    }
}

export default LoginRecommend;
