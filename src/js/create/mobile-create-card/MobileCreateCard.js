import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import axios from '../../axios-config';

import CardTitle from './CardTitle';
import MobileCreateForm from './MobileCreateForm';
import StepButtonList from './StepButtonList';

const ludoStepTitles = [
    '創建卡片',
    '遊戲條件',
    '卡片形式選擇',
    '卡片內容簡介',
    '加分時段選擇',
    '卡片預覽'
];

const templateStepTitles = [
    '創建模板',
    '遊戲條件',
    '卡片形式選擇',
    '卡片內容簡介',
    '加分時段選擇',
    '預覽'
];

const maxStep = ludoStepTitles.length - 1;

export default class MobileCreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentType: '',
            images: [],
            isAtTemplatePage: false,
            isEditing: false,
            isLudoSubmitButtonDisabled: true,
            isNextStepButtonDisabled: true,
            isPreviewButtonDisabled: false,
            isSubmitting: false,
            isTemplateDeleteButtonDisabled: true,
            isTemplateSubmitButtonDisabled: true,
            ludoCreateForm: {
                category_id: 1,
                checkpoint: [3],
                duration: 3,
                image_location: '',
                interval: 1,
                introduction: '',
                period: '0-24',
                marbles: 0,
                tags: [],
                title: '',
                video: '',
            },
            step: 0,
            resizedHeight: 250,
            resizedWidth: 250,
        };
        this.getTemplateData = this.getTemplateData.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleContentTypeSelect = this.handleContentTypeSelect.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageResize = this.handleImageResize.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleStepNext = this.handleStepNext.bind(this);
        this.handleStepPrev = this.handleStepPrev.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
        this.handleTemplateModify = this.handleTemplateModify.bind(this);
        this.handleTemplateSubmit = this.handleTemplateSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.isUpdatingImage = this.isUpdatingImage.bind(this);
        this.setImageLocation = this.setImageLocation.bind(this);
    }

    componentDidMount() {
        this.props.handleIsOpeningCreateFormPage(true);
        if (this.props.params.templateId) {
            const { templateId } = this.props.params;
            this.getTemplateData(templateId);
        }
    }

    componentWillUnmount() {
        this.props.handleIsOpeningCreateFormPage(false);
    }

    getTemplateData(templateId) {
        axios.get(`/apis/ludo/${templateId}`)
        .then((response) => {
            if (response.data.status === '200') {
                const isMyTemplate = response.data.ludo.starter_id === this.props.currentUserId;
                this.setState(
                    prevState => ({
                        isAtTemplatePage: true,
                        isLudoSubmitButtonDisabled: false,
                        isMyTemplate,
                        isNextStepButtonDisabled: false,
                        isTemplateDeleteButtonDisabled: false,
                        ludoCreateForm: {
                            ...prevState.ludoCreateForm,
                            ...response.data.ludo
                        },
                        step: maxStep
                    })
                );
            } else {
                if (window.confirm('取得Ludo模板資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    handleCardSubmit(event) {
        event.preventDefault();
        const { ludoCreateForm } = this.state;
        this.setState({
            isLudoSubmitButtonDisabled: true
        });
        if (!this.props.currentUserId) {
            if (window.confirm('登入後即可發佈卡片！點選「確定」後進入登入頁面。')) {
                browserHistory.push('/login');
            } else {
                this.setState({
                    isLudoSubmitButtonDisabled: false
                });
            }
        } else {
            const {
                contentType,
                images,
                ludoCreateForm,
            } = this.state;
            const isUpdatingImage = this.isUpdatingImage(contentType, images);
            const cardCreateForm = {
                ...ludoCreateForm,
                template_id: this.props.templateId,
            };
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
                        ...cardCreateForm,
                        image_location: imageLocation,
                    };
                    return axios.post('/apis/ludo', cardCreateFormWithUpdatedImage)
                })
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
                                if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
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
                        if (window.confirm('發送Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isCardSubmitButtonDisabled: false
                        });
                    }
                })
                .catch((error) => {
                    if (window.confirm('發送Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isCardSubmitButtonDisabled: false
                    });
                })
                .finally(() => {
                    this.setState({
                        isSubmitting: false
                    });
                });
                
            } else { // not isUpdatingImage
                const cardCreateFormWithoutImageLocation = {
                    ...cardCreateForm,
                    image_location: '',
                };
                const createForm = (contentType === 'image') ? cardCreateForm : cardCreateFormWithoutImageLocation;
                axios.post('/apis/ludo', createForm)
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
                                if (window.confirm('取得Ludo卡片資訊時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
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
                        if (window.confirm('發送Ludo卡片資料時伺服器未回傳正確資料，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isCardSubmitButtonDisabled: false
                        });
                    }
                })
                .catch((error) => {
                    if (window.confirm('發送Ludo卡片資料時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isCardSubmitButtonDisabled: false
                    });
                })
                .finally(() => {
                    this.setState({
                        isSubmitting: false
                    });
                });
            }
        }
    }

    handleCategoryChange(event, index, value) {
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    category_id: value+1
                }
            })
        );
    }

    handleCheckPointChange(event) {
        const interval = event.currentTarget.value;
        const { duration } = this.state.ludoCreateForm;
        const numbersFromZeroToDuration = duration + 1;
        const numberListFromZeroToDuration = [...Array(numbersFromZeroToDuration).keys()];
        const checkpointList = numberListFromZeroToDuration.slice(1);
        const minCheckPoint = duration % interval;
        const newCheckpointList = checkpointList.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    checkpoint: newCheckpointList,
                    interval
                },
            })
        );
    }

    handleContentTypeSelect(event) {
        const contentType = event.currentTarget.dataset.payload;
        this.setState({
            contentType,
            step: 3,
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
            (prevState) => ({
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
        if (!introduction) {
            this.setState(
                prevState => ({
                    isNextStepButtonDisabled: true,
                    isTemplateSubmitButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
        } else {
            this.setState(
                prevState => ({
                    isEditing: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        introduction
                    }
                })
            );
            const { title } = this.state.ludoCreateForm;
            if (title) {
                this.setState({
                    isNextStepButtonDisabled: false,
                    isPreviewButtonDisabled: false,
                    isTemplateSubmitButtonDisabled: false,
                });
            }
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
            (prevState) => ({
                ...prevState,
                step: prevState.step + variation
            })
        );
    }

    handleStepNext() {
        const {
            contentType,
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
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    tags: newTags
                }
            })
        );
    }

    handleTagDelete(event) {
        const currentTagIndex = Number(event.currentTarget.dataset.id);
        const { tags } = this.state.ludoCreateForm;
        const newTags = [
            ...tags.slice(0, currentTagIndex),
            ...tags.slice(currentTagIndex + 1)
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

    handleTemplateDelete(event) {
        event.preventDefault();
        /* TODO: Use notification confirming delete ludo */
        this.setState({
            isTemplateDeleteButtonDisabled: true
        });
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo模板嗎？');
        // const isSureToDelete = window.confirm('Are you sure to delete this template ludo?');
        if (isSureToDelete) {
            axios.delete(`/apis/ludo/${this.props.params.templateId}`)
            .then(response => {
                if (response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    window.alert('刪除模板成功');
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

    handleTemplateModify() {
        this.setState({
            step: 0,
        });
    }

    handleTemplateSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitting: true,
            isTemplateSubmitButtonDisabled: true
        });
        const {
            contentType,
            ludoCreateForm
        } = this.state;
        const ludoTemplateForm = {
            ...ludoCreateForm,
            type: 'blank',
        };
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
                const { ludoCreateForm } = this.state;
                const ludoTemplateForm = {
                    ...ludoCreateForm,
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
                            browserHistory.push(`/template/${ludo_id}`);
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
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                });
            });
        } else if (contentType === 'text' || contentType === 'video') {
            const { ludoCreateForm } = this.state;
            const ludoTemplateForm = {
                ...ludoCreateForm,
                type: 'blank',
            };
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
                            browserHistory.push(`/template/${ludo_id}`);
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
            window.alert('請選擇模板形式');
        }
    }

    handleTitleChange(event) {
        const title = event.currentTarget.value;
        if (!title) {
            this.setState(
                prevState => ({
                    isNextStepButtonDisabled: true,
                    isTemplateSubmitButtonDisabled: true,
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        title
                    }
                })
            );
        } else {
            this.setState(
                prevState => ({
                    ludoCreateForm: {
                        ...prevState.ludoCreateForm,
                        title
                    }
                })
            );
            const { introduction } = this.state.ludoCreateForm;
            if (introduction) {
                this.setState({
                    isNextStepButtonDisabled: false,
                    isTemplateSubmitButtonDisabled: false,
                });
            }
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
                isPreviewButtonDisabled: false,
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    image_location,
                },
            })
        );
    }

    /* components/_mobile-create.scss */
    render() {
        const {
            contentType,
            images,
            isAtTemplatePage,
            isLudoSubmitButtonDisabled,
            isNextStepButtonDisabled,
            isPreviewButtonDisabled,
            isSubmitting,
            isTemplateDeleteButtonDisabled,
            isTemplateSubmitButtonDisabled,
            ludoCreateForm,
            step,
            resizedHeight,
            resizedWidth,
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

        const { templateId } = this.props.params;
        const cardTitle = templateId ? ludoStepTitles[step] : templateStepTitles[step];

        const isCreatedByCurrentUser = ludoCreateForm.starter_id === this.props.currentUserId;

        return (
            <div className="mobile-create-card">
                <CardTitle title={cardTitle} />
                <MobileCreateForm
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
                    handleCardSubmit={this.handleCardSubmit}
                    handleContentTypeSelect={this.handleContentTypeSelect}
                    handleStepNext={this.handleStepNext}
                    handleStepPrev={this.handleStepPrev}
                    handleTemplateDelete={this.handleTemplateDelete}
                    handleTemplateModify={this.handleTemplateModify}
                    handleTemplateSubmit={this.handleTemplateSubmit}
                    isAtTemplatePage={isAtTemplatePage}
                    isCreatedByCurrentUser={isCreatedByCurrentUser}
                    isLudoSubmitButtonDisabled={isLudoSubmitButtonDisabled}
                    isNextStepButtonDisabled={isNextStepButtonDisabled}
                    isPreviewButtonDisabled={isPreviewButtonDisabled}
                    isTemplateDeleteButtonDisabled={isTemplateDeleteButtonDisabled}
                    isTemplateSubmitButtonDisabled={isTemplateSubmitButtonDisabled}
                    maxStep={maxStep}
                    step={step}
                />
            </div>
        );
    }
}
