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
    isDiscardAlertOpen: false,
    isEditing: false,
    isNextStepButtonDisabled: true,
    isPreviewButtonDisabled: true,
    isSubmitting: false,
    isTemplateSubmitButtonDisabled: true,
    ludoCreateForm: {
        category_id: 1,
        checkpoint: [3],
        duration: 3,
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
    type: '',
    resizedHeight: 250,
    resizedWidth: 250,
};

const titles = [
    '標題與回報頻率',
    '卡片形式選擇',
    '卡片內容簡介',
    '加分回報時段'
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
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    componentDidMount() {
        if (this.props.ludoId) {
            const { ludoId } = this.props;
            axios.get(`/apis/ludo/${ludoId}`)
            .then((response) => {
                /*
                    response.data.status
                    200: everything's fine;
                    400: user's data issue;
                    401: no login;
                    403: no authority 
                */
                if (response.data.status === '200') {
                    this.setState({
                        isNextStepButtonDisabled: false,
                        ludoCreateForm: response.data.ludo
                    });
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
        if (this.state.type !== 'text') {
            this.setState(
                prevState => ({
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else if (introduction && this.state.type === 'text') {
            this.setState(
                prevState => ({
                    isPreviewButtonDisabled: false,
                    isTemplateSubmitButtonDisabled: false,
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
                    isTemplateSubmitButtonDisabled: true,
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

    handleSubmit() {
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

    handleTypeSelect(event) {
        const type = event.currentTarget.dataset.payload;
        this.setState({
            type,
            step: 2,
        });
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
            isDataFetched,
            isNextStepButtonDisabled,
            isPreviewButtonDisabled,
            isSubmitting,
            ludoCreateForm,
            open,
            step,
            type,
        } = this.state;

        const {
            duration,
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
                        handleCheckPointChange={this.handleCheckPointChange}
                        handleDurationChange={this.handleDurationChange}
                        handleImageChange={this.handleImageChange}
                        handleImageResize={this.handleImageResize}
                        handleIntroductionChange={this.handleIntroductionChange}
                        handlePeriodChange={this.handlePeriodChange}
                        handleStepNext={this.handleStepNext}
                        handleTagAdd={this.handleTagAdd}
                        handleTagDelete={this.handleTagDelete}
                        handleTitleChange={this.handleTitleChange}
                        handleTypeSelect={this.handleTypeSelect}
                        handleVideoChange={this.handleVideoChange}
                        imageLocation={image_location}
                        images={images}
                        interval={interval}
                        introduction={introduction}
                        isDataFetched={isDataFetched}
                        period={period}
                        resizedHeight={resizedHeight}
                        resizedWidth={resizedWidth}
                        setImageLocation={this.setImageLocation}
                        step={step}
                        tags={tags}
                        title={title}
                        type={type}
                        video={video}
                    />
                    <StepButtonList
                        handleDialogClose={this.handleDialogClose}
                        handleStepNext={this.handleStepNext}
                        handleStepPrev={this.handleStepPrev}
                        handleSubmit={this.handleSubmit}
                        handleTypeSelect={this.handleTypeSelect}
                        isNextStepButtonDisabled={isNextStepButtonDisabled}
                        isPreviewButtonDisabled={isPreviewButtonDisabled}
                        isSubmitting={isSubmitting}
                        step={step}
                    />
                </Dialog>
            </Wrapper>
        );
    }
}

export default CreateStepper;
