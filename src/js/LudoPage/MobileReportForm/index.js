import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import axios from '../../axios-config';
import MobileImageUpload from './MobileImageUpload';
import MobileReportText from './MobileReportText';
import VideoPreview from './VideoPreview';

const FormWrapper = styled.div`
    margin-bottom: 70px;
    padding: 5%;
`;

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
            isReportButtonDisabled: true,
            video: '',
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    handleButtonClick(event) {
        event.preventDefault();
        const {
            currentUserId,
            router_currentFormValue
        } = this.props;
        const ludoId = this.props.params.ludo_id;
        const whoIsUser = (router_currentFormValue.starter_id == currentUserId) ? 'starter_check' : 'player_check';
        const ludoReportPost = {
            'ludo_id': ludoId,
            'player': whoIsUser,
            'content': this.state.content,
            'image_location': this.state.imageLocation,
            'video': this.state.video,
        };
        this.setState({
            isReportButtonDisabled: true
        });
        axios.post('apis/report', ludoReportPost)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldProfileUpdate(true);
                this.props.handleShouldReportUpdate(true);
                browserHistory.push(`/ludo/${ludoId}`);
            } else {
                if (window.confirm('回報時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                console.error('MobileReportForm Report else message from server: ', response.data.message);
                if (response.data.err) {
                    console.error('MobileReportForm Report else error from server: ', response.data.err);
                }
                this.setState({
                    isReportButtonDisabled: false
                });
            }
        })
        .catch((error) => {
            if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
            console.error('MobileReportForm Report error', error);
            this.setState({
                isReportButtonDisabled: false
            });
        });
    }

    handleTextChange(event) {
        const content = event.target.value;
        if (!content) {
            this.setState({
                content,
                isReportButtonDisabled: true
            });
        } else {
            this.setState({
                content,
                isReportButtonDisabled: false
            });
        }
    }

    handleVideoChange(event) {
        const video = event.target.value;
        if (!video) {
            this.setState({
                video,
                isReportButtonDisabled: true
            });
        } else {
            this.setState({
                video,
                isReportButtonDisabled: false
            });
        }
    }

    setImageLocation(imageUrl) {
        this.setState({
            imageLocation: imageUrl,
            isReportButtonDisabled: false
        });
    }

    render() {
        const {
            content,
            isReportButtonDisabled,
            video,
        } = this.state;

        return (
            <form>
                <FormWrapper>
                    <MobileReportText
                        onChange={this.handleTextChange}
                        content={content}
                    />
                    <MobileImageUpload setImageLocation={this.setImageLocation} />
                    <VideoPreview
                        handleVideoChange={this.handleVideoChange}
                        video={video}
                    />
                </FormWrapper>
                <ReportButtonComponent
                    onClick={this.handleButtonClick}
                    disabled={isReportButtonDisabled}
                />
            </form>
        );
    }
}