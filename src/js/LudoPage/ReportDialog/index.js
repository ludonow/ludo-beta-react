import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import axios from '../../axios-config';
import { StyledDialog } from '../../baseStyle';
import DiscardAlert from '../../components/DiscardAlert';
import StepperCloseIcon from '../../components/StepperCloseIcon';
import Content from './Content';
import StepButtonList from './StepButtonList';


const initialState = {
    imageLocation: '',
    images: [],
    isDiscardAlertOpen: false,
    isImageLightBoxOpen: false,
    isPreviewButtonDisabled: true,
    isReporting: false,
    isSubmitting: false,
    step: 0,
    submitType: 'post',
    text: '',
    reportId: '',
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
const ReportDialogWrapper = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    position: fixed;
`;

// override material-ui style
const deskTopContentStyle = {
    maxWidth: 'none',
    width: '60%',
};
const mobileContentStyle = {
    maxWidth: 'none',
    width: '95%',
};

const dialogStyle = {
    overflowY: 'auto',
};

const titleStyle = {
    fontFamily: 'Microsoft JhengHei',
    textAlign: 'center'
};

class ReportDialog extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDiscardAlertClose = this.handleDiscardAlertClose.bind(this);
        this.handleDiscardConfirm = this.handleDiscardConfirm.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handlePutSubmit = this.handlePutSubmit.bind(this);
        this.handleReportTypeClick = this.handleReportTypeClick.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.isUpdatingImage = this.isUpdatingImage.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editingForm && nextProps.editingForm.report_id !== this.state.reportId) {
            const { editingForm } = nextProps;
            const reportId = editingForm.report_id;
            if (editingForm.image_location) {
                const reportType = 'image';
                this.setState({
                    imageLocation: editingForm.image_location,
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    reportId,
                    reportType,
                    step: 1,
                    submitType: 'put',
                    text: editingForm.content,
                });
            } else if (editingForm.video) {
                const reportType = 'video';
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    reportId,
                    reportType,
                    step: 1,
                    submitType: 'put',
                    text: editingForm.content,
                    video: editingForm.video,
                });
            } else {
                const reportType = 'text';
                this.setState({
                    isPreviewButtonDisabled: false,
                    isReporting: true,
                    reportId,
                    reportType,
                    step: 1,
                    submitType: 'put',
                    text: editingForm.content,
                });
            }
        }
    }

    handleCloseClick() {
        const { isReporting } = this.state;
        if (isReporting) {
            this.setState({ isDiscardAlertOpen: true });
        } else {
            this.setState({
                ...initialState
            });
            this.props.handleReportDialogClose();
        }
    }

    handleDiscardAlertClose() {
        this.setState({ isDiscardAlertOpen: false });
    }

    handleDiscardConfirm() {
        this.handleDiscardAlertClose();
        this.setState({
            ...initialState
        });
        this.props.handleReportDialogClose();
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

    handlePutSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitting: true });

        const {
            currentUserId,
            handleReportDialogClose,
            handleShouldReportUpdate,
            ludoId,
        } = this.props;

        const {
            imageLocation,
            images,
            reportId,
            reportType,
            text,
            video,
        } = this.state;

        let reportPutBody = {};

        const isUpdatingImage = this.isUpdatingImage(reportType, images);
        if (isUpdatingImage) {
            const imagePost = new FormData();
            imagePost.append('file', images[0]);
            axios.post('/apis/report-image', imagePost)
            .then(response => {
                if (response.data.status === '200') {
                    return response.data.location;
                } else {
                    console.error('ReportDialog handlePutSubmit response status from server is not OK, which is: ', response);
                    const errorMessage = 'ReportDialog handlePutSubmit response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .then(imageLocation => {
                reportPutBody = {
                    content: text,
                    image_location: imageLocation,
                };
                return axios.put(`/apis/report/${reportId}`, reportPutBody)
            })
            .then((response) => {
                if (response.data.status === '200') {
                    handleReportDialogClose();
                    handleShouldReportUpdate(true);
                    browserHistory.push(`/ludo/${ludoId}/report-list/${currentUserId}`);
                } else {
                    if (window.confirm('送出回報編輯資料時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({ isSubmitting: false });
                }
            })
            .catch((error) => {
                if (window.confirm('送出回報編輯資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({ isSubmitting: false });
            });
        } else {
            if (reportType === 'video') {
                reportPutBody = {
                    content: text,
                    video,
                };
            } else {
                reportPutBody = { content: text };
            }

            axios.put(`/apis/report/${reportId}`, reportPutBody)
            .then((response) => {
                if (response.data.status === '200') {
                    handleReportDialogClose();
                    handleShouldReportUpdate(true);
                    browserHistory.push(`/ludo/${ludoId}/report-list/${currentUserId}`);
                } else {
                    if (window.confirm('送出回報編輯資料時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({ isSubmitting: false });
                }
            })
            .catch((error) => {
                if (window.confirm('送出回報編輯資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({ isSubmitting: false });
            });
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitting: true,
        });
        const {
            currentUserId,
            handleReportDialogClose,
            handleShouldReportUpdate,
            ludoId,
            router_currentFormValue,
        } = this.props;
        const {
            reportType,
            text,
            video,
        } = this.state;
        if (reportType === 'image') {
            const imagePost = new FormData();
            imagePost.append('file', this.state.images[0]);
            //
            axios.post('/apis/report-image', imagePost)
            .then(response => {
                if (response.data.status === '200') {
                    return response.data.location;
                } else {
                    console.error('ReportDialog handleSubmit response status from server is not OK, which is: ', response);
                    const errorMessage = 'ReportDialog handleSubmit response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .then(imageLocation => {
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
                    handleReportDialogClose();
                    handleShouldReportUpdate(true);
                    browserHistory.push(`/ludo/${ludoId}/report-list/${currentUserId}`);
                } else {
                    if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    console.error('ReportDialog handleSubmit response data is not OK. The message from server is: ', response.data.message);
                    if (response.data.err) {
                        console.error('ReportDialog handleSubmit response data is not OK. The error from server is: ', response.data.err);
                        throw new Error(response.data.err);
                    }
                }
                this.setState({
                    isSubmitting: false
                });
            })
            .catch(error => {
                console.error('ReportDialog handleSubmit catch an error: ', error);
                this.setState({
                    isSubmitting: false
                });
                if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
        } else if (reportType === 'text' || reportType === 'video') {
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
                    handleReportDialogClose();
                    handleShouldReportUpdate(true);
                    browserHistory.push(`/ludo/${ludoId}/report-list/${currentUserId}`);
                } else {
                    if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    console.error('ReportDialog handleSubmit response data is not OK. The message from server is: ', response.data.message);
                    if (response.data.err) {
                        console.error('ReportDialog handleSubmit response data is not OK. The error from server is: ', response.data.err);
                        throw new Error(response.data.err);
                    }
                }
                this.setState({
                    isSubmitting: false
                });
            })
            .catch(error => {
                console.error('ReportDialog handleSubmit catch an error: ', error);
                this.setState({
                    isSubmitting: false
                });
                if (window.confirm('回報時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
        } else {
            this.setState({
                isSubmitting: false
            });
            window.alert('請選擇回報種類');
        }
    }

    handleTextChange(event) {
        const text = event.currentTarget.value;
        const {
            images,
            reportType,
            video,
        } = this.state;
        if ((images.length === 1 && reportType === 'image') || (video && reportType === 'video')) {
            this.setState({ isPreviewButtonDisabled: false });
        }
        if (!text && reportType === 'text') {
            this.setState({
                isPreviewButtonDisabled: true,
                isReporting: false,
                text,
            });
        } else if (!text) {
            this.setState({
                isReporting: false,
                text,
            });
        } else {
            this.setState({
                isPreviewButtonDisabled: false,
                isReporting: true,
                text,
            });
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

    isUpdatingImage(contentType, images) {
        if (contentType === 'image' && images.length === 1) {
            return true;
        } else {
            return false;
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
            handleReportDialogClose,
            isReportDialogOpen,
        } = this.props;

        const {
            imageLocation,
            images,
            isDiscardAlertOpen,
            isPreviewButtonDisabled,
            isSubmitting,
            reportType,
            resizedHeight,
            resizedWidth,
            step,
            submitType,
            text,
            video,
        } = this.state;

        const width = window.innerWidth || document.body.clientWidth;
        const contentStyle = (width <= 768) ? mobileContentStyle : deskTopContentStyle;

        return (
            <ReportDialogWrapper>
                <StyledDialog
                    contentStyle={contentStyle}
                    onRequestClose={this.handleCloseClick}
                    open={isReportDialogOpen}
                    style={dialogStyle}
                    title={titles[step]}
                    titleStyle={titleStyle}
                >
                    <StepperCloseIcon handleCloseClick={this.handleCloseClick} />
                    <Content
                        handleImageChange={this.handleImageChange}
                        handleImageResize={this.handleImageResize}
                        handleReportDialogClose={handleReportDialogClose}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleTextChange={this.handleTextChange}
                        handleVideoChange={this.handleVideoChange}
                        imageLocation={imageLocation}
                        images={images}
                        step={step}
                        text={text}
                        reportType={reportType}
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        setImageLocation={this.setImageLocation}
                        video={video}
                    />
                    <StepButtonList
                        handleReportDialogClose={handleReportDialogClose}
                        handleReportTypeClick={this.handleReportTypeClick}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleSubmit={submitType === 'put' ? this.handlePutSubmit : this.handleSubmit}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        isSubmitting={isSubmitting}
                        step={step}
                    />
                </StyledDialog>
                <DiscardAlert
                    handleDiscardAlertClose={this.handleDiscardAlertClose}
                    handleDiscardConfirm={this.handleDiscardConfirm}
                    handleReportDialogClose={handleReportDialogClose}
                    isDiscardAlertOpen={isDiscardAlertOpen}
                />
            </ReportDialogWrapper>
        );
    }
}

ReportDialog.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    editForm: PropTypes.object,
    ludoId: PropTypes.string.isRequired,
    handleReportDialogClose: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isReportDialogOpen: PropTypes.bool.isRequired,
    router_currentFormValue: PropTypes.object.isRequired,
};

export default ReportDialog;
