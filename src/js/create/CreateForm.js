import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import NumberPicker from 'react-widgets/lib/NumberPicker';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 1,
                marbles: 1,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            },
            currentHoverValue: 0,
            isDurationClick: false
        };
        numberLocalizer();
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDayPickerClick = this.handleDayPickerClick.bind(this);
        this.handleDayPickerMouseOver = this.handleDayPickerMouseOver.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleDayPickerResetAll = this.handleDayPickerResetAll.bind(this);
        this.handleDayPickerResetDuration = this.handleDayPickerResetDuration.bind(this);
        this.handleDayPickerResetCheckpoint =this.handleDayPickerResetCheckpoint.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleMarblesChange = this.handleMarblesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

    handleCategoryChange(category) {
        let category_id = 0;
        switch (category) {
            case 'lifestyle':
                category_id = 1;
                break;
            case 'read':
                category_id = 2;
                break;
            case 'exercise':
                category_id = 3;
                break;
            case 'study':
                category_id = 4;
                break;
            case 'new skill':
                category_id = 5;
                break;
            case 'unmentionalbles':
                category_id = 6;
                break;
            case 'others':
            default:
                category_id = 7;
                break;
        };
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                category_id
            })
        );
    }

    handleDayPickerResetAll(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                duration: 3,
                checkpoint: [3]
            })
        );
        this.setState(
            Object.assign(this.state, {
                currentHoverValue: 3,
                isDurationClick: false
            })
        );
    }

    handleDayPickerResetDuration(event) {
        this.setState(
            Object.assign(this.state, {
                isDurationClick: false
            })
        );
    }

    handleDayPickerResetCheckpoint(event) {
        const { currentHoverValue, ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                checkpoint: [currentHoverValue]
            })
        );
    }

    handleDayPickerClick(event) {
        if (!this.state.isDurationClick) { // initial
            this.setState(
                Object.assign(this.state, {
                    isDurationClick: true
                })
            );
            const { ludoCreateForm } = this.state;
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: Number(event.target.value)
                })
            );
        } else { // finish duration setting
            const { ludoCreateForm } = this.state;
            let { checkpoint } = ludoCreateForm;
            const checkPointNumber = Number(event.target.value);
            const index = checkpoint.indexOf(checkPointNumber);
            if (index === -1) { // element not in array
                checkpoint.push(checkPointNumber);
            } else { // element is in array
                checkpoint.splice(index, 1);
            };
            checkpoint = checkpoint.sort((a,b) => { return a - b });
            this.setState(
                Object.assign(ludoCreateForm, {
                    checkpoint
                })
            );
        }
    }

    handleDayPickerMouseOver(event) {
        if (!this.state.isDurationClick) {
            const { ludoCreateForm } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: Number(event.target.value),
                        checkpoint: [Number(event.target.value)]
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: Number(event.target.value)
                    })
                );
            } else {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: 3,
                        checkpoint: [3]
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentHoverValue: 3
                    })
                );
            }
        }
    }

    handleDayPickerClass(value) {
        const { ludoCreateForm, currentHoverValue, isDurationClick } = this.state;
        const { checkpoint } = ludoCreateForm;
        const index = checkpoint.indexOf(value);

        if(value <= currentHoverValue) { // before hover and now hover
            if (!isDurationClick) {
                return 'create-form-day-picker__button--duration';
            } else {
                if(index != -1) { // if exist in checkpoint array
                    return `create-form-day-picker__button--checkpoint`;
                } else {
                    return `create-form-day-picker__button--duration`;
                };
            };
        } else { // after hover
            return 'create-form-day-picker__button';
        };
    }

    handleIconChange() {
        const { ludoCreateForm } = this.state;
        const { category_id } = ludoCreateForm;
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
        }
    }

    handleIntroductionChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                introduction: event.target.value
            })
        );
    }

    handleMarblesChange(marbles) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                marbles
            })
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { isDurationClick } = this.state;
        if (isDurationClick) {
            const { ludoCreateForm } = this.state;
            let { checkpoint } = ludoCreateForm;
            checkpoint = checkpoint.sort((a, b) => { return a - b });
            setTimeout(() => {  // simulate server latency
                window.alert(`You submitted:\n\n${JSON.stringify(ludoCreateForm, null, 2)}`);
            }, 200)
        } else {
            window.alert(`You haven't select the duration`);
        }
    }

    handleTitleChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                title: event.target.value
            })
        );
    }

    handleTagsChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                tags: event.target.value
            })
        );
    }

    render() {
        const category = ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'];
        const { ludoCreateForm, isDurationClick } = this.state;
        const dayPickerButton = [];
        for(let i = 1; i <= 14; i++) {
            if (i == 7) {
                dayPickerButton.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={i}
                        onClick={this.handleDayPickerClick} 
                        onMouseOver={this.handleDayPickerMouseOver} 
                        disabled={
                            (i < 3 && !isDurationClick)
                            || (i >= ludoCreateForm.duration && isDurationClick)
                        }
                    />, <br key="br" /> 
                );
            } else {
                dayPickerButton.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={i}
                        onClick={this.handleDayPickerClick} 
                        onMouseOver={this.handleDayPickerMouseOver} 
                        disabled={
                            (i < 3 && !isDurationClick)
                            || (i >= ludoCreateForm.duration && isDurationClick)
                        }
                    />
                );
            }
        };

        return (
            <form onSubmit={this.handleSubmit} className="create-form-information">
                <div className="create-form-information-icon">
                    <img className="create-form-information-icon__img" src={this.handleIconChange()} />
                </div>
                <div className="create-form-fields">
                    <div className="create-form-field">
                        <label>Category:&nbsp;&nbsp;</label>
                        <DropdownList 
                            className="create-form-category_drop_down_list"
                            data={category}
                            onChange={this.handleCategoryChange}
                            defaultValue="lifestyle"
                        />
                    </div>
                    <div className="create-form-field">
                        <label>Marbles:&nbsp;&nbsp;</label>
                        <NumberPicker 
                            className="create-form-number_picker"
                            value={ludoCreateForm.marbles}
                            onChange={this.handleMarblesChange}
                            min={1}
                        />
                    </div>
                    <div className="create-form-day-picker">
                        <label>Duration and Checkpoint:&nbsp;&nbsp;<br /></label>
                        <input className="create-form-day-picker__button--reset-all" type="button" value="Reset all" 
                            onClick={this.handleDayPickerResetAll} />
                        <br />
                        <input className="create-form-day-picker__button--reset-duration" type="button" value="Reset Duration" 
                            onClick={this.handleDayPickerResetDuration} />
                        <br />
                        <input className="create-form-day-picker__button--reset-checkpoint" type="button" value="Reset Checkpoint" 
                            onClick={this.handleDayPickerResetCheckpoint} />
                        <br />
                        {dayPickerButton}
                        <br />
                        <label>Duration:&nbsp;&nbsp; {ludoCreateForm.duration} &nbsp;days</label>
                        <br />
                        <label>Checkpoint:&nbsp;&nbsp;</label>
                        <br />
                        <ul> 
                            <label>day&nbsp;</label>
                            {ludoCreateForm.checkpoint.map((element, index) => {
                                if (index == ludoCreateForm.checkpoint.length - 1) { // the last element of array
                                    return <li key={index} className="create-form-day-picker__check-point-list">{`${element}`}</li>;
                                } else {
                                    return <li key={index} className="create-form-day-picker__check-point-list">{`${element} ,`}</li>;
                                }
                            })}
                        </ul>
                    </div>
                    <div className="create-form-field">
                        <label>Title:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleTitleChange}/>
                    </div>
                    <div className="create-form-field">
                        <label>Introduction:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleIntroductionChange}/>
                    </div>
                    <div className="create-form-field">
                        <label>Hash Tags:&nbsp;&nbsp;<br /></label>
                        <input type="text" onChange={this.handleTagsChange}/>
                    </div>
                    <button className="create-form-submit-button" type="submit">
                        Start
                    </button>
                </div>
            </form>
        );
    }
}