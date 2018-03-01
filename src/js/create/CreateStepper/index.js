import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import axios from '../../axios-config';
import Content from './Content/index';
import StepButtonList from './StepButtonList';
import StepperCloseIcon from '../../components/StepperCloseIcon';

const initialState = {
    images: [],
    isAtTemplatePage: false,
    isDiscardAlertOpen: false,
    isEditing: false,
    isCardSubmitButtonDisabled: true,
    isNextStepButtonDisabled: true,
    isPreviewButtonDisabled: true,
    isSubmitting: false,
    isTemplateSubmitButtonDisabled: true,
    ludoCreateForm: {
        category_id: 1,
        checkpoint: [3],
        duration: 3,
        form: 'text',
        image_location: '',
        interval: 1,
        introduction: '',
        marbles: 0,
        period: '0-24',
        tags: [],
        title: '',
        video: '',
    },
    open: true,
    step: 0,
    resizedHeight: 250,
    resizedWidth: 250,
};

const titles = [
    '標題與回報間隔',
    '卡片內容簡介',
    '加分回報時段',
    '預覽',
];

// styled components
const Wrapper = styled.div`
    background-color: white;
`;

// override material-ui style
const contentStyle = {
    width: '60%',
    maxWidth: 'none'
};

const dialogStyle = {
    zIndex: '2',
};

const titleStyle = {
    fontFamily: 'Microsoft JhengHei',
    textAlign: 'center'
};

class CreateStepper extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.getTemplateData = this.getTemplateData.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleFormSelect = this.handleFormSelect.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
        this.handleTemplateSubmit = this.handleTemplateSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    componentDidMount() {
        if (!this.state.isAtTemplatePage && this.props.templateId) {
            this.getTemplateData(this.props.templateId);
        }
    }

    getTemplateData(templateId) {
        this.setState({
            isCardSubmitButtonDisabled: true
        });
        axios.get(`/apis/ludo/${templateId}`)
        .then((response) => {
            /*
                response.data.status
                200: everything's fine;
                400: user's data issue;
                401: no login;
                403: no authority 
            */
            if (response.data.status === '200') {
                if (response.data.ludo.form) {
                    this.setState({
                        isAtTemplatePage: true,
                        isCardSubmitButtonDisabled: false,
                        isNextStepButtonDisabled: false,
                        isPreviewButtonDisabled: false,
                        ludoCreateForm: response.data.ludo,
                        step: 3,
                    });
                } else {
                    this.setState({
                        isAtTemplatePage: true,
                        isCardSubmitButtonDisabled: false,
                        isNextStepButtonDisabled: false,
                        isPreviewButtonDisabled: false,
                        ludoCreateForm: {
                            ...response.data.ludo,
                            form: 'text',
                        },
                        step: 3,
                    });
                }
            } else {
                if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                console.log(response.data);
                this.setState({
                    isCardSubmitButtonDisabled: false
                });
            }
        })
        .catch((error) => {
            if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
            this.setState({
                isCardSubmitButtonDisabled: false
            });
        });
    }

    handleCardSubmit(event) {
        event.preventDefault();
        const { ludoCreateForm } = this.state;
        this.setState({
            isCardSubmitButtonDisabled: true
        });
        if (!this.props.currentUserId) {
            if (window.confirm('登入後即可發佈卡片！點選「確定」後進入登入頁面。')) {
                browserHistory.push('/login');
            } else {
                this.setState({
                    isCardSubmitButtonDisabled: false
                });
            }
        } else {
            const cardCreateForm = {
                ...ludoCreateForm,
                template_id: this.props.ludoId,
            };
            axios.post('/apis/ludo', cardCreateForm)
            .then((response) => {
                if (response.data.status === '200') {
                    const { ludo_id } = response.data;
                    /* get ludo information after create ludo post */
                    axios.get(`/apis/ludo/${ludo_id}`)
                    .then((response) => {
                        /*
                            response.data.status
                            200: everything's fine;
                            400: user's data issue;
                            401: no login;
                            403: no authority 
                        */
                        if (response.data.status === '200') {
                            const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                            getUserBasicData();
                            handleShouldProfileUpdate(true);
                            browserHistory.push(`/ludo/${ludo_id}`);
                        } else {
                            if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                                window.open("https://www.facebook.com/messages/t/ludonow");
                            }
                            this.setState({
                                isCardSubmitButtonDisabled: false
                            });
                        }
                    })
                    .catch((error) => {
                        if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isCardSubmitButtonDisabled: false
                        });
                    });
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('燃料或彈珠數不足: ' + response.data.message);
                    this.setState({
                        isCardSubmitButtonDisabled: false
                    });
                } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                    window.alert('有部分欄位為空白');
                    this.setState({
                        isCardSubmitButtonDisabled: false
                    });
                } else {
                    if (window.confirm('建立Ludo卡片時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isCardSubmitButtonDisabled: false
                    });
                }
            })
            .catch((error) => {
                if (window.confirm('建立Ludo卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isCardSubmitButtonDisabled: false
                });
            });
        }
    }

    handleCheckPointChange(event) {
        const interval = Number(event.currentTarget.value);
        const { duration } = this.state.ludoCreateForm;
        const numbersFromZeroToDuration = duration + 1;
        const numberListFromZeroToDuration = [...Array(numbersFromZeroToDuration).keys()];
        const checkpointList = numberListFromZeroToDuration.slice(1);
        const minCheckPoint = duration % interval;
        const newCheckpointList = checkpointList.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState(
            prevState => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    checkpoint: newCheckpointList,
                    interval
                },
            })
        );
    }

    handleCloseClick() {
        const { isEditing } = this.state;
        if (isEditing) {
            this.setState({ isDiscardAlertOpen: true });
        } else {
            // this.handleDialogClose();
        }
    }

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
    }

    handleDurationChange(currentSliderValue) {
        const { interval } = this.state.ludoCreateForm;
        const checkpoint = Array.from(Array(currentSliderValue+1).keys()).slice(1);
        const minCheckPoint = currentSliderValue % interval;
        const newCheckpoint = checkpoint.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState(
            prevState => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    checkpoint: newCheckpoint,
                    duration: currentSliderValue
                }
            })
        );
    }

    handleFormSelect(event) {
        const form = event.currentTarget.dataset.payload;
        this.setState(
            prevState => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    form,
                },
                step: 2,
            })
        );
    }

    handleImageChange(image) {
        this.setState({
            images: [image],
            isEditing: true,
            isPreviewButtonDisabled: false,
        });
    }

    handleImageResize(resizedWidth, resizedHeight) {
        this.setState({
            resizedHeight,
            resizedWidth
        });
    }

    handleIntroductionChange(event) {
        const introduction = event.currentTarget.value;
        if (!introduction && this.state.ludoCreateForm.form !== 'text') {
            this.setState(
                prevState => ({
                    isEditing: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else if (introduction && this.state.ludoCreateForm.form !== 'text') {
            this.setState(
                prevState => ({
                    isEditing: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else if (introduction && this.state.ludoCreateForm.form === 'text') {
            this.setState(
                prevState => ({
                    isEditing: true,
                    isPreviewButtonDisabled: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else {
            this.setState(
                prevState => ({
                    isPreviewButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        }
    }

    handlePeriodChange(event, index, value) {
        this.setState(
            prevState => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    period: value
                }
            })
        );
    }

    handleStepChange(variation) {
        this.setState(
            prevState => ({
                step: prevState.step + variation
            })
        );
    }

    handleStepNext() {
        this.handleStepChange(1);
    }

    handleStepPrev() {
        this.handleStepChange(-1);
    }

    handleTagAdd(tag) {
        const { tags } = this.state.ludoCreateForm;
        const tagWithoutHash = tag.replace(/^#/g, '');
        const newTags = [
            ...tags,
            tagWithoutHash
        ];
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    tags: newTags
                }
            })
        );
    }

    handleTagDelete(event) {
        const deletedIndex = Number(event.currentTarget.dataset.id);
        this.setState(
            prevState => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    tags: [
                        ...prevState.ludoCreateForm.tags.slice(0, deletedIndex),
                        ...prevState.ludoCreateForm.tags.slice(deletedIndex + 1),
                    ],
                }
            })
        );
    }

    handleTemplateDelete(event) {
        event.preventDefault();
        /* TODO: Use notification confirming delete ludo */
        this.setState({
            isTemplateDeleteButtonDisabled: true
        });
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo模板嗎？');
        // const isSureToDelete = window.confirm('Are you sure to delete this template ludo?');
        if (isSureToDelete) {
            axios.delete(`/apis/ludo/${this.props.ludoId}`)
            .then(response => {
                if (response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    window.alert('成功刪除模板');
                    browserHistory.push('/cardList');
                } else {
                    if (window.confirm('刪除Ludo模板時伺服器回傳資料不正確，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isTemplateDeleteButtonDisabled: false
                    });
                }
            })
            .catch(error => {
                if (window.confirm('刪除Ludo模板時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isTemplateDeleteButtonDisabled: false
                });
            });
        } else {
            this.setState({
                isTemplateDeleteButtonDisabled: false
            });
        }
    }

    handleTemplateSubmit(event) {
        event.preventDefault();
        const { ludoCreateForm } = this.state;
        const ludoTemplateForm = {
            ...ludoCreateForm,
            type: 'blank',
        };
        this.setState({
            isTemplateSubmitButtonDisabled: true
        });
        axios.post('/apis/ludo', ludoTemplateForm)
        .then((response) => {
            if (response.data.status === '200') {
                const { ludo_id } = response.data;
                /* get ludo information after create ludo post */
                axios.get(`/apis/ludo/${ludo_id}`)
                .then((response) => {
                    /*
                        response.data.status
                        200: everything's fine;
                        400: user's data issue;
                        401: no login;
                        403: no authority 
                    */
                    if (response.data.status === '200') {
                        const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                        getUserBasicData();
                        handleShouldProfileUpdate(true);
                        browserHistory.push(`/ludo/${ludo_id}`);
                    } else {
                        if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isTemplateSubmitButtonDisabled: false
                        });
                    }
                })
                .catch((error) => {
                    if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isTemplateSubmitButtonDisabled: false
                    });
                });
            } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                window.alert('燃料或彈珠數不足: ' + response.data.message);
                this.setState({
                    isTemplateSubmitButtonDisabled: false
                });
            } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                window.alert('有部分欄位為空白');
                this.setState({
                    isTemplateSubmitButtonDisabled: false
                });
            } else {
                if (window.confirm('發送Ludo模板資料時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isTemplateSubmitButtonDisabled: false
                });
            }
        })
        .catch((error) => {
            if (window.confirm('發送Ludo模板資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
            this.setState({
                isTemplateSubmitButtonDisabled: false
            });
        });
    }

    handleTitleChange(title) {
        if (!title) {
            this.setState(
                prevState => ({
                    isNextStepButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        title
                    },
                })
            );
        } else {
            this.setState(
                prevState => ({
                    isNextStepButtonDisabled: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        title
                    },
                })
            );
        }
    }

    handleVideoChange(event) {
        const video = event.currentTarget.value;
        if (!video) {
            this.setState(
                prevState => ({
                    isPreviewButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        video
                    },
                })
            );
        } else {
            this.setState(
                prevState => ({
                    isEditing: true,
                    isPreviewButtonDisabled: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        video
                    },
                })
            );
        }
    }

    setImageLocation(image_location) {
        this.setState(
            prevState => ({
                isPreviewButtonDisabled: false,
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    image_location,
                },
            })
        );
    }

    render() {
        const {
            images,
            isAtTemplatePage,
            isCardSubmitButtonDisabled,
            isNextStepButtonDisabled,
            isPreviewButtonDisabled,
            isSubmitting,
            isTemplateSubmitButtonDisabled,
            ludoCreateForm,
            open,
            step,
        } = this.state;

        const {
            duration,
            form,
            image_location,
            interval,
            introduction,
            period,
            resizedHeight,
            resizedWidth,
            tags,
            title,
            video,
        } = ludoCreateForm;

        return (
            <Wrapper>
                <Dialog
                    contentStyle={contentStyle}
                    onRequestClose={this.handleCloseClick}
                    open={open}
                    style={dialogStyle}
                    title={titles[step]}
                    titleStyle={titleStyle}
                >
                    {/* <StepperCloseIcon handleCloseClick={this.handleCloseClick} /> */}
                    <Content
                        duration={duration}
                        form={form}
                        handleCheckPointChange={this.handleCheckPointChange}
                        handleDurationChange={this.handleDurationChange}
                        handleFormSelect={this.handleFormSelect}
                        handleImageChange={this.handleImageChange}
                        handleImageResize={this.handleImageResize}
                        handleIntroductionChange={this.handleIntroductionChange}
                        handlePeriodChange={this.handlePeriodChange}
                        handleStepNext={this.handleStepNext}
                        handleTagAdd={this.handleTagAdd}
                        handleTagDelete={this.handleTagDelete}
                        handleTitleChange={this.handleTitleChange}
                        handleVideoChange={this.handleVideoChange}
                        imageLocation={image_location}
                        images={images}
                        interval={interval}
                        introduction={introduction}
                        isAtTemplatePage={isAtTemplatePage}
                        period={period}
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        setImageLocation={this.setImageLocation}
                        step={step}
                        tags={tags}
                        title={title}
                        video={video}
                    />
                    <StepButtonList
                        handleCardSubmit={this.handleCardSubmit}
                        handleDialogClose={this.handleDialogClose}
                        handleFormSelect={this.handleFormSelect}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleTemplateDelete={this.handleTemplateDelete}
                        handleTemplateSubmit={this.handleTemplateSubmit}
                        isAtTemplatePage={isAtTemplatePage}
                        isCardSubmitButtonDisabled={isCardSubmitButtonDisabled}
                        isNextStepButtonDisabled={isNextStepButtonDisabled}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        isSubmitting={isSubmitting}
                        isTemplateSubmitButtonDisabled={isTemplateSubmitButtonDisabled}
                        step={step}
                    />
                </Dialog>
            </Wrapper>
        );
    }
}

export default CreateStepper;
