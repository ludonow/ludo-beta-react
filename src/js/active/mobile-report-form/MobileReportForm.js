import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import axios from '../../axios-config';

import MobileImageUpload from './MobileImageUpload';
import MobileReportText from './MobileReportText';
import ReportButton from '../ReportButton';

const ReportButtonWrapper = styled.div`
    bottom: 0;
    padding: 0.8rem 0;
    position: fixed;
    text-align: center;
    width: 100vw;
    z-index: 2;
`;

const ButtonWithStyle = styled.button`
    align-items: center;
    background-color: #2E968C;
    background-size: cover;
    border-radius: 50px;
    border-width: 2px;
    border-right: none;
    border-left: none;
    border-top: none;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    color: white;
    cursor: pointer; 
    display: flex;
    font-size: 0.8rem;
    height: 41px;
    justify-content: center;
    margin: 0 auto;
    width: 136px;

     &:disabled {
        cursor: not-allowed;
        background-color: rgb(240, 240, 240);
        border: none;
    }
`;

const ReportButtonComponent = ({
    disabled,
    onClick
}) => (
    <ReportButtonWrapper onClick={onClick}>
        <ButtonWithStyle disabled={disabled}>
            發送回報
        </ButtonWithStyle>
    </ReportButtonWrapper>
);

export default class MobileReportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            imageLocation: '',
            isReportButtonClickable: false
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    handleButtonClick(event) {
        event.preventDefault();
        const { currentUserId, router_currentFormValue } = this.props;
        const ludoId = this.props.params.ludo_id;
        let whoIsUser = '';
        (router_currentFormValue.starter_id == currentUserId) ? whoIsUser = 'starter_check' : whoIsUser = 'player_check'
        const ludoReportPost = {
            'ludo_id': ludoId,
            'player': whoIsUser,
            'content': this.state.content,
            'image_location': this.state.imageLocation,
            'tags': []
        };
        this.setState({
            isReportButtonClickable: false
        });
        axios.post('apis/report', ludoReportPost)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldProfileUpdate(true);
                this.props.handleShouldReportUpdate(true);
                browserHistory.push(`/ludo/${ludoId}`);
            } else if (response.data.message === 'both text and image are blank') {
                window.alert('文字和圖片都尚未有內容，請重試一次');
                this.setState({
                    isReportButtonClickable: true
                });
            } else {
                window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
                console.error('MobileReportForm Report else message from server: ', response.data.message);
                if (response.data.err) {
                    console.error('MobileReportForm Report else error from server: ', response.data.err);
                }
                this.setState({
                    isReportButtonClickable: true
                });
            }
        })
        .catch((error) => {
            window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
            console.error('MobileReportForm Report error', error);
            this.setState({
                isReportButtonClickable: true
            });
        });
    }

    handleTextChange(event) {
        const content = event.target.value;
        if (!content) {
            this.setState({
                content,
                isReportButtonClickable: false
            });
        } else {
            this.setState({
                content,
                isReportButtonClickable: true
            });
        }
    }

    setImageLocation(imageUrl) {
        this.setState({
            imageLocation: imageUrl,
            isReportButtonClickable: true
        });
    }

    /* components/mobile-report-form.scss */
    render() {
        return (
            <form>
                <div className="mobile-report-form">
                    <MobileReportText
                        onChange={this.handleTextChange}
                        content={this.state.content}
                    />
                    <MobileImageUpload setImageLocation={this.setImageLocation} />
                </div>
                <ReportButtonComponent
                    onClick={this.handleButtonClick}
                    disabled={!this.state.isReportButtonClickable}
                />
            </form>
        );
    }
}