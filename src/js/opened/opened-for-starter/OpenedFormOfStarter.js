import React from 'react';
import RcSlider from 'rc-slider';
import axios from 'axios';
import { browserHistory } from 'react-router';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

export default class OpenedFormOfStarter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const ludoId = this.props.params.ludoId;
        // console.log('OpenedFormOfStarter componentDidMount ludoId', ludoId);
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
        const { currentLudoId, currentFormValue } = this.props;
        console.log(`/apis/ludo/${currentLudoId}`);
        const body = {
            'marbles': currentFormValue.marbles
        };
        console.log('body', body);

        console.log('before quit axios delete');
        axios.delete(`/apis/ludo/${currentLudoId}`, body)
        .then(response => {
            if(response.data.status == '200') {
                // TODO: Confirm quiting Ludo
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
    }

    render() {
        const { maxDuration, maxMarbles } = this.state;
        const { currentFormValue } = this.props; 
        const { category_id, duration, introduction, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i == 7) {
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
        }
        return (
            <div className="grid-item--ludo-detail-information">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.getCategoryIcon(category_id)} />
                        </div>
                        <div className="top-right-container">
                            <div className="category-container">
                                <span className="category-label">Category:</span>
                                <span className="category-value">
                                    {this.getCategory(category_id)}
                                </span>
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {title}
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {tags}
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="marbles-label">Marbles:<span className="marbles-label--number">{marbles}</span></div>
                        <div className="ludo-detail-information-slider--marbles">
                            <RcSlider value={marbles} max={currentFormValue.maxMarbles} disabled={true} />
                        </div>
                        <div className="duration-label">Duration:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider 
                                max={maxDuration} value={currentFormValue.duration} disabled={true}
                            />
                        </div>
                        <div className="ludo-detail-information-field__text ludo-detail-information-field__text--introduction">
                            {introduction} 
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Quit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};