import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';
import promiseFinally from 'promise.prototype.finally';

import axios from '../../axios-config';
import Content from './Content';
import DiscardAlert from './DiscardAlert';
import ToggleButton from './ToggleButton';
import StepButtonList from './StepButtonList';
import StepperCloseIcon from '../../components/StepperCloseIcon';

promiseFinally.shim();

const initialState = {
    imageLocation: '',
    images: [],
    isDiscardAlertOpen: false,
    isImageLightBoxOpen: false,
    isPreviewButtonDisabled: true,
    isReporting: false,
    isSubmitting: false,
    open: false,
    step: 0,
    text: '',
    reportType: '',
    resizedHeight: 250,
    resizedWidth: 250,
    video: '',
};

const titles = [
    "選擇回報種類",
    "輸入回報內容",
    "回報預覽"
];

// style components
const DesktopReportPostWrapper = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    position: fixed;
`;

// override material-ui style
const contentStyle = {
    width: '60%',
    maxWidth: 'none'
};

const titleStyle = {
    fontFamily: 'Microsoft JhengHei',
    textAlign: 'center'
};

class DesktopReportPost extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDiscardAlertClose = this.handleDiscardAlertClose.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleReportTypeClick = this.handleReportTypeClick.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
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
        this.setState(initialState);
    }

    handleDialogOpen() {
        this.setState({ open: true });
    }

    handleDiscardAlertClose() {
        this.setState({ isDiscardAlertOpen: false });
    }

    handleImageChange(image) {
        this.setState({
            images: [image],
            isPreviewButtonDisabled: false,
            isReporting: true
        });
    }

    handleImageResize(resizedWidth, resizedHeight) {
        this.setState({
            resizedHeight,
            resizedWidth
        });
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        });
        const { reportType } = this.state;
        if (reportType === 'image') {
            const imagePost = new FormData();
            imagePost.append('file', this.state.images[0]);
            axios.post('/apis/report-image', imagePost)
            .then(response => {
                if (response.data.status === '200') {
                    return response.data.location;
                } else {
                    console.error('DesktopReportPost handleSubmit response status from server is not OK, which is: ', response);
                    const errorMessage = 'DesktopReportPost handleSubmit response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .then(imageLocation => {
                const {
                    currentUserId,
                    ludoId,
                    router_currentFormValue
                } = this.props;
                const {
                    text,
                    video
                } = this.state;
                let whoIsUser = '';
                (router_currentFormValue.starter_id == currentUserId) ? whoIsUser = 'starter_check' : whoIsUser = 'player_check'
                const ludoReportPost = {
                    content: text,
                    image_location: imageLocation,
                    ludo_id: ludoId,
                    player: whoIsUser,
                    video
                };
                return axios.post('/apis/report', ludoReportPost)
            })
            .then(response => {
                if (response.data.status === '200') {
                    this.props.handleShouldProfileUpdate(true);
                    this.props.handleShouldReportUpdate(true);
                    this.handleDialogClose();
                } else {
                    if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    console.error('DesktopReportPost handleSubmit response data is not OK. The message from server is: ', response.data.message);
                    if (response.data.err) {
                        console.error('DesktopReportPost handleSubmit response data is not OK. The error from server is: ', response.data.err);
                        throw new Error(response.data.err);
                    }
                }
            })
            .catch(error => {
                console.error('DesktopReportPost handleSubmit catch an error: ', error);
                if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                });
            });
        } else if (reportType === 'text' || reportType === 'video') {
            const {
                currentUserId,
                ludoId,
                router_currentFormValue
            } = this.props;
            const {
                text,
                video
            } = this.state;
            let whoIsUser = '';
            (router_currentFormValue.starter_id == currentUserId) ? whoIsUser = 'starter_check' : whoIsUser = 'player_check'
            const ludoReportPost = {
                content: text,
                ludo_id: ludoId,
                player: whoIsUser,
                video
            };
            axios.post('/apis/report', ludoReportPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.props.handleShouldProfileUpdate(true);
                    this.props.handleShouldReportUpdate(true);
                    this.handleDialogClose();
                } else {
                    if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    console.error('DesktopReportPost handleSubmit response data is not OK. The message from server is: ', response.data.message);
                    if (response.data.err) {
                        console.error('DesktopReportPost handleSubmit response data is not OK. The error from server is: ', response.data.err);
                        throw new Error(response.data.err);
                    }
                }
            })
            .catch(error => {
                console.error('DesktopReportPost handleSubmit catch an error: ', error);
                if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                });
            });
        } else {
            this.setState({
                isSubmitting: false
            });
            window.alert('請選擇回報種類');
        }
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
                images,
                reportType,
                video
            } = this.state;

            if (images && reportType === 'image') {
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
            this.setState({
                isPreviewButtonDisabled: false,
                isReporting: true,
                video
            });
        }
    }

    setImageLocation(imageLocation) {
        this.setState({
            imageLocation,
            isPreviewButtonDisabled: false
        });
    }

    render() {
        const {
            imageLocation,
            images,
            isDiscardAlertOpen,
            isPreviewButtonDisabled,
            isSubmitting,
            open,
            reportType,
            resizedHeight,
            resizedWidth,
            step,
            text,
            video
        } = this.state;
        const {
            ludoId
        } = this.props;
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
                    title={titles[step]}
                    titleStyle={titleStyle}
                >
                    <StepperCloseIcon
                        handleCloseClick={this.handleCloseClick}
                    />
                    <Content
                        handleDialogClose={this.handleDialogClose}
                        handleImageChange={this.handleImageChange}
                        handleImageResize={this.handleImageResize}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleTextChange={this.handleTextChange}
                        handleVideoChange={this.handleVideoChange}
                        imageLocation={imageLocation}
                        images={images}
                        ludoId={ludoId}
                        step={step}
                        text={text}
                        reportType={reportType}
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        setImageLocation={this.setImageLocation}
                        video={video}
                    />
                    <StepButtonList
                        handleDialogClose={this.handleDialogClose}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleSubmit={this.handleSubmit}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        isSubmitting={isSubmitting}
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
