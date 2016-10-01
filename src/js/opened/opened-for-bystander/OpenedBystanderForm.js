import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../../axios-config';
import RcSlider from 'rc-slider';
import NotificationSystem from 'react-notification-system';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class OpenedBystanderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // category: ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            isJoinButtonClickable: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this._addNotification = this._addNotification.bind(this);
        // this._notificationSystem = null;
    }

    // _addNotification(event) {
    //     event.preventDefault();
    //     this._notificationSystem()._addNotification({
    //         message: 'Notification message',
    //         level: 'success'
    //     });
    // }

    // componentDidMount() {
        // console.log('OpenedBystanderForm componentDidMount');   // debug
        // const { ludo_id }= this.props.params;
        // this.props.getCurrentLudoData(ludo_id);
        // this._notificationSystem = this.refs.notificationSystem;
    // }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isJoinButtonClickable) {
            this.setState({
                isJoinButtonClickable: true
            })
        }
    //     const { currentAuth, currentFormValue } = nextProps;
    //     if (currentAuth && currentFormValue.ludo_id) {
    //         // console.log('OpenedBystanderForm componentWillReceiveProps currentFormValue.ludo_id', currentFormValue.ludo_id);   // debug
    //         if (!this.state.isJoinButtonClickable) {
    //             // console.log('OpenedBystanderForm componentWillReceiveProps redirect currentAuth', currentAuth);   // debug
    //             if (currentAuth == 1) {
    //                 browserHistory.push(`/opened-for-starter/${currentFormValue.ludo_id}`);
    //             } else if (currentAuth == 2 || currentAuth == 0) {
    //                 this.setState({
    //                     isJoinButtonClickable: true
    //                 })
    //             } else if (currentAuth == 3 || currentAuth == 4) {
    //                 browserHistory.push(`/active-for-player/${currentFormValue.ludo_id}`);
    //             } else if (currentAuth == 5) {
    //                 browserHistory.push(`/active-for-bystander/${currentFormValue.ludo_id}`);
    //             } 
    //         }
    //     }
    }

    componentWillUnmount() {
        // console.log('OpenedBystanderForm componentWillUnmount');   // debug
        this.props.clearCurrentFormValue();
    }

    // getCategory(category_id) {
    //     // const category = ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'];
    //     const category = ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'];
    //     return category[category_id];
    // }

    // getCategoryIcon(category_id) {
    //     return iconArray[category_id];
    // }

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
        // TODO: Use notification confirming join
        this.setState({
            isJoinButtonClickable: false
        });
        const isSureToJoin = window.confirm(`Are you sure to join?`);
        if (!this.state.isJoinButtonClickable && isSureToJoin) {
            const { currentFormValue, params } = this.props;
            const { ludoId } = params;
            // console.log(`/apis/ludo/${ludoId}`);   // debug
            const joinLudoPutbody = {
                'type': 'match',
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles,
                'stage': currentFormValue.stage
            };
            // console.log('joinLudoPutbody', joinLudoPutbody);   // debug
            // console.log('before join axios put');   // debug
            axios.put(`/apis/ludo/${ludoId}`, joinLudoPutbody)
            .then(response => {
                if(response.data.status == '200') {
                    // TODO: Confirm joining Ludo
                    this.props.getBasicUserData();
                    this.props.handleShouldProfileUpdate(true);
                    // console.log('response data', response.data);   // debug
                    // console.log('after join axios put');   // debug
                    browserHistory.push(`/active-for-player/${ludoId}`);
                } else {
                    window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.log('OpenedBystanderForm join else message from server: ', response.data.message);
                    console.log('OpenedBystanderForm join else error from server: ', response.data.err);
                    this.setState({
                        isJoinButtonClickable: true
                    });
                }
            })
            .catch(error => {
                window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.log('OpenedBystanderForm join put error', error);
                this.setState({
                    isJoinButtonClickable: true
                });
            });
        } else {
            window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            console.log('OpenedBystanderForm error in state isJoinButtonClickable');
            this.setState({
                isJoinButtonClickable: true
            });
        }
    }

    render() {
        // const { currentFormValue } = this.props;
        const currentFormValue = this.props.router_currentFormValue;
        const { category, isJoinButtonClickable, maxDuration, maxMarbles } = this.state;
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
                            <img className="category-icon" src={iconArray[category_id]} />
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
                            disabled={!isJoinButtonClickable}
                        >
                            加入
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};