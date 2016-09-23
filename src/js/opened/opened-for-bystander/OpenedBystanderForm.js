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

const iconArray = [lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class OpenedBystanderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
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

    componentDidMount() {
        const { ludoId }= this.props.params;
        const { getCurrentLudoData } = this.props;
        getCurrentLudoData(ludoId);
        this.setState({
            isSubmitted: false
        });
        // this._notificationSystem = this.refs.notificationSystem;
    }

    getCategory(category_id) {
        // const category = ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'];
        const category = ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'];
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
        const { isSubmitted } = this.state;
        // TODO: Use notification confirming join
        const isSureToJoin = window.confirm(`Are you sure to join?`);
        if (!isSubmitted && isSureToJoin) {
            const { currentFormValue, params } = this.props;
            const { ludoId } = params;
            console.log(`/apis/ludo/${ludoId}`);
            const body = {
                'type': 'match',
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles,
                'stage': currentFormValue.stage
            };
            console.log('body', body);
            console.log('before join axios put');
            axios.put(`/apis/ludo/${ludoId}`, body)
            .then(response => {
                if(response.data.status == '200') {
                    // TODO: Confirm joining Ludo
                    this.setState({
                        isSubmitted: true
                    });
                    this.props.getBasicUserData();
                    this.props.handleShouldProfileUpdate(true);
                    console.log('response data', response.data);
                    console.log('after join axios put');
                    browserHistory.push(`/active-for-player/${ludoId}`);
                } else {
                    console.log('join else message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.log('join put error', error);
                console.log('join put error message from server: ', response.data.message);
            });
        } else {
            console.log('error in state isSubmitted');
            this.setState({
                isSubmitted: true
            });
        }
    }

    render() {
        const { isSubmitted, maxDuration, maxMarbles } = this.state;
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
                            <div className="text-field-container">
                                <span className="text-field-label">#標籤:</span>
                                <span className="text-field-value">
                                    {tags}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="text-label">彈珠數:<span className="text-label--marble-number">{marbles}</span></div>
                        <div className="ludo-detail-information-slider--marbles">
                            <RcSlider max={maxMarbles} value={marbles} disabled={true} />
                        </div>
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider max={maxDuration} value={duration} disabled={true} />
                        </div>
                        <div className="text-label">介紹:</div>
                        <div className="text-field-container">
                            <div className="text-field__introduction">
                                {introduction}
                            </div>
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit" disabled={isSubmitted}>
                            加入
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};