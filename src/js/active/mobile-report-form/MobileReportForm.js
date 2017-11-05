import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import axios from '../../axios-config';

import MobileImageUpload from './MobileImageUpload';
import MobileReportText from './MobileReportText';
import ReportButton from '../ReportButton';

export default class MobileReportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            imageLocation: '',
            isReportButtonClickable: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    handleSubmit(event) {
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
        axios.post('apis/report', ludoReportPost)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldProfileUpdate(true);
                this.props.handleShouldReportUpdate(true);
                browserHistory.push(`/ludo/${ludoId}`);
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
        this.setState({
            content: event.target.value,
            isReportButtonClickable: true
        });
    }

    setImageLocation(imageUrl) {
        this.setState({
            imageLocation: imageUrl,
            isReportButtonClickable: true
        });
    }

    /* components/mobile-report-form.scss */
    render() {
        const { params } = this.props;
        return (
            <form onSubmit={this.handleSubmit} >
                <div className="mobile-report-form">
                    <MobileReportText
                        onChange={this.handleTextChange}
                        content={this.state.content}
                    />
                    <MobileImageUpload setImageLocation={this.setImageLocation} />
                </div>
                <ReportButton
                    disabled={!this.state.isReportButtonClickable}
                    label="發送回報"
                />
            </form>
        );
    }
}