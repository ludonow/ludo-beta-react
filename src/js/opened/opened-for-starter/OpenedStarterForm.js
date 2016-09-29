import React from 'react';
import RcSlider from 'rc-slider';
import axios from '../../axios-config';
import { browserHistory } from 'react-router';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class OpenedStarterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLudoDeleted: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { ludoId }= this.props.params;
        this.props.getCurrentLudoData(ludoId);
    }

    getCategory(category_id) {
        // const category = ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'];
        const category = ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'];
        return category[category_id];
    }

    getCategoryIcon(category_id) {
        return iconArray[category_id];
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.props.currentFormValue;
        const index = checkpoint.indexOf(value);
        if (index != -1) {
            return ` ludo-detail-information-day-picker__button--checkpoint`;
        } else {
            return ` ludo-detail-information-day-picker__button--duration`;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // TODO: Use notification confirming delete ludo 
        const isSureToDelete = window.confirm(`Are you sure to delete this ludo?`);
        if (!this.state.isLudoDeleted && isSureToDelete) {
            const { currentFormValue, params } = this.props;
            const { ludoId } = params;
            // console.log(`/apis/ludo/${ludoId}`);   // debug
            const body = {
                'marbles': currentFormValue.marbles
            };
            // console.log('ludo delete body', body);   // debug
            // console.log('before quit axios delete');   // debug
            axios.delete(`/apis/ludo/${ludoId}`, body)
            .then(response => {
                if(response.data.status == '200') {
                    this.setState({
                        isLudoDeleted: true
                    });
                    this.props.getBasicUserData();
                    this.props.handleShouldProfileUpdate(true);
                    // console.log('response data', response.data);   // debug
                    // console.log('after quit axios delete');   // debug
                    browserHistory.push(`/playground`);
                } else {
                    window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.log('OpenedStarterForm delete else message from server: ', response.data.message);
                    console.log('OpenedStarterForm delete else error from server: ', response.data.err);
                }
            })
            .catch(error => {
                window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.log('OpenedStarterForm delete error', error);
            });
        } else {
            console.log('OpendStarterForm error in state isLudoDeleted');
            this.setState({
                isLudoDeleted: true
            });
        }
    }

    handleTagsChange(tags) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                tags
            })
        );
    }

    render() {
        const { maxDuration, maxMarbles } = this.state;
        const { currentFormValue } = this.props; 
        const { category_id, duration, introduction, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i <= duration) {
                if(i == 7) {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button${this.handleDayPickerClass(i)}`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />
                    );
                }
            } else {
                if(i == 7) {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />
                    );
                }
            }
        }
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.getCategoryIcon(category_id)} />
                        </div>
                        <div className="top-right-container">
                            <div className="text-field-container">
                                <span className="text-field-label">種類:</span>
                                <span className="text-field-value">
                                    {this.getCategory(category_id)}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">標題:</span>
                                <span className="text-field-value">
                                    {title}
                                </span>
                            </div>
                            <div className="label-and-slider">
                                <div className="text-label">
                                    彈珠數:<span className="text-label--marble-number">{marbles}</span>
                                </div>
                                <div className="ludo-detail-information-slider--marbles">
                                    <RcSlider max={maxMarbles} value={marbles} disabled={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider max={maxDuration} value={duration} disabled={true} />
                        </div>
                        <div className="text-label">介紹:</div>
                        <div className="text-field-container text-field-container--introduction">
                            <div className="text-field__introduction">
                                {introduction}
                            </div>
                            <div className="text-field--hashtag">
                                <div className="react-tagsinput">
                                    <span className="react-tagsinput-span">
                                        {
                                            this.props.currentFormValue.tags.length ?
                                            this.props.currentFormValue.tags.map((tagString, index) => {
                                                return (
                                                    <span className="react-tagsinput-tag" key={`tag-${index}`}>
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
                        <button 
                            className="ludo-detail-information-submit-button" 
                            type="submit" 
                            disabled={this.state.isLudoDeleted}
                        >
                            刪除
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};