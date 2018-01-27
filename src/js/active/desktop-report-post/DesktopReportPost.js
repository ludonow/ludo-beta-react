import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';

import Content from './Content';
import DiscardAlert from './DiscardAlert';
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
            imageUrl: '',
            isDiscardAlertOpen: false,
            isPreviewButtonDisabled: true,
            isReporting: false,
            open: false,
            step: 0,
            text: '',
            reportType: '',
            video: ''
        };
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDiscardAlertClose = this.handleDiscardAlertClose.bind(this);
        this.handleReportTypeClick = this.handleReportTypeClick.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleCloseClick() {
        const { isReporting } = this.state;
        if (isReporting) {
            this.setState({ isDiscardAlertOpen: true });
        } else {
            this.handleDialogClose();
        }
    }

    handleDialogClose() {
        this.setState({
            imageUrl: '',
            isDiscardAlertOpen: false,
            isPreviewButtonDisabled: true,
            isReporting: false,
            open: false,
            step: 0,
            text: '',
            reportType: '',
            video: ''
        });
    }

    handleDialogOpen() {
        this.setState({ open: true });
    }

    handleDiscardAlertClose() {
        this.setState({ isDiscardAlertOpen: false });
    }

    handleImageChange(event) {
        const image = event.currentTarget.value;
        if (!image) {
            this.setState({
                image,
                isReporting: false
            });
        } else {
            const {
                reportType,
                text
            } = this.state;
    
            if (text && reportType === 'text') {
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    image
                });
            }
        }
    }

    handleReportTypeClick(event) {
        const reportType = event.currentTarget.dataset.payload;
        this.setState({
            reportType,
            step: 1
        });
    }

    handleStepNext() {
        this.setState(
            prevState => ({
                step: prevState.step + 1
            })
        );
    }

    handleStepPrev() {
        this.setState(
            prevState => ({
                ...prevState,
                step: prevState.step - 1
            })
        );
    }

    handleTextChange(event) {
        const text = event.currentTarget.value;
        if (!text) {
            this.setState({
                isPreviewButtonDisabled: true,
                isReporting: false,
                text
            });
        } else {
            const {
                image,
                reportType,
                video,
            } = this.state;
    
            if (image && reportType === 'image') {
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    text
                });
            }
            if (text && reportType === 'text') {
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    text
                });
            }
            if (video && reportType === 'video') {
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    text
                });
            }
        }
    }

    handleVideoChange(event) {
        const video = event.currentTarget.value;
        if (!video) {
            this.setState({
                isReporting: false,
                video
            });
        } else {
            const {
                reportType,
                text
            } = this.state;
    
            if (text && reportType === 'text') {
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    video
                });
            }
        }
    }

    render() {
        const {
            image,
            isDiscardAlertOpen,
            isPreviewButtonDisabled,
            open,
            reportType,
            step,
            text,
            video
        } = this.state;
        return (
            <DesktopReportPostWrapper>
                <ToggleButton
                    onClick={this.handleDialogOpen}
                    label="我要回報"
                />
                <Dialog
                    contentStyle={contentStyle}
                    onRequestClose={this.handleCloseClick}
                    open={open}
                    title="輸入回報"
                    titleStyle={titleStyle}
                >
                    <CloseIconWrapper>
                        <img
                            onClick={this.handleCloseClick}
                            src={closeIconSrc}
                            title="關閉"
                        />
                    </CloseIconWrapper>
                    <Content
                        handleDialogClose={this.handleDialogClose}
                        handleImageChange={this.handleImageChange}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleTextChange={this.handleTextChange}
                        handleVideoChange={this.handleVideoChange}
                        image={image}
                        step={step}
                        text={text}
                        reportType={reportType}
                        video={video}
                    />
                    <StepButtonList
                        handleDialogClose={this.handleDialogClose}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        step={step}
                    />
                </Dialog>
                <DiscardAlert
                    handleDialogClose={this.handleDialogClose}
                    handleDiscardAlertClose={this.handleDiscardAlertClose}
                    isDiscardAlertOpen={isDiscardAlertOpen}
                />
            </DesktopReportPostWrapper>
        );
    }
} 

export default DesktopReportPost;
