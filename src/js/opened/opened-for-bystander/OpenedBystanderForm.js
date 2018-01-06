import React from 'react';
import { browserHistory } from 'react-router';
import RcSlider from 'rc-slider';
import styled from 'styled-components';

import axios from '../../axios-config';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [
    othersIcon,
    lifestyleIcon,
    readIcon,
    exerciseIcon,
    studyIcon,
    newSkillIcon,
    unmentionablesIcon,
    othersIcon
];

const IntroductionParagraph = styled.div`
    align-items: center;
    background-color: #f0f0f0;
    font-size: 1.1vw;
    justify-content: center;
    min-height: 70px;
    padding: 10px;
    text-align: left;
    white-space: pre-line;
    width: 100%;
`;

const TagsWrapper = styled.div`
    border: none;
    margin: 0;
    width: 100%;
`;

const Title = styled.div`
    align-items: center;
    background-color: #f0f0f0;
    font-size: 1vw;
    height: 30px;
    line-height: 30px;
    width: 80%;
`;

export default class OpenedBystanderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadyJoinNewLudo: false,
            alreadyJoinFormValue: {},
            // category: ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            isJoinButtonClickable: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isJoinButtonClickable) {
            this.setState({
                isJoinButtonClickable: true
            })
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFormValue();
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.props.router_currentFormValue;
        const index = checkpoint.indexOf(value);
        /* components/_ludo-detail-information.scss */
        if (index != -1) {
            return ' ludo-detail-information-day-picker__button--checkpoint';
        } else {
            return ' ludo-detail-information-day-picker__button--duration';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        /* TODO: Use notification confirming join */
        this.setState({
            isJoinButtonClickable: false
        });
        // const isSureToJoin = window.confirm('Are you sure to join?');
        const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
        if (isSureToJoin) {
            const { ludo_id } = this.props.params;
            const currentFormValue = this.props.router_currentFormValue;
            const joinLudoPutbody = {
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles,
                'stage': currentFormValue.stage,
                'type': 'match'
            };
            axios.put(`/apis/ludo/${ludo_id}`, joinLudoPutbody)
            .then(response => {
                if (response.data.status === '200') {
                    this.setState({
                        isJoinButtonClickable: false
                    });
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    /* TODO: Figure out how to use same url redirect to other component */
                    browserHistory.push(`/ludo-edit/${ludo_id}`);
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('你的燃料用完囉！');
                    this.setState({
                        isJoinButtonClickable: true
                    });
                } else {
                    console.log(response.data);
                    window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('OpenedBystanderForm join else response from server: ', response);
                    console.error('OpenedBystanderForm join else message from server: ', response.data.message);
                    this.setState({
                        isJoinButtonClickable: true
                    });
                }
            })
            .catch(error => {
                window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('OpenedBystanderForm join put error', error);
                this.setState({
                    isJoinButtonClickable: true
                });
            });
        } else {
            window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.error('OpenedBystanderForm error in state isJoinButtonClickable');
            this.setState({
                isJoinButtonClickable: true
            });
        }
    }

    render() {
        const { alreadyJoinNewLudo, alreadyJoinFormValue, category, isJoinButtonClickable, maxDuration, maxMarbles } = this.state;
        const currentFormValue = alreadyJoinNewLudo ? alreadyJoinFormValue: this.props.router_currentFormValue;
        const { category_id, duration, introduction, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        for (let i = 1; i <= maxDuration; i++) {
            if (i <= duration) {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input
                            /* components/_ludo-detail-information.scss */
                            className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />, <br key="br" />
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />
                    );
                }
            } else {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input
                            className="ludo-detail-information-day-picker__button"
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />, <br key="br" />
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className="ludo-detail-information-day-picker__button"
                            disabled
                            key={`button-${i}`}
                            type="button"
                            value={i}
                        />
                    );
                }
            }

        }
        return (
            /* components/_form.scss */
            <div className="form">
                {/* components/_ludo-detail-information.scss */}
                <form
                    className="ludo-detail-information-container margin-offset"
                    onSubmit={this.handleSubmit}
                >
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img
                                className="category-icon"
                                src={iconArray[category_id]}
                            />
                        </div>
                        <div className="top-right-container">
                            <div className="text-field-container">
                                <span className="text-field-label">種類:</span>
                                <span className="text-field-value">
                                    {category[category_id]}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">標題:</span>
                                <Title>
                                    {title}
                                </Title>
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider
                                disabled
                                max={maxDuration}
                                value={duration}
                            />
                        </div>
                        <div className="text-label">介紹:</div>
                        <div className="text-field-container text-field-container--introduction">
                            <IntroductionParagraph>
                                {introduction}
                            </IntroductionParagraph>
                            {/* components/_tags.scss */}
                            <TagsWrapper className="react-tagsinput">
                                <span className="react-tagsinput-span">
                                    {
                                        tags.length ?
                                        tags.map((tagString, index) => {
                                            return (
                                                <span className="react-tagsinput-tag" key={`tag-${index}`}>
                                                    {tagString}
                                                </span>
                                            );
                                        })
                                        : null
                                    }
                                </span>
                            </TagsWrapper>
                        </div>
                        {/* components/_submit-button.scss */}
                        <button
                            className="ludo-detail-information-submit-button"
                            type="submit"
                            disabled={!isJoinButtonClickable || !this.props.isLoggedIn}
                        >
                            加入
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};
