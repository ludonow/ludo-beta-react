import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import StepperCloseIcon from '../components/StepperCloseIcon';

class Bind extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick() {
        this.setState({
            open: false,
        })
    }

    render() {
        const {
            open
        } = this.state;

        return (
            <div>
                <Dialog
                    onRequestClose={this.handleCloseClick}
                    open={open}
                    title="享受更好的平台體驗！"
                >
                    <StepperCloseIcon handleCloseClick={this.handleCloseClick} />
                    點擊以下按鈕連結 Messenger
                    確認綁定帳號
                    LUDO 團隊‧創新開發了由 Messenger AI 導向的新功能，致力於優化使用者跨裝置便利性，歡迎您隨時反應使用上的經驗，我們會儘速優化及更新！
                </Dialog>
            </div>
        );
    }
}

Bind.propTypes = {
};

export default Bind;