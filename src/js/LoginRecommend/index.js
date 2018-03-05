import React, { Component } from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';

import { StyledButton } from '../components/Button';
import { StyledAnchor, StyledLink } from '../baseStyle';
import StepperCloseIcon from '../components/StepperCloseIcon';
import rightArrowIcon from '../../images/login/right-arrow.png';

// styled components
const ButtonWrapper = styled.div`
    margin: 10px 0;
`;

const Hint = styled.div`
    color: #9D9D9D;
    line-height: 1.3rem;
    margin-top: 40px;
    margin-bottom: 50px;
`;

const StyledImg = styled.img`
    margin-left: 20px;
`;

// override material ui
const bodyStyle = {
    fontFamily: 'Helvetica',
    paddingBottom: '80px',
};

const dialogStyle = {
    textAlign: 'center',
};

const titleStyle = {
    color: '#919191',
    fontFamily: 'Exo, Microsoft JhengHei',
    fontWeight: 'bold',
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
            open
        } = this.state;

        return (
            <div>
                <Dialog
                    bodyStyle={bodyStyle}
                    onRequestClose={this.handleDialogClose}
                    open={open}
                    style={dialogStyle}
                    title="享受更好的平台體驗！"
                    titleStyle={titleStyle}
                >
                    <StepperCloseIcon handleCloseClick={this.handleDialogClose} />
                    <Hint>
                        <div>
                            使用 Facebook 登入，綁定 Messneger
                        </div>
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
                        <StyledButton
                            backgroundColor="#B2B2B2"
                            fontSize="16px"
                            onClick={this.handleButtonClick}
                            padding="8px"
                            width="180px"
                        >
                            <StyledLink href="/signup">
                                繼續註冊
                            </StyledLink>
                        </StyledButton>
                    </ButtonWrapper>
                </Dialog>
            </div>
        );
    }
}

export default LoginRecommend;
