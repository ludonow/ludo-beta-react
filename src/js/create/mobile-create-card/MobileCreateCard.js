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
                    ludoCreateForm: response.data.ludo
                });
            })
            .catch((error) => {
                window.alert('取得 Ludo 時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error(`MobileCreateCard componentDidMount get ludo ${ludo_id} error: `, error);
            });
        }
    }

    componentWillUnmount() {
        this.props.handleIsOpeningCreateFormPage(false);
    }

    handleCardSubmit(event) {
        event.preventDefault();
        const {
            category_id,
            checkpoint,
            duration,
            interval,
            introduction,
            marbles,
            tags,
            title
        } = this.state.ludoCreateForm;
        const ludoCreateForm = {
            category_id: category_id + 1,
            checkpoint,
            duration,
            interval,
            introduction,
            marbles,
            tags,
            title
        };
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
                        window.alert('取得Ludo資訊時發生錯誤，請重新整理一次；若問題還是發生，請聯絡開發團隊');
                        console.error('get after post template response from server: ', response);
                        console.error('get after post template message from server: ', response.data.message);
                    }
                })
                .catch((error) => {
                    window.alert('建立Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('get after post template error', error);
                });
            } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                window.alert('燃料或彈珠數不足: ' + response.data.message);
                console.error('post template message from server: ', response.data.message + response.data.status);
            } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                window.alert('有部分欄位為空白');
                console.error('post template message from server: ', response.data.message + response.data.status);
            }  else {
                window.alert('建立Ludo模板時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('post template message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            window.alert('建立Ludo模板時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('post template error', error);
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
        const { duration } = this.state;
        const checkpoint = Array.from(Array(duration+1).keys()).slice(1);
        const minCheckPoint = duration % interval;
        const newCheckpoint = checkpoint.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    checkpoint: newCheckpoint,
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
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    introduction
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
        const {
            category_id,
            checkpoint,
            duration,
            interval,
            introduction,
            marbles,
            tags,
            title
        } = this.state.ludoCreateForm;
        const ludoTemplateForm = {
            category_id: category_id + 1,
            checkpoint,
            duration,
            interval,
            introduction,
            marbles,
            tags,
            title,
            type: 'blank'
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
                        const { getUserBasicData, handleShouldProfileUpdate, updateCurrentFormValue } = this.props;
                        getUserBasicData();
                        handleShouldProfileUpdate(true);
                        this.props.getFilteredLudoList('stage=0');
                        browserHistory.push('/playground');
                    } else {
                        window.alert('取得Ludo資訊時發生錯誤，請重新整理一次；若問題還是發生，請聯絡開發團隊');
                        console.error('get after post template response from server: ', response);
                        console.error('get after post template message from server: ', response.data.message);
                    }
                })
                .catch((error) => {
                    window.alert('建立Ludo時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('get after post template error', error);
                });
            } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                window.alert('燃料或彈珠數不足: ' + response.data.message);
                console.error('post template message from server: ', response.data.message + response.data.status);
            } else if (response.data.status === '400' && response.data.message === 'some fields are blank') {
                window.alert('有部分欄位為空白');
                console.error('post template message from server: ', response.data.message + response.data.status);
            } else {
                window.alert('建立Ludo模板時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('post template message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            window.alert('建立Ludo模板時發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('post template error', error);
        });
    }

    handleTitleChange(title) {
        this.setState(
            (prevState) => ({
                ludoCreateForm: {
                    ...prevState.ludoCreateForm,
                    title
                }
            })
        );
    }

    /* components/_mobile-create.scss */
    render() {
        const {
            isAtTemplatePage,
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
                    maxStep={maxStep}
                    step={step}
                />
            </div>
        );
    }
}
