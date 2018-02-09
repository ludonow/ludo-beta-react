import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import axios from '../../axios-config';

import CardTitle from './CardTitle';
import MobileCreateForm from './MobileCreateForm';
import StepButtonContainer from './StepButtonContainer';

const stepTitles = [
    '創建卡片',
    '遊戲條件',
    '種類選擇',
    '卡片預覽'
];
const maxStep = stepTitles.length - 1;

export default class MobileCreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 0,
                checkpoint: [3],
                duration: 3,
                interval: 1,
                introduction: '',
                marbles: 0,
                tags: [],
                title: ''
            },
            isAtTemplatePage: false,
            isLudoSubmitButtonDisabled: true,
            isNextStepButtonDisabled: true,
            isTemplateSubmitButtonDisabled: true,
            step: 0
        };
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTemplateSubmit = this.handleTemplateSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentDidMount() {
        this.props.handleIsOpeningCreateFormPage(true);
        if (this.props.params.ludo_id) {
            const { ludo_id } = this.props.params;
            axios.get(`/apis/ludo/${ludo_id}`)
            .then((response) => {
                this.setState({
                    isAtTemplatePage: true,
                    isLudoSubmitButtonDisabled: false,
                    isNextStepButtonDisabled: false,
                    ludoCreateForm: response.data.ludo
                });
            })
            .catch((error) => {
                if (window.confirm('取得Ludo模板資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        }
    }

    componentWillUnmount() {
        this.props.handleIsOpeningCreateFormPage(false);
    }

    handleCardSubmit(event) {
        event.preventDefault();
        const { category_id } = this.state.ludoCreateForm;
        const ludoCreateForm = {
            ...this.state.ludoCreateForm,
            category_id: category_id + 1
        };
        this.setState({
            isLudoSubmitButtonDisabled: true
        });
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
                        const { getUserBasicData, handleShouldProfileUpdate, updateCurrentFormValue } = this.props;
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

    handleCategoryChange(event, index, value) {
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    category_id: value
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
        const { tags } = this.state;
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

    handleTemplateSubmit(event) {
        event.preventDefault();
        const { category_id } = this.state.ludoCreateForm;
        const ludoTemplateForm = {
            ...this.state.ludoCreateForm,
            category_id: category_id + 1,
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
                        const { getUserBasicData, handleShouldProfileUpdate, updateCurrentFormValue } = this.props;
                        getUserBasicData();
                        handleShouldProfileUpdate(true);
                        this.props.getFilteredLudoList('stage=0');
                        browserHistory.push('/playground');
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
            isTemplateSubmitButtonDisabled,
            ludoCreateForm,
            step
        } = this.state;

        const {
            category_id,
            duration,
            interval,
            introduction,
            tags,
            title
        } = ludoCreateForm;

        return (
            <div className="mobile-create-card">
                <CardTitle title={stepTitles[step]} />
                <MobileCreateForm
                    categoryId={category_id}
                    duration={duration}
                    handleCategoryChange={this.handleCategoryChange}
                    handleCheckPointChange={this.handleCheckPointChange}
                    handleDurationChange={this.handleDurationChange}
                    handleIntroductionChange={this.handleIntroductionChange}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}
                    handleTitleChange={this.handleTitleChange}
                    interval={interval}
                    introduction={introduction}
                    step={step}
                    tags={tags}
                    title={title}
                />
                <StepButtonContainer
                    handleCardSubmit={this.handleCardSubmit}
                    handleStepChange={this.handleStepChange}
                    handleTemplateSubmit={this.handleTemplateSubmit}
                    isAtTemplatePage={isAtTemplatePage}
                    isLudoSubmitButtonDisabled={isLudoSubmitButtonDisabled}
                    isNextStepButtonDisabled={isNextStepButtonDisabled}
                    isTemplateSubmitButtonDisabled={isTemplateSubmitButtonDisabled}
                    maxStep={maxStep}
                    step={step}
                />
            </div>
        );
    }
}
