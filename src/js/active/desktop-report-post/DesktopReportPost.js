import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Content from './Content';
import ToggleButton from './ToggleButton';
import StepButtonList from './StepButtonList';
import closeIconSrc from '../../../images/active/close-icon.png';

// style components
const CloseIconWrapper = styled.div`
    left: 0;
    padding: 1vw;
    position: absolute;
    top: 0;

    img {
        cursor: pointer;
    }
`;

const DesktopReportPostWrapper = styled.div`
    position: fixed;
`;

// override material-ui style
const contentStyle = {
    width: '60%',
    maxWidth: 'none'
};

const titleStyle = {
    fontFamily: 'Microsoft JhenHei',
    textAlign: 'center'
};

class DesktopReportPost extends Component {
    constructor() {
        super();
        this.state = {
            discardAlertOpen: false,
            imageUrl: '',
            isReporting: false,
            open: false,
            step: 0,
            text: '',
            reportType: '',
            video: ''
        };
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleIsReportingToggle = this.handleIsReportingToggle.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleDialogClose() {
        this.setState({ open: false });
    }

    handleDialogOpen() {
        this.setState({
            open: true,
            step: 0
        });
    }

    handleImageChange(event) {
        const image = event.currentTarget.value;
        if (!image) {
            this.setState({
                image,
                isReporting: false,
                step: 2
            });
        } else {
            this.setState({
                image,
                isReporting: true,
                step: 1
            });
        }
    }

    handleIsReportingToggle() {
        this.setState(
            prevState => ({
                isReporting: !prevState.isReporting
            })
        );
    }

    handleStepNext(event) {
        const { attr } = event.target.dataset;
        this.setState(
            prevState => ({
                step: prevState.step + 1,
                reportType: attr
            })
        );
    }

    handleStepPrev() {
        this.setState(
            prevState => ({
                step: prevState.step - 1
            })
        );
    }

    handleTextChange(event) {
        const text = event.currentTarget.value;
        if (!text) {
            this.setState({
                isReporting: false,
                step: 1,
                text
            });
        } else {
            this.setState({
                isReporting: true,
                step: 2,
                text
            });
        }
    }

    handleVideoChange(event) {
        const video = event.currentTarget.value;
        if (!video) {
            this.setState({
                isReporting: false,
                step: 1,
                video
            });
        } else {
            this.setState({
                isReporting: true,
                step: 2,
                video
            });
        }
    }

    render() {
        const {
            isReporting,
            open,
            step,
            reportType
        } = this.state;
        return (
            <DesktopReportPostWrapper>
                <ToggleButton
                    onClick={this.handleDialogOpen}
                    label="我要回報"
                />
                <Dialog
                    contentStyle={contentStyle}
                    modal={true}
                    open={open}
                    title="輸入回報"
                    titleStyle={titleStyle}
                >
                    <CloseIconWrapper>
                        <img
                            onClick={this.handleDialogClose}
                            src={closeIconSrc}
                            title="關閉"
                        />
                    </CloseIconWrapper>
                    <Content
                        handleDialogClose={this.handleDialogClose}
                        handleImageChange={this.handleImageChange}
                        handleIsReportingToggle={this.handleIsReportingToggle}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleTextChange={this.handleTextChange}
                        handleVideoChange={this.handleVideoChange}
                        step={step}
                        reportType={reportType}
                    />
                    <StepButtonList
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        isReporting={isReporting}
                        step={step}
                    />
                </Dialog>
            </DesktopReportPostWrapper>
        );
    }
} 

export default DesktopReportPost;
