import React, { Component } from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';

import { StyledButton } from '../components/Button';
import { StyledAnchor } from '../baseStyle';
import StepperCloseIcon from '../components/StepperCloseIcon';

// styled components
const Description = styled.div`
    color: #9D9D9D;
    margin: 50px auto 50px auto;
    text-align: left;
    width: 285px;
`;

const Hint = styled.div`
    color: #9D9D9D;
    margin-top: 40px;
    margin-bottom: 50px;
`;

// override material ui
const bodyStyle = {
    fontFamily: 'Helvetica',
};

const dialogStyle = {
    textAlign: 'center',
};

const titleStyle = {
    color: '#919191',
    fontFamily: 'Exo, Microsoft JhengHei',
    fontWeight: 'bold',
};

class Bind extends Component {
    constructor() {
        super();
        this.state = {
            isBindButtonClicked: false,
            open: true,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    
    handleButtonClick() {
        this.setState({
            isBindButtonClicked: true,
        });
    }

    handleCloseClick() {
        if (!this.props.userBasicData.chatfuel_id) {
            if (this.state.isBindButtonClicked) {
                this.handleDialogClose();
            } else {
                if (window.confirm('綁定 Messenger 後可以即時收到通知，確定不要綁定嗎？')) {
                    this.handleDialogClose();
                }
            }
        } else {
            this.handleDialogClose();
        }
    }

    handleDialogClose() {
        this.setState({
            open: false,
        });
        browserHistory.push('/cardList');
    }

    render() {
        const {
            open
        } = this.state;

        return (
            <div>
                <Dialog
                    bodyStyle={bodyStyle}
                    onRequestClose={this.handleCloseClick}
                    open={open}
                    style={dialogStyle}
                    title="享受更好的平台體驗！"
                    titleStyle={titleStyle}
                >
                    <StepperCloseIcon handleCloseClick={this.handleCloseClick} />
                    <Hint>
                        點擊以下按鈕連結 Messenger
                    </Hint>
                    <StyledButton
                        backgroundColor="#FFC62B"
                        fontSize="16px"
                        onClick={this.handleButtonClick}
                        padding="8px"
                        width="130px"
                    >
                        <StyledAnchor href="https://m.me/ludonow?ref=link">
                            確認綁定帳號
                        </StyledAnchor>
                    </StyledButton>
                    <Description>
                        LUDO 團隊‧創新開發了由 Messenger AI 導向的新功能，致力於優化使用者跨裝置便利性，歡迎您隨時反應使用上的經驗，我們會儘速優化及更新！
                    </Description>
                </Dialog>
            </div>
        );
    }
}

export default Bind;
