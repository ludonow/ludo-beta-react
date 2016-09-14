import React from 'react';
import axios from 'axios';
import RcSlider from 'rc-slider';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

export default class ActiveBystanderForm extends React.Component {
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
        const { ludoId }= this.props.params;
        const { getCurrentLudoData } = this.props;
        getCurrentLudoData(ludoId);
        console.log('OpenedFormOfStarter componentDidMount ludoId', ludoId);
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
        // const { currentFormValue, params } = this.props;
        // const { ludoId } = params;
        // console.log(`/apis/ludo/${ludoId}`);
        // const body = {
        //     'type': 'match',
        //     'duration': currentFormValue.duration,
        //     'marbles': currentFormValue.marbles,
        //     'stage': currentFormValue.stage
        // };
        // console.log('body', body);

        // console.log('before join axios put');
        // axios.put(`/apis/ludo/${ludoId}`, body)
        // .then(function (response) {
        //     if(response.data.status == '200') {
        //         // TODO: Confirm joining Ludo
        //         console.log('response data', response.data);
        //         console.log('after join axios put');
        //         browserHistory.push(`/active/${ludoId}`);
        //     } else {
        //         console.log('message from server: ', response.data.message);
        //     }
        // })
        // .catch(function (error) {
        //     console.log('error', error);
        //     console.log('error message from server: ', response.data.message);
        // });
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
            <div className="form">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="ludo-detail-information-icon">
                            <img className="ludo-detail-information-icon__img" src={this.handleIconChange()} />
                        </div>
                        <div className="ludo-detail-information-fields">
                            <div className="ludo-detail-information-fields__field ludo-detail-information-field-dropdown-list-container">
                                <label>Category:</label>
                                <DropdownList 
                                    className="ludo-detail-information-field-dropdown-list"
                                    data={category}
                                    onChange={this.handleCategoryChange}
                                    defaultValue="lifestyle"
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   Title" 
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   #hashtag" 
                                    onChange={this.handleTagsChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="ludo-detail-information-field">
                            <div className="ludo-detail-information-slider ludo-detail-information-slider--marbles">
                                <label>Marbles:</label>
                                <RcSlider max={50} min={1} 
                                    defaultValue={1} value={ludoCreateForm.marbles}
                                    onChange={this.handleMarblesChange}
                                />
                            </div>
                        </div>
                        <div className="ludo-detail-information-field">
                            <label>Duration:</label>
                        </div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider ludo-detail-information-slider--duration">
                            <RcSlider 
                                max={maxDuration} min={3} 
                                defaultValue={3} value={ludoCreateForm.duration}
                                onChange={this.handleDurationValue}
                            />
                        </div>
                        <div className="ludo-detail-information-field">
                            <textarea 
                                className="ludo-detail-information-field__text-field ludo-detail-information-field__text-field--introduction" 
                                placeholder="Introduction" 
                                onChange={this.handleIntroductionChange}
                            />
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Follow
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};