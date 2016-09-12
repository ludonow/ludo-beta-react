import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import axios from 'axios';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

export default class OpenedFormOfByStander extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            isDurationClick: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCategory(category_id) {
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

    handleCategoryIcon(category_id) {
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
        const { checkpoint, duration } = this.props.currentFormValue;
        const index = checkpoint.indexOf(value);

        if(value <= duration) { // before hover and now hover
            if (index != -1) {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--checkpoint`;
            } else {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--duration`;
            };
        } else { // after hover
            return `ludo-detail-information-day-picker__button`;
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const { currentLudoId, currentFormValue } = this.props;
        console.log('before join axios put');
        console.log(`/apis/ludo/${currentLudoId}`);
        const body = {
                'type': 'match',
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles
        };
        console.log('body', body);

        // axios.put(`/apis/ludo/${currentLudoId}`, body)
        // .then(function (response) {
        //     if(response.data.status == '200') {
        //         // TODO: Confirm joining Ludo
        //         console.log('response data', response.data);
        //     } else {
        //         console.log('message from server: ', response.data.message);
        //     }
        // })
        // .catch(function (error) {
        //     console.log('error', error);
        //     console.log('error message from server: ', response.data.message);
        // });
        console.log('after join axios put');
    }

    render() {
        const { maxDuration } = this.state;
        const { currentFormValue } = this.props;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i == 7) {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        disabled={true}
                    />, <br key="br" /> 
                );
            } else {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        disabled={true}
                    />
                );
            };
        };
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.handleCategoryIcon(currentFormValue.category_id)} />
                        </div>
                        <div className="top-right-container">
                            <div className="category-container">
                                <span className="category-label">Category:</span>
                                <span className="category-value">
                                    {this.handleCategory(currentFormValue.category_id)}
                                </span>
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {currentFormValue.title}
                            </div>
                            <div className="ludo-detail-information-field__text">
                                {currentFormValue.tags}
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="marbles-label">Marbles:<span className="marbles-label--number">{currentFormValue.marbles}</span></div>
                        <div className="ludo-detail-information-slider--marbles">
                            <RcSlider value={currentFormValue.marbles} disabled={true} />
                        </div>
                        <div className="duration-label">Duration:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider 
                                max={maxDuration} min={3} value={currentFormValue.duration} disabled={true}
                            />
                        </div>
                        <div className="ludo-detail-information-field__text ludo-detail-information-field__text--introduction">
                            {currentFormValue.introduction} 
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Join
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};