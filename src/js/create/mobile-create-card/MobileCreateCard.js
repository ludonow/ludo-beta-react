import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import axios from '../../axios-config';

import CardTitle from './CardTitle';
import MobileCreateForm from './MobileCreateForm';
import StepButtonList from './StepButtonList';

const ludoStepTitles = [
    '創建卡片',
    '遊戲條件',
    '種類選擇',
    '卡片預覽'
];

const templateStepTitles = [
    '創建模板',
    '遊戲條件',
    '種類選擇',
    '預覽'
];

const maxStep = ludoStepTitles.length - 1;

export default class MobileCreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 1,
                checkpoint: [3],
                duration: 3,
                form: '',
                image_location: '',
                interval: 1,
                introduction: '',
                period: '0-24',
                marbles: 0,
                tags: [],
                title: '',
                video: '',
            },
            isAtTemplatePage: false,
            isLudoSubmitButtonDisabled: true,
            isNextStepButtonDisabled: true,
            isTemplateDeleteButtonDisabled: true,
            isTemplateSubmitButtonDisabled: true,
            step: 0,
        };
        this.getTemplateData = this.getTemplateData.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
        this.handleTemplateModify = this.handleTemplateModify.bind(this);
        this.handleTemplateSubmit = this.handleTemplateSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
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
                this.setState(
                    prevState => ({
                        isAtTemplatePage: true,
                        isLudoSubmitButtonDisabled: false,
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
            axios.post('/apis/ludo', ludoCreateForm)
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
                                isLudoSubmitButtonDisabled: false
                            });
                        }
                    })
                    .catch((error) => {
                        if (window.confirm('取得Ludo卡片資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                            // console.log(error);
                        }
                        this.setState({
                            isLudoSubmitButtonDisabled: false
                        });
                    });
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('燃料或彈珠數不足: ' + response.data.message);
                    this.setState({
                        isLudoSubmitButtonDisabled: false
                    });
                } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                    window.alert('有部分欄位為空白');
                    this.setState({
                        isLudoSubmitButtonDisabled: false
                    });
                } else {
                    if (window.confirm('建立Ludo卡片時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isLudoSubmitButtonDisabled: false
                    });
                }
            })
            .catch((error) => {
                if (window.confirm('建立Ludo卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isLudoSubmitButtonDisabled: false
                });
            });
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

    handleIntroductionChange(introduction) {
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
        });
    }

    handleTitleChange(title) {
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

    /* components/_mobile-create.scss */
    render() {
        const {
            isAtTemplatePage,
            isLudoSubmitButtonDisabled,
            isNextStepButtonDisabled,
            isTemplateDeleteButtonDisabled,
            isTemplateSubmitButtonDisabled,
            ludoCreateForm,
            step,
        } = this.state;

        const {
            duration,
            interval,
            introduction,
            period,
            tags,
            title,
        } = ludoCreateForm;

        const ludoId = this.props.params.ludo_id;
        const cardTitle = ludoId ? ludoStepTitles[step] : templateStepTitles[step];

        const isCreatedByCurrentUser = ludoCreateForm.starter_id === this.props.currentUserId;

        return (
            <div className="mobile-create-card">
                <CardTitle title={cardTitle} />
                <MobileCreateForm
                    duration={duration}
                    handleCheckPointChange={this.handleCheckPointChange}
                    handleDurationChange={this.handleDurationChange}
                    handleIntroductionChange={this.handleIntroductionChange}
                    handlePeriodChange={this.handlePeriodChange}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}
                    handleTitleChange={this.handleTitleChange}
                    interval={interval}
                    introduction={introduction}
                    isAtTemplatePage={isAtTemplatePage}
                    period={period}
                    step={step}
                    tags={tags}
                    title={title}
                />
                <StepButtonList
                    handleCardSubmit={this.handleCardSubmit}
                    handleStepChange={this.handleStepChange}
                    handleTemplateDelete={this.handleTemplateDelete}
                    handleTemplateModify={this.handleTemplateModify}
                    handleTemplateSubmit={this.handleTemplateSubmit}
                    isAtTemplatePage={isAtTemplatePage}
                    isCreatedByCurrentUser={isCreatedByCurrentUser}
                    isLudoSubmitButtonDisabled={isLudoSubmitButtonDisabled}
                    isNextStepButtonDisabled={isNextStepButtonDisabled}
                    isTemplateDeleteButtonDisabled={isTemplateDeleteButtonDisabled}
                    isTemplateSubmitButtonDisabled={isTemplateSubmitButtonDisabled}
                    maxStep={maxStep}
                    step={step}
                />
            </div>
        );
    }
}
