import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../../axios-config';
import RcSlider from 'rc-slider';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class ActiveBystanderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // category: ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            isFollowButtonClickable: false,
            isUserFollowingThisLudo: false,
            maxDuration: 14,
            maxMarbles: 50,
            timeLineMarks: {}
        };
        this.getTimeLineMarks = this.getTimeLineMarks.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { currentUserId, isLoggedIn, router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isFollowButtonClickable) {
            this.getTimeLineMarks(nextProps);
            for (let i = 0; i < router_currentFormValue.followers.length; i++) {
                if (router_currentFormValue.followers[i].user_id === currentUserId) {
                    this.setState({
                        isUserFollowingThisLudo: true
                    });
                    break;
                }
            }
            if (isLoggedIn) {
                this.setState({
                    isFollowButtonClickable: true
                });
            }
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFormValue();
    }

    getTimeLineMarks(nextProps) {
        const { state } = this;
        const currentFormValue = nextProps.router_currentFormValue;
        const { checkpoint, duration } = currentFormValue;

        const { timeLineMarks } = state;
        const durationTimeMarks = {};
        for (let i = 1; i <= duration; i++) {
            if (checkpoint.indexOf(i) != -1) {
                durationTimeMarks[i] = {
                    style: {
                        color: 'white'
                    },
                    label: i
                };
            } else {
                durationTimeMarks[i] = i;
            }

        }
        this.setState({
            timeLineMarks: durationTimeMarks
        });
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.props.currentFormValue;
        const index = checkpoint.indexOf(value);
        if (index != -1) {
            return ' ludo-detail-information-day-picker__button--checkpoint';
        } else {
            return ' ludo-detail-information-day-picker__button--duration';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleShouldProfileUpdate(true);
        this.setState({
            isFollowButtonClickable: false
        });
        const { ludo_id } = this.props.params;
        const body = {
            'type': 'follow',
            'isFollow': this.state.isUserFollowingThisLudo
        };
        // TODO: add follow others' ludo feature
        axios.put(`/apis/ludo/${ludo_id}`, body)
        .then((response) => {
            if (response.data.status === '200') {
                // TODO: Confirm following Ludo
                this.setState({
                    isFollowButtonClickable: true,
                    isUserFollowingThisLudo: !this.state.isUserFollowingThisLudo
                });
            } else {
                this.setState({
                    isFollowButtonClickable: true
                });
                window.alert('追蹤Ludo時發生錯誤，請再試一次，若問題依然發生，請聯絡開發團隊');
                console.error('ActiveBystanderForm handleSubmit else response from server: ', response);
            }
        })
        .catch((error) => {
            this.setState({
                isFollowButtonClickable: true
            });
            window.alert('追蹤Ludo時發生錯誤，請再試一次，若問題依然發生，請聯絡開發團隊');
            console.error('ActiveBystanderForm handleSubmit error', error);
        });
    }

    render() {
        const currentFormValue = this.props.router_currentFormValue;
        const { category, maxMarbles, timeLineMarks } = this.state;
        const { category_id, checkpoint, duration, introduction, marbles, tags, title } = currentFormValue;
        let textOnSubmitButton = '';
        this.state.isUserFollowingThisLudo ?
            textOnSubmitButton = '取消追蹤'
        :
            textOnSubmitButton = '追蹤'

        return (
            /* components/_report-form.scss */
            <div className="form--report">
                {/* components/_ludo-detail-information.scss */}
                <form
                    className="ludo-detail-information-container"
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
                                <span className="text-field-value">
                                    {title}
                                </span>
                            </div>
                            {/* components/_marbles.scss */}
                            <div className="label-and-slider">
                                <div className="text-label">
                                    彈珠數:<span className="text-label--marble-number">{marbles}</span>
                                </div>
                                <div className="ludo-detail-information-slider--marbles">
                                    <RcSlider
                                        disabled
                                        max={maxMarbles}
                                        value={marbles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* components/_report-form.scss */}
                    <div className="report-form-bottom-container">
                        <div className="introduction-container">
                            <div className="text-label">介紹:</div>
                            <div className="introduction-and-tags">
                                <div className="introduction">
                                    {introduction}
                                </div>
                                {/* components/_tags.scss */}
                                <div className="text-field--hashtag">
                                    <div className="react-tagsinput">
                                        <span className="react-tagsinput-span">
                                            {
                                                tags.length ?
                                                tags.map((tagString, index) => {
                                                    return (
                                                        <span
                                                            className="react-tagsinput-tag"
                                                            key={`tag-${index}`}
                                                        >
                                                            {tagString}
                                                        </span>
                                                    );
                                                })
                                                : null
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* components/_report-form.scss */}
                        <div className="time-line-container">
                            <div className="text-label">持續期間:</div>
                            <div className="report-time-line-container">
                                <div className="report-time-line">
                                <RcSlider
                                    className="time-line"
                                    disabled vertical dots
                                    included={false}
                                    marks={timeLineMarks}
                                    max={duration}
                                    min={1}
                                    range={checkpoint.length}
                                    value={checkpoint}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* components/_submit-button.scss */}
                    <button
                        className="ludo-detail-information-submit-button"
                        disabled={!this.state.isFollowButtonClickable}
                        type="submit"
                    >
                        {
                            this.props.isLoggedIn ?
                                textOnSubmitButton
                            :
                                '登入後即可追蹤'
                        }
                    </button>
                </form>
            </div>
        );
    }
}
