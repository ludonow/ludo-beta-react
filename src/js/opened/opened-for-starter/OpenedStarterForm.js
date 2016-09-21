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

export default class OpenedStarterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { ludoId }= this.props.params;
        const { getCurrentLudoData } = this.props;
        getCurrentLudoData(ludoId);
        this.setState({
            isSubmitted: false
        });
    }

    getCategory(category_id) {
        switch (category_id) {
            case 1:
                return `lifestyle`;
            case 2:
                return `read`;
            case 3:
                return `exercise`;
            case 4:
                return `study`;
            case 5:
                return `newSkill`;
            case 6:
                return `unmentionables`;
            case 7:
                return `others`;
            default:
                return `lifestyle`;
        };
    }

    getCategoryIcon(category_id) {
        switch (category_id) {
            case 1:
                return lifestyleIcon;
            case 2:
                return readIcon;
            case 3:
                return exerciseIcon;
            case 4:
                return studyIcon;
            case 5:
                return newSkillIcon;
            case 6:
                return unmentionablesIcon;
            case 7:
                return othersIcon;
            default:
                return lifestyleIcon;
        }
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
        // TODO: Use notification confirming delete ludo 
        const isSureToDelete = window.confirm(`Are you sure to delete this ludo?`);
        if (!isSubmitted && isSureToDelete) {
            const { currentFormValue, params } = this.props;
            const { ludoId } = params;
            console.log(`/apis/ludo/${ludoId}`);
            const body = {
                'marbles': currentFormValue.marbles
            };
            console.log('body', body);
            console.log('before quit axios delete');
            axios.delete(`/apis/ludo/${ludoId}`, body)
            .then(response => {
                if(response.data.status == '200') {
                    this.setState({
                        isSubmitted: true
                    });
                    this.props.handleIsUpdatingProfile(true);
                    console.log('response data', response.data);
                    console.log('after quit axios delete');
                    browserHistory.push(`/playground`);
                } else {
                    console.log('message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.log('error', error);
                console.log('error message from server: ', response.data.message);
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
                            <RcSlider value={marbles} max={currentFormValue.maxMarbles} disabled={true} />
                        </div>
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider 
                                max={maxDuration} value={currentFormValue.duration} disabled={true}
                            />
                        </div>
                        <div className="text-label">介紹:</div>
                        <div className="text-field-container">
                            <div className="text-field__introduction">
                                {introduction}
                            </div>
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit" disabled={isSubmitted}>
                            刪除
                        </button>
                    </div>
                </form>
            </div>
            // <div className="ludo-detail-information-field__text ludo-detail-information-field__text--introduction">
        );
    }
};