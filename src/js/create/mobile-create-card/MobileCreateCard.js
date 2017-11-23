import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import axios from '../../axios-config';

import StepButtonContainer from './StepButtonContainer';
import CardTitle from './CardTitle';
import MobileCreateForm from './MobileCreateForm';

const maxStep = 3;

const stepTitles = [
    '創建卡片',
    '遊戲條件',
    '種類選擇',
    '卡片預覽'
];

export default class MobileCreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0,
            checkpoint: [3],
            duration: 3,
            interval: 1,
            introduction: '',
            marbles: 0,
            step: 0,
            tags: [],
            title: ''
        };
        this.handleCardSubmit = this.handleCardSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleCheckPointChange = this.handleCheckPointChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleCardSubmit(event) {
        event.preventDefault();
        const {
            categoryId,
            checkpoint,
            duration,
            introduction,
            marbles,
            tags,
            title
        } = this.state;
        const ludoCreateForm = {
            category_id: categoryId + 1,
            checkpoint,
            duration,
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
                    {
                        /*
                            response.data.status
                            200: everything's fine;
                            400: user's data issue;
                            401: no login;
                            403: no authority 
                        */
                    }
                    if (response.data.status === '200') {
                        const { getUserBasicData, handleShouldProfileUpdate, updateCurrentFormValue } = this.props;
                        getUserBasicData();
                        handleShouldProfileUpdate(true);
                        updateCurrentFormValue(response.data.ludo);
                        browserHistory.push(`/ludo/${ludo_id}`);
                    } else {
                        window.alert('取得Ludo資訊時發生錯誤，請重新整理一次；若問題還是發生，請聯絡開發團隊');
                        console.error('get after create post response from server: ', response);
                        console.error('get after create post message from server: ', response.data.message);
                    }
                })
                .catch((error) => {
                    window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('get after create post error', error);
                });
            } else if (response.data.status === '400') {
                window.alert('燃料或彈珠數不足: ' + response.data.message);
                console.error('create post message from server: ', response.data.message + response.data.status);
            } else {
                window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('create post message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('create post error', error);
        });
    }

    handleCategoryChange(event, index, value) {
        this.setState({
            categoryId: value
        });
    }

    handleCheckPointChange(event) {
        const interval = event.currentTarget.value;
        const { duration } = this.state;
        const checkpoint = Array.from(Array(duration+1).keys()).slice(1);
        const minCheckPoint = duration % interval;
        const newCheckpoint = checkpoint.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState({
            checkpoint: newCheckpoint,
            interval
        });
    }

    handleDurationChange(currentSliderValue) {
        const { interval } = this.state;
        const checkpoint = Array.from(Array(currentSliderValue+1).keys()).slice(1);
        const minCheckPoint = currentSliderValue % interval;
        const newCheckpoint = checkpoint.filter((element) => {
            return (element - minCheckPoint) % interval === 0;
        });
        this.setState({
            checkpoint: newCheckpoint,
            duration: currentSliderValue
        });
    }

    handleIntroductionChange(introduction) {
        this.setState({
            introduction
        });
    }

    handleStepChange(variation) {
        this.setState({
            step: this.state.step + variation
        });
    }

    handleTagAdd(tag) {
        const { tags } = this.state;
        const tagWithoutHash = tag.replace(/^#/g, '');
        const newTags = [
            ...tags,
            tagWithoutHash
        ];
        this.setState({
            tags: newTags
        });
    }

    handleTagDelete(event) {
        const currentTagIndex = Number(event.currentTarget.dataset.id);
        const { tags } = this.state;
        const newTags = [
            ...tags.slice(0, currentTagIndex),
            ...tags.slice(currentTagIndex + 1)
        ];
        this.setState({
            tags: newTags
        });
    }

    handleTitleChange(title) {
        this.setState({
            title
        });
    }

    /* components/_mobile-create.scss */
    render() {
        const {
            categoryId,
            duration,
            introduction,
            step,
            tags,
            title
        } = this.state;

        return (
            <div className="mobile-create-card">
                <CardTitle title={stepTitles[step]} />
                <MobileCreateForm
                    categoryId={categoryId}
                    duration={duration}
                    handleCategoryChange={this.handleCategoryChange}
                    handleCheckPointChange={this.handleCheckPointChange}
                    handleDurationChange={this.handleDurationChange}
                    handleIntroductionChange={this.handleIntroductionChange}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}
                    handleTitleChange={this.handleTitleChange}
                    introduction={introduction}
                    step={step}
                    tags={tags}
                    title={title}
                />
                <StepButtonContainer
                    handleCardSubmit={this.handleCardSubmit}
                    handleStepChange={this.handleStepChange}
                    maxStep={maxStep}
                    step={step}
                />
            </div>
        );
    }
}