import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

import axios from '../axios-config';
import { StyledDialog } from '../baseStyle';
import AutoMatchDialog from './AutoMatchDialog';
import Content from './Content';
import DiscardAlert from '../components/DiscardAlert';
import StepButtonList from './StepButtonList';
import StepperCloseIcon from '../components/StepperCloseIcon';
import {
    getCorrectFormatOfRequestLudoInfo,
    getCorrectFormatOfResponseLudoInfo,
} from '../utils/format';

const initialState = {
    contentType: '',
    images: [],
    isAtTemplatePage: false,
    isAutoMatchDialogOpen: false,
    isMyCard:false,
    isDiscardAlertOpen: false,
    isEditing: false,
    isCardSubmitButtonDisabled: true,
    isMyTemplate: false,
    isNextStepButtonDisabled: true,
    isPreviewButtonDisabled: true,
    isSubmitting: false,
    isTemplateDeleteButtonDisabled: false,
    isTemplateSaveButtonDisabled: true,
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
    resizedHeight: 250,
    resizedWidth: 250,
};

const stepOfPreview = 4;

const titles = [
    '標題與回報間隔',
    '卡片形式選擇',
    '卡片內容簡介',
    '加分回報時段',
    '預覽',
];

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
    zIndex: '3',
};

const titleStyle = {
    fontFamily: 'Microsoft JhengHei',
    textAlign: 'center',
};

class CreateStepper extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.getContentTypeByFormData = this.getContentTypeByFormData.bind(this);
        this.getTemplateData = this.getTemplateData.bind(this);
        this.handleAutoMatchDialogClose = this.handleAutoMatchDialogClose.bind(this);
        this.handleAutoMatchDialogOpen = this.handleAutoMatchDialogOpen.bind(this);
        this.handleAutoMatchConfirm = this.handleAutoMatchConfirm.bind(this);
        this.handleAutoMatchSearch = this.handleAutoMatchSearch.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDiscardAlertClose = this.handleDiscardAlertClose.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleContentTypeSelect = this.handleContentTypeSelect.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
        this.handleTemplateModify = this.handleTemplateModify.bind(this);
        this.handleTemplateSave = this.handleTemplateSave.bind(this);
        this.handleTemplateSubmit = this.handleTemplateSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.isUpdatingImage = this.isUpdatingImage.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    componentDidMount() {
        const { templateId } = this.props.params;
        if (templateId) {
            this.getTemplateData(templateId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { templateId } = nextProps.params;
        if (!this.state.isAtTemplatePage && templateId) {
            this.getTemplateData(templateId);
        }
    }

    getContentTypeByFormData(ludoCreateForm) {
        if (ludoCreateForm.video) {
            return 'video';
        } else if (ludoCreateForm.image_location) {
            return 'image';
        } else {
            return 'text';
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
                const isMyTemplate = response.data.ludo.starter_id === this.props.currentUserId;
                const ludoCreateForm = getCorrectFormatOfResponseLudoInfo(response.data.ludo);
                this.setState({
                    contentType: this.getContentTypeByFormData(response.data.ludo),
                    isAtTemplatePage: true,
                    isCardSubmitButtonDisabled: false,
                    isMyTemplate,
                    isNextStepButtonDisabled: false,
                    isPreviewButtonDisabled: false,
                    isTemplateSaveButtonDisabled: false,
                    isTemplateSubmitButtonDisabled: false,
                    ludoCreateForm,
                    step: stepOfPreview,
                });
            } else {
                this.setState({
                    isCardSubmitButtonDisabled: false
                });
                if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            this.setState({
                isCardSubmitButtonDisabled: false
            });
            if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    handleAutoMatchDialogClose() {
        this.setState({
            isAutoMatchDialogOpen: false,
        });
    }

    handleAutoMatchDialogOpen() {
        this.setState({
            isAutoMatchDialogOpen: true,
        });
    }

    handleIsMyCard() {
        this.setState({
            isMyCard: true,
        });
    }

    handleAutoMatchConfirm(event) {
        event.preventDefault();
        const { templateId } = this.props.params;
        const requestBody = { type: 'autoMatch' };
        axios.put(`/apis/ludo/${templateId}`, requestBody)
            .then(response => {
                if (response.data.status == '200') {
                    this.handleAutoMatchDialogClose();
                    browserHistory.push(`/ludo/${response.data.ludo_id}`);
                } else {
                    console.error('CreateStepper handleAutoMatchConfirm response status from server is not OK, which is: ', response);
                    const errorMessage = 'CreateStepper handleAutoMatchConfirm response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .catch((error) => {
                console.error(error);
                if (window.confirm('自動配對Ludo卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
    }

    handleAutoMatchSearch(event) {
        event.preventDefault();
        const { templateId } = this.props.params;
        if (!this.props.currentUserId) {
            if (window.confirm('登入後即可發佈卡片！點選「確定」後進入登入頁面。')) {
                browserHistory.push(`/login?redirect=${this.props.location.pathname}`);
            } else {
            }
        } else {    
            axios.get(`/apis/ludo?stage=1&template_id=${templateId}`)
                .then(response => {
                    if (response.data.status === '200') {
                        const matchedCardList = response.data.ludoList.Items;
                        const matchedCardListStarterId = response.data.ludoList.Items[0] ? response.data.ludoList.Items[0].starter_id: null;
                        
                        if (matchedCardList.length >= 1 && this.props.currentUserId != matchedCardListStarterId) {
                            this.handleAutoMatchDialogOpen();
                        } else if ( this.props.currentUserId === matchedCardListStarterId){
                            this.handleIsMyCard();
                            this.handleAutoMatchDialogOpen();
                        } else {
                            this.handleCardSubmit(event);
                        }
                    } else {
                        console.error('CreateStepper handleAutoMatchSearch response status from server is not OK, which is: ', response);
                        const errorMessage = 'CreateStepper handleAutoMatchSearch response message from server: ' + response.data.message;
                        throw new Error(errorMessage);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (window.confirm('搜尋是否有可以自動配對的卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                })
        }
    }

    handleCardSubmit(event) {
        event.preventDefault();
        this.setState({
            isCardSubmitButtonDisabled: true,
            isEditing: false,
            isSubmitting: true,
        });
        if (!this.props.currentUserId) {
            if (window.confirm('登入後即可發佈卡片！點選「確定」後進入登入頁面。')) {
                browserHistory.push(`/login?redirect=${this.props.location.pathname}`);
            } else {
                this.setState({
                    isCardSubmitButtonDisabled: false,
                    isSubmitting: false,
                });
            }
        } else {
            const {
                contentType,
                images,
                ludoCreateForm,
            } = this.state;
            const requestLudoInfo = getCorrectFormatOfRequestLudoInfo(ludoCreateForm);
            let defaultCardCreateForm = {
                ...requestLudoInfo,
                template_id: this.props.params.templateId,
            };
            const isUpdatingImage = this.isUpdatingImage(contentType, images);
            if (isUpdatingImage) {
                const imagePost = new FormData();
                imagePost.append('file', images[0]);
                axios.post('/apis/report-image', imagePost)
                .then(response => {
                    if (response.data.status === '200') {
                        return response.data.location;
                    } else {
                        console.error('CreateStepper handleCardSubmit response status from server is not OK, which is: ', response);
                        const errorMessage = 'CreateStepper handleCardSubmit response message from server: ' + response.data.message;
                        throw new Error(errorMessage);
                    }
                })
                .then(imageLocation => {
                    const cardCreateFormWithUpdatedImage = {
                        ...defaultCardCreateForm,
                        image_location: imageLocation,
                    };
                    return axios.post('/apis/ludo', cardCreateFormWithUpdatedImage)
                })
                .then((response) => {
                    this.setState({
                        isCardSubmitButtonDisabled: false,
                        isSubmitting: false,
                    });
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
                                const { getUserBasicData } = this.props;
                                getUserBasicData();
                                browserHistory.push(`/ludo/${ludo_id}`);
                            } else {
                                if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                                    window.open("https://www.facebook.com/messages/t/ludonow");
                                }
                            }
                        })
                        .catch((error) => {
                            if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                                window.open("https://www.facebook.com/messages/t/ludonow");
                            }
                        });
                    } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        window.alert('燃料或彈珠數不足: ' + response.data.message);
                    } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        window.alert('有部分欄位為空白');
                    } else {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        if (window.confirm('發送Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                    }
                })
                .catch((error) => {
                    this.setState({
                        isCardSubmitButtonDisabled: false,
                        isSubmitting: false,
                    });
                    if (window.confirm('發送Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                })
            } else { // not isUpdatingImage
                axios.post('/apis/ludo', defaultCardCreateForm)
                .then((response) => {
                    if (response.data.status === '200') {
                        const { ludo_id } = response.data;
                        /* get ludo information after create ludo post */
                        axios.get(`/apis/ludo/${ludo_id}`)
                        .then((response) => {
                            this.setState({
                                isCardSubmitButtonDisabled: false,
                                isSubmitting: false,
                            });
                            /*
                                response.data.status
                                200: everything's fine;
                                400: user's data issue;
                                401: no login;
                                403: no authority 
                            */
                            if (response.data.status === '200') {
                                const { getUserBasicData } = this.props;
                                getUserBasicData();
                                browserHistory.push(`/ludo/${ludo_id}`);
                            } else {
                                if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                                    window.open("https://www.facebook.com/messages/t/ludonow");
                                }
                            }
                        })
                        .catch((error) => {
                            this.setState({
                                isCardSubmitButtonDisabled: false,
                                isSubmitting: false,
                            });
                            if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                                window.open("https://www.facebook.com/messages/t/ludonow");
                            }
                        });
                    } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        window.alert('燃料或彈珠數不足: ' + response.data.message);
                    } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        window.alert('有部分欄位為空白');
                    } else {
                        this.setState({
                            isCardSubmitButtonDisabled: false,
                            isSubmitting: false,
                        });
                        if (window.confirm('發送Ludo卡片資料時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                    }
                })
                .catch((error) => {
                    this.setState({
                        isCardSubmitButtonDisabled: false,
                        isSubmitting: false,
                    });
                    if (window.confirm('發送Ludo卡片資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                });
            }
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
            this.handleDialogClose();
        }
    }

    handleContentTypeSelect(event) {
        const contentType = event.currentTarget.dataset.payload;
        const {
            images,
            isAtTemplatePage,
            ludoCreateForm,
        } = this.state;

        const {
            image_location,
            introduction,
            video,
        } = ludoCreateForm;
        if (
            (contentType === 'image' && images.length === 1) ||
            (contentType === 'text' && introduction) ||
            (contentType === 'video' && video)
        ) {
            this.setState({
                contentType,
                isCardSubmitButtonDisabled: false,
                isEditing: true,
                isPreviewButtonDisabled: false,
                isTemplateSaveButtonDisabled: false,
                isTemplateSubmitButtonDisabled: false,
                step: 2,
            });
        } else if (
            (!isAtTemplatePage && contentType === 'image' && images.length === 0) ||
            (isAtTemplatePage && contentType === 'image' && images.length === 0 && !image_location) ||
            (contentType === 'text' && !introduction) ||
            (contentType === 'video' && !video)
        ) {
            this.setState({
                contentType,
                isCardSubmitButtonDisabled: true,
                isPreviewButtonDisabled: true,
                isTemplateSaveButtonDisabled: true,
                isTemplateSubmitButtonDisabled: true,
                step: 2,
            });
        } else {
            this.setState({
                contentType,
                step: 2,
            });
        }
    }

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
        browserHistory.goBack();
    }

    handleDiscardAlertClose() {
        this.setState({ isDiscardAlertOpen: false });
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
            isCardSubmitButtonDisabled: false,
            isEditing: true,
            isPreviewButtonDisabled: false,
            isTemplateSaveButtonDisabled: false,
            isTemplateSubmitButtonDisabled: false,
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
        if (!introduction && this.state.contentType !== 'text') {
            this.setState(
                prevState => ({
                    isEditing: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else if (introduction && this.state.contentType !== 'text') {
            this.setState(
                prevState => ({
                    isEditing: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else if (introduction && this.state.contentType === 'text') {
            this.setState(
                prevState => ({
                    isCardSubmitButtonDisabled: false,
                    isEditing: true,
                    isPreviewButtonDisabled: false,
                    isTemplateSaveButtonDisabled: false,
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
                    isCardSubmitButtonDisabled: true,
                    isPreviewButtonDisabled: true,
                    isTemplateSaveButtonDisabled: true,
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
        const {
            contentType,
            images,
            isAtTemplatePage,
            isMyTemplate,
            step,
        } = this.state;

        if (isAtTemplatePage && contentType && step === 0 && !isMyTemplate) {
            this.handleStepChange(2);
        } else {
            this.handleStepChange(1);
        }

    }

    handleStepPrev() {
        const {
            contentType,
            isAtTemplatePage,
            isMyTemplate,
            step,
        } = this.state;

        if (isAtTemplatePage && contentType && step === 2 && !isMyTemplate) {
            this.handleStepChange(-2);
        } else {
            this.handleStepChange(-1);
        }
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
                isEditing: true,
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
            this.setState({ isSubmitting: true });
            axios.delete(`/apis/ludo/${this.props.params.templateId}`)
            .then(response => {
                this.setState({
                    isSubmitting: false,
                    isTemplateDeleteButtonDisabled: false,
                });
                if (response.data.status == '200') {
                    const { getUserBasicData } = this.props;
                    getUserBasicData();
                    window.alert('成功刪除模板');
                    browserHistory.push('/cardList');
                } else {
                    if (window.confirm('刪除Ludo模板時伺服器回傳資料不正確，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    isTemplateDeleteButtonDisabled: false,
                });
                if (window.confirm('刪除Ludo模板時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        } else {
            this.setState({
                isSubmitting: false,
                isTemplateDeleteButtonDisabled: false,
            });
        }
    }

    handleTemplateSave(event) {
        event.preventDefault();
        const {
            getUserBasicData,
            params,
        } = this.props;
        const { templateId } = params;
        const {
            contentType,
            images,
            ludoCreateForm,
        } = this.state;
        const ludoTemplateForm = {
            ...ludoCreateForm,
            type: 'modify',
        };
        this.setState({
            isEditing: false,
            isTemplateSaveButtonDisabled: true
        });
        const isUpdatingImage = this.isUpdatingImage(contentType, images);
        if (isUpdatingImage) {
            const imagePost = new FormData();
            imagePost.append('file', images[0]);
            axios.post('/apis/report-image', imagePost)
            .then(response => {
                if (response.data.status === '200') {
                    return response.data.location;
                } else {
                    console.error('CreateStepper handleTemplateSave response status from server is not OK, which is: ', response);
                    const errorMessage = 'CreateStepper handleTemplateSave response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .then(imageLocation => {
                const ludoTemplateFormWithUpdatedImage = {
                    ...ludoTemplateForm,
                    image_location: imageLocation,
                };
                return axios.put(`/apis/ludo/${templateId}`, ludoTemplateFormWithUpdatedImage)
            })
            .then((response) => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSaveButtonDisabled: false,
                });
                if (response.data.status == '200') {
                    getUserBasicData();
                    window.alert('已變更儲存');
                } else {
                    if (window.confirm('修改Ludo模板資訊時伺服器回傳資料不正確，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSaveButtonDisabled: false,
                });
                if (window.confirm('修改Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            })
        } else {
            axios.put(`/apis/ludo/${templateId}`, ludoTemplateForm)
            .then(response => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSaveButtonDisabled: false,
                });
                if (response.data.status == '200') {
                    getUserBasicData();
                    window.alert('已變更儲存');
                } else {
                    if (window.confirm('修改Ludo模板資訊時伺服器回傳資料不正確，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSaveButtonDisabled: false,
                });
                if (window.confirm('修改Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        }
    }

    handleTemplateModify() {
        this.setState(
            prevState => ({
                step: 0
            })
        );
    }

    handleTemplateSubmit(event) {
        event.preventDefault();
        this.setState({
            isEditing: false,
            isSubmitting: true,
            isTemplateSubmitButtonDisabled: true
        });
        const {
            contentType,
            ludoCreateForm,
        } = this.state;

        const requestLudoInfo = getCorrectFormatOfRequestLudoInfo(ludoCreateForm);

        if (contentType === 'image') {
            const imagePost = new FormData();
            imagePost.append('file', this.state.images[0]);
            axios.post('/apis/report-image', imagePost)
            .then(response => {
                if (response.data.status === '200') {
                    return response.data.location;
                } else {
                    console.error('CreateStepper handleTemplateSubmit response status from server is not OK, which is: ', response);
                    const errorMessage = 'CreateStepper handleTemplateSubmit response message from server: ' + response.data.message;
                    throw new Error(errorMessage);
                }
            })
            .then(imageLocation => {
                const ludoTemplateForm = {
                    ...requestLudoInfo,
                    image_location: imageLocation,
                    type: 'blank',
                    video: '',
                };
                return axios.post('/apis/ludo', ludoTemplateForm)
            })
            .then((response) => {
                if (response.data.status === '200') {
                    const { ludo_id } = response.data;
                    /* get ludo information after create ludo post */
                    axios.get(`/apis/ludo/${ludo_id}`)
                    .then((response) => {
                        this.setState({
                            isSubmitting: false,
                            isTemplateSubmitButtonDisabled: false,
                        });
                        /*
                            response.data.status
                            200: everything's fine;
                            400: user's data issue;
                            401: no login;
                            403: no authority 
                        */
                        if (response.data.status === '200') {
                            const { getUserBasicData } = this.props;
                            getUserBasicData();
                            browserHistory.push(`/template/${ludo_id}`);
                        } else {
                            if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                                window.open("https://www.facebook.com/messages/t/ludonow");
                            }
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            isSubmitting: false,
                            isTemplateSubmitButtonDisabled: false,
                        });
                        if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                    });
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    window.alert('燃料或彈珠數不足: ' + response.data.message);
                } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    window.alert('有部分欄位為空白');
                } else {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    if (window.confirm('發送Ludo模板資料時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSubmitButtonDisabled: false,
                });
                if (window.confirm('發送Ludo模板資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        } else if (contentType === 'text' || contentType === 'video') {
            const ludoTemplateForm = {
                ...requestLudoInfo,
                type: 'blank',
            };
            axios.post('/apis/ludo', ludoTemplateForm)
            .then((response) => {
                if (response.data.status === '200') {
                    const { ludo_id } = response.data;
                    /* get ludo information after create ludo post */
                    axios.get(`/apis/ludo/${ludo_id}`)
                    .then((response) => {
                        this.setState({
                            isSubmitting: false,
                            isTemplateSubmitButtonDisabled: false,
                        });
                        /*
                            response.data.status
                            200: everything's fine;
                            400: user's data issue;
                            401: no login;
                            403: no authority 
                        */
                        if (response.data.status === '200') {
                            const { getUserBasicData } = this.props;
                            getUserBasicData();
                            browserHistory.push(`/template/${ludo_id}`);
                        } else {
                            if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                                window.open("https://www.facebook.com/messages/t/ludonow");
                            }
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            isSubmitting: false,
                            isTemplateSubmitButtonDisabled: false,
                        });
                        if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                    });
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    window.alert('燃料或彈珠數不足: ' + response.data.message);
                } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    window.alert('有部分欄位為空白');
                } else {
                    this.setState({
                        isSubmitting: false,
                        isTemplateSubmitButtonDisabled: false,
                    });
                    if (window.confirm('發送Ludo模板資料時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    isSubmitting: false,
                    isTemplateSubmitButtonDisabled: false,
                });
                if (window.confirm('發送Ludo模板資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        } else {
            this.setState({
                isSubmitting: false,
                isTemplateSubmitButtonDisabled: false,
            });
            window.alert('請選擇模板形式');
        }
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
                    isEditing: true,
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
                    isCardSubmitButtonDisabled: true,
                    isPreviewButtonDisabled: true,
                    isTemplateSaveButtonDisabled: true,
                    isTemplateSubmitButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        video
                    },
                })
            );
        } else {
            this.setState(
                prevState => ({
                    isCardSubmitButtonDisabled: false,
                    isEditing: true,
                    isPreviewButtonDisabled: false,
                    isTemplateSaveButtonDisabled: false,
                    isTemplateSubmitButtonDisabled: false,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        video
                    },
                })
            );
        }
    }

    isUpdatingImage(contentType, images) {
        if (contentType === 'image' && images.length === 1) {
            return true;
        } else {
            return false;
        }
    }

    setImageLocation(image_location) {
        this.setState(
            prevState => ({
                isCardSubmitButtonDisabled: false,
                isPreviewButtonDisabled: false,
                isTemplateSaveButtonDisabled: false,
                isTemplateSubmitButtonDisabled: false,
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    image_location,
                },
            })
        );
    }

    render() {
        const {
            contentType,
            images,
            isAtTemplatePage,
            isAutoMatchDialogOpen,
            isMyCard,
            isCardSubmitButtonDisabled,
            isDiscardAlertOpen,
            isMyTemplate,
            isNextStepButtonDisabled,
            isPreviewButtonDisabled,
            isSubmitting,
            isTemplateDeleteButtonDisabled,
            isTemplateSaveButtonDisabled,
            isTemplateSubmitButtonDisabled,
            ludoCreateForm,
            open,
            resizedHeight,
            resizedWidth,
            step,
        } = this.state;

        const {
            duration,
            image_location,
            interval,
            introduction,
            period,
            tags,
            title,
            video,
        } = ludoCreateForm;

        const width = window.innerWidth || document.body.clientWidth;
        const contentStyle = (width <= 768) ? mobileContentStyle : deskTopContentStyle;

        return (
            <StyledDialog
                contentStyle={contentStyle}
                onRequestClose={this.handleCloseClick}
                open={open}
                style={dialogStyle}
                title={titles[step]}
                titleStyle={titleStyle}
            >
                <StepperCloseIcon handleCloseClick={this.handleCloseClick} />
                <Content
                    contentType={contentType}
                    duration={duration}
                    handleCheckPointChange={this.handleCheckPointChange}
                    handleContentTypeSelect={this.handleContentTypeSelect}
                    handleDurationChange={this.handleDurationChange}
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
                    isSubmitting={isSubmitting}
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
                    handleAutoMatchSearch={this.handleAutoMatchSearch}
                    handleContentTypeSelect={this.handleContentTypeSelect}
                    handleDialogClose={this.handleDialogClose}
                    handleStepNext={this.handleStepNext}
                    handleStepPrev={this.handleStepPrev}
                    handleTemplateDelete={this.handleTemplateDelete}
                    handleTemplateModify={this.handleTemplateModify}
                    handleTemplateSave={this.handleTemplateSave}
                    handleTemplateSubmit={this.handleTemplateSubmit}
                    isAtTemplatePage={isAtTemplatePage}
                    isCardSubmitButtonDisabled={isCardSubmitButtonDisabled}
                    isMyTemplate={isMyTemplate}
                    isNextStepButtonDisabled={isNextStepButtonDisabled}
                    isPreviewButtonDisabled={isPreviewButtonDisabled}
                    isSubmitting={isSubmitting}
                    isTemplateDeleteButtonDisabled={isTemplateDeleteButtonDisabled}
                    isTemplateSaveButtonDisabled={isTemplateSaveButtonDisabled}
                    isTemplateSubmitButtonDisabled={isTemplateSubmitButtonDisabled}
                    step={step}
                />
                <DiscardAlert
                    handleDiscardAlertClose={this.handleDiscardAlertClose}
                    handleDiscardConfirm={this.handleDialogClose}
                    isDiscardAlertOpen={isDiscardAlertOpen}
                />
                <AutoMatchDialog
                    handleAutoMatchConfirm={this.handleAutoMatchConfirm}
                    handleCardSubmit={this.handleCardSubmit}
                    handleRequestClose={this.handleAutoMatchDialogClose}
                    open={isAutoMatchDialogOpen}
                    isMyCard={isMyCard}
                />
            </StyledDialog>
        );
    }
}

export default CreateStepper;
