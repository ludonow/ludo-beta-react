import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../axios-config';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
// import { WithContext as ReactTags } from 'react-tag-input';
import TagsInput from 'react-tagsinput';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class LudoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoEditForm: {
                category_id: 0,
                checkpoint: [3],
                duration: 3,
                introduction: '',
                marbles: 0,
                stage: 1,
                tags: [],
                title: ''
            },
            // category: [lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            currentHoverValue: 3,
            hasUserChangeTheForm: false,
            isDurationSelected: true,
            isModifyButtonClickable: false,
            maxDuration: 14,
            maxLengthOfIntroduction: 140,
            maxMarbles: 50
        };
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleDayPickerClick = this.handleDayPickerClick.bind(this);
        this.handleDayPickerMouseOver = this.handleDayPickerMouseOver.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleDurationValue = this.handleDurationValue.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleMarblesChange = this.handleMarblesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isModifyButtonClickable) {
            const { category_id, checkpoint, duration, introduction, marbles, stage, tags, title } = router_currentFormValue;
            this.setState({
                isModifyButtonClickable: true,
                ludoEditForm: {
                    ...this.state.ludoEditForm, 
                    category_id,
                    checkpoint,
                    duration,
                    introduction,
                    marbles,
                    stage,
                    tags,
                    title
                }
            });
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFormValue();
    }

    handleCancelClick(event) {
        event.preventDefault();
        if (this.state.hasUserChangeTheForm) {
            // const isSureNotToModify = window.confirm(`Are you sure to cancel the modification?`);
            const isSureNotToModify = window.confirm('確定放棄變更？');
            if (isSureNotToModify) {
                browserHistory.push(`/ludo/${this.props.params.ludo_id}`);
            }
        } else {
            browserHistory.push(`/ludo/${this.props.params.ludo_id}`);
        }
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.state.ludoEditForm;
        const index = checkpoint.indexOf(value);
        if (index != -1) {
            return ' ludo-create-information-day-picker__button--checkpoint';
        } else {
            return ' ludo-create-information-day-picker__button--duration';
        };
    }

    handleDayPickerClick(event) {
        event.preventDefault();
        this.setState({
            hasUserChangeTheForm: true
        });
        if (!this.state.isDurationSelected) { /* the user has not selected the duration */
            this.setState({
                isDurationSelected: true,
                ludoEditForm: {
                    ...this.state.ludoEditForm,
                    duration: Number(event.target.value)
                }
            });
        } else { /* the user has selected the duration */
            const { ludoEditForm } = this.state;
            let { checkpoint } = ludoEditForm;
            const checkPointNumber = Number(event.target.value);
            const index = checkpoint.indexOf(checkPointNumber);
            if (index === -1) { /* selected day is not in array */
                checkpoint.push(checkPointNumber);
            } else { /* selected day is in array */
                checkpoint.splice(index, 1);
            };
            this.setState({
                ludoEditForm: {
                    ...this.state.ludoEditForm,
                    checkpoint
                }
            });
        }
    }

    handleDayPickerMouseOver(event) {
        if (!this.state.isDurationSelected) {
            const { ludoEditForm } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState({
                    currentHoverValue: Number(event.target.value),
                    ludoEditForm: {
                        ...this.state.ludoEditForm,
                        duration: currentSliderValue,
                        checkpoint: [currentSliderValue]
                    }
                });
            } else {
                this.setState({
                    currentHoverValue: 3,
                    ludoEditForm: {
                        ...this.state.ludoEditForm,
                        duration: currentSliderValue,
                        checkpoint: [currentSliderValue]
                    }
                });
            }
        }
    }

    handleDurationValue(currentSliderValue) {
        const { ludoEditForm } = this.state;
        this.setState({
            hasUserChangeTheForm: true,
            isDurationSelected: false
        });
        if (currentSliderValue >= 4) {
            this.setState({
                currentHoverValue: currentSliderValue,
                ludoEditForm: {
                    ...this.state.ludoEditForm,
                    duration: currentSliderValue,
                    checkpoint: [currentSliderValue]
                }
            });
        } else {
            this.setState({
                currentHoverValue: 3,
                ludoEditForm: {
                    ...this.state.ludoEditForm,
                    duration: 3,
                    checkpoint: [3]
                }
            });
        }
    }

    handleIntroductionChange(event) {
        event.preventDefault();
        this.setState({
            hasUserChangeTheForm: true,
            ludoEditForm: {
                ...this.state.ludoEditForm,
                introduction: event.target.value
            }
        });
        if (this.state.ludoEditForm.introduction.match(/[\u3400-\u9FBF]/) ) {   /* there is chinese character in introduction */
            this.setState({
                maxLengthOfIntroduction: 140
            });
        } else {
            this.setState({
                maxLengthOfIntroduction: 140*3
            });
        }
    }

    handleMarblesChange(marbles) {
        this.setState({
            hasUserChangeTheForm: true,
            isMarblesSelected: true,
            ludoEditForm: {
                ...this.state.ludoEditForm, 
                marbles
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isModifyButtonClickable: false
        });
        const modifyLudoPutBody = {
            ...this.state.ludoEditForm,
            'type': 'modify'
        };
        // const isSureToModify = window.confirm(`Are you sure to modify this ludo?`);
        const isSureToModify = window.confirm(`確定要修改Ludo內容？`);
        if (isSureToModify) {
            const { ludo_id } = this.props.params;
            axios.put(`/apis/ludo/${ludo_id}`, modifyLudoPutBody)
            .then((response) => {
                if (response.data.status === '200') {
                    this.props.handleShouldUserBasicDataUpdate(true);
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else {
                    this.setState({
                        isModifyButtonClickable: true
                    });
                    window.alert('修改Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('modify put response from server: ', response);
                    console.error('modify put message from server: ', response.data.message);
                }
            })
            .catch((error) => {
                this.setState({
                    isModifyButtonClickable: true
                });
                window.alert('修改Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('modify put error: ', error);
            });
        } else {
            this.setState({
                isModifyButtonClickable: true
            });
        }
    }

    handleTitleChange(event) {
         this.setState({
            hasUserChangeTheForm: true,
            ludoEditForm: {
                ...this.state.ludoEditForm,
                title: event.target.value
            }
        });
    }

    handleTitleMaxLength() {
        const { title } = this.state.ludoEditForm;
        let length = 0;
        if (title.match(/[\u3400-\u9FBF]/) ) {   /* there is chinese character in title */
            length = 19;
        } else {
            length = 60;
        }
        return length;
    }

    handleTagsChange(tags) {
        this.setState({
            hasUserChangeTheForm: true,
            ludoEditForm: {
                ...this.state.ludoEditForm,
                tags
            }
        });
    }

    // handleDelete(i) {
    //     let tags = this.state.tags;
    //     tags.splice(i, 1);
    //     this.setState({tags: tags});
    // }

    // handleAddition(tag) {
    //     let tags = this.state.tags;
    //     tags.push({
    //         id: tags.length + 1,
    //         text: tag
    //     });
    //     this.setState({tags: tags});
    // }

    // handleDrag(tag, currPos, newPos) {
    //     let tags = this.state.tags;

    //     // mutate array
    //     tags.splice(currPos, 1);
    //     tags.splice(newPos, 0, tag);

    //     // re-render
    //     this.setState({ tags: tags });
    // }

    render() {
        const { category_id, duration, introduction, marbles, tags, title } = ludoEditForm;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (isDurationSelected && i <= duration 
                || !isDurationSelected && i <= currentHoverValue) {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input
                            className={`ludo-create-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= duration && isDurationSelected)
                            }
                            key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            type="button"
                            value={i}
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className={`ludo-create-information-day-picker__button${this.handleDayPickerClass(i)}`}
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= duration && isDurationSelected)
                            }
                            key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            type="button"
                            value={i}
                        />
                    );
                }
            } else {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input
                            className="ludo-create-information-day-picker__button"
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= duration && isDurationSelected)
                            }
                            key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            type="button"
                            value={i}
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input
                            className="ludo-create-information-day-picker__button"
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= duration && isDurationSelected)
                            }
                            key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            type="button"
                            value={i}
                        />
                    );
                }
            }
        }
        return (
            <form onSubmit={this.handleSubmit} className="ludo-create-information-container">
                <div className="ludo-detail-information-top-container">
                    <div className="category-icon-container">
                        <img className="category-icon" src={iconArray[category_id]} />
                    </div>
                    <div className="top-right-container">
                        <div className="text-field-container">
                            <span className="text-field-label">種類:</span>
                            <span className="text-field-value">
                                {category[category_id - 1]}
                            </span>
                        </div>
                        <div className="text-field-container">
                            <span className="text-field-label">標題:</span>
                            <input className="text-field" type="text"
                                value={ludoEditForm.title}
                                maxLength={this.handleTitleMaxLength()}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className="label-and-slider">
                            <div className="text-label">
                                <div>
                                    彈珠數:
                                    <span className="text-label--marble-number">{ludoEditForm.marbles}</span>
                                </div>
                            </div>
                            <div className="ludo-create-information-slider--marbles">
                                <RcSlider max={maxMarbles} min={1} 
                                    value={ludoEditForm.marbles}
                                    onChange={this.handleMarblesChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ludo-create-information-bottom-container">
                    <div className="text-label">
                        {isDurationSelected ? '選擇進度回報日' : '選擇持續期間:'}
                    </div>
                    <div className="ludo-create-information-day-picker">
                        {dayPickerButtons}
                        <div className="ludo-create-information-slider--duration">
                            <RcSlider 
                                max={maxDuration}
                                min={3}
                                value={ludoEditForm.duration}
                                onChange={this.handleDurationValue}
                            />
                        </div>
                    </div>
                    <div className="text-label">介紹:</div>
                    <div className="text-field-container text-field-container--introduction">
                        <textarea 
                            className="text-field--introduction" 
                            maxLength={maxLengthOfIntroduction}
                            onChange={this.handleIntroductionChange}
                            value={ludoEditForm.introduction}
                        />
                        <div className="text-field--hashtag">
                            <TagsInput
                                value={ludoEditForm.tags} 
                                onChange={this.handleTagsChange}
                                inputProps={{maxLength: 30, placeholder:"標籤"}}
                            />
                        </div>
                    </div>
                    <button 
                        className="ludo-modify-information-submit-button" 
                        type="submit" 
                        disabled={!this.state.isModifyButtonClickable}
                    >
                        確定變更
                    </button>
                    <button 
                        className="ludo-modify-information-submit-button--cancel" 
                        onClick={this.handleCancelClick}
                        disabled={!this.state.isModifyButtonClickable}
                    >
                        取消變更
                    </button>
                </div>
            </form>
        );
    }
};