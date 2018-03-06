import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { Form } from 'formsy-react';
import md5 from 'blueimp-md5';

import axios from '../axios-config';
import { baseUrl } from '../baseurl-config';
import Button, { StyledButton } from '../components/Button';
import {
    StyledAnchor,
    StyledDialog,
    StyledLink
} from '../baseStyle';
import FormsyHOCInput from '../app/FormsyHOCInput';
import StepperCloseIcon from '../components/StepperCloseIcon';
import rightArrowIcon from '../../images/login/right-arrow.png';

const validators = {
    email: {
        message: '不是有效的 Email',
    },
    maxLength: {
        message: '不可超過50個字'
    },
    password: {
        regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: '密碼必須大於8碼，至少有1個數字和1個英文字',
    },
};

Formsy.addValidationRule('isPassword', (values, value) => {
    if (validators.password.regexp.test(value)) {
        return true;
    } else {
        return false;
    }
});

// styled components
const ButtonList = styled.div`
    display: inline-flex;
    justify-content: space-between;
    margin: 10px auto 0 auto;

    @media (min-width: 769px) {
        width: 65%;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ErrorMessage = styled.div`
    color: red;
`;

const FacebookLoginButtonWrapper = styled.div`
    margin: 10px 0;

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

const Hint = styled.div`
    color: #9D9D9D;
    line-height: 1.3rem;
    margin-top: 40px;
    margin-bottom: 50px;
`;

const LoginForm = styled(Form)`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;

    .error-message {
        color: red;
        font-size: 12px;
    }

    input {
        background-color: #DEDEDE;
        border: none;
        border-radius: 50px;
        caret-color: auto;
        color: #707070;
        margin: 10px auto;
        padding: 10px 0 10px 10px;

        @media (min-width: 769px) {
            width: 60%;
        }

        @media (max-width: 768px) {
            width: calc(100% - 10px);
        }

        ::placeholder {
            color: #BCBCBC;
        }
    }

    @media (min-width: 769px) {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
    }

    @media (max-width: 768px) {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
    }
`;

const Or = styled.div`
    font-family: "Exo", "Microsoft JhengHei";
    margin-bottom: 5px;

    @media (min-width: 769px) {
        display: none;
    }
`;

const OtherLinkWrapper = styled.div`
    font-size: 12px;
    margin-top: 30px;
`;

const SocialMediaWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 769px) {
        border-right: 2px solid #B5B5B5;
        grid-column: 1 / 2;
        grid-row: 1 / 3;
    }

    @media (max-width: 768px) {
        border-bottom: 2px solid #B5B5B5;
        grid-column: 1 / 3;
        grid-row: 1 / 2;
    }
`;

const StyledImg = styled.img`
    margin-left: 20px;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    grid-template-rows: 0.3fr 0.7fr;

    @media (max-width: 768px) {
        padding: 0 30px;
    }
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
    fontSize: '16px',
    padding: '70px 0 10px 0',
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            errorMessageFromServer: '',
            isButtonDisabled: false,
            open: true,
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    disableButton() {
        this.setState({
            isButtonDisabled: true
        });
    }

    enableButton() {
        this.setState({
            isButtonDisabled: false
        });
    }

    handleDialogClose() {
        this.setState({
            open: false,
        });
        browserHistory.push('/cardList');
    }

    handleLoginSubmit(logInData) {
        logInData.password = md5(logInData.password);
        axios.post('/login', logInData)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldUserBasicDataUpdate(true);
                browserHistory.push('/cardList');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0]
                });
            }
        })
        .catch((error) => {
            if (window.confirm('登入時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    render() {
        const {
            errorMessageFromServer,
            isButtonDisabled,
            open,
        } = this.state;

        const width = window.innerWidth || document.body.clientWidth;

        const bodyStyle = (width <= 768) ? mobileBodyStyle : desktopBodyStyle;
        const titleStyle = (width <= 768) ? mobileTitleStyle : desktopTitleStyle;
        const buttonWidth = (width <= 768) ? '85px' : '95px';

        return (
            <StyledDialog
                bodyStyle={bodyStyle}
                onRequestClose={this.handleDialogClose}
                open={open}
                style={dialogStyle}
                title="成為會員，與玩家們互動吧！"
                titleStyle={titleStyle}
            >
                <Wrapper>
                    <StepperCloseIcon
                        handleCloseClick={this.handleDialogClose}
                        padding="15px"
                    />
                    <SocialMediaWrapper>
                        <FacebookLoginButtonWrapper>
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
                        </FacebookLoginButtonWrapper>
                        <Or>
                            或
                        </Or>
                    </SocialMediaWrapper>
                    <LoginForm
                        onInvalid={this.disableButton}
                        onValid={this.enableButton}
                        onValidSubmit={this.handleLoginSubmit}
                    >
                        <FormsyHOCInput
                            name="email"
                            placeholder="信箱"
                            required
                            type="text"
                            validationErrors={{
                                isEmail: validators.email.message,
                            }}
                            validations={{
                                isEmail: true,
                            }}
                        />
                        <FormsyHOCInput
                            name="password"
                            placeholder="密碼"
                            required
                            type="password"
                            validationErrors={{
                                isPassword: validators.password.message,
                            }}
                            validations={{
                                isPassword: true,
                            }}
                        />
                        <ButtonList>
                            <Button
                                backgroundColor="#FF5C5C"
                                disabled={isButtonDisabled}
                                fontSize="12px"
                                label="登入"
                                margin="0"
                                padding="8px"
                                type="submit"
                                width={buttonWidth}
                            />
                            <StyledButton
                                backgroundColor="#005074"
                                fontSize="12px"
                                margin="0"
                                padding="8px"
                                width={buttonWidth}
                            >
                                <StyledLink to={`${baseUrl}/login-recommend`}>
                                    註冊
                                </StyledLink>
                            </StyledButton>
                        </ButtonList>
                        <ErrorMessage>
                            {errorMessageFromServer}
                        </ErrorMessage>
                        <OtherLinkWrapper>
                            <StyledAnchor
                                color="#B4B0B0"
                                fontFamily="Exo, Microsoft JhengHei"
                                href="https://api.ludonow.com/users/password/new"
                            >
                                忘記密碼？
                            </StyledAnchor>
                        </OtherLinkWrapper>
                    </LoginForm>
                </Wrapper>
            </StyledDialog>
        );
    }
}

export default Login;
