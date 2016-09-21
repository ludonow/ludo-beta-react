import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import axios from '../axios-config';
import { browserHistory } from 'react-router';

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
                marbles: 0,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            },
            // category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            currentHoverValue: 3,
            isCategorySelected: false,
            isDurationSelected: false,
            isMarblesSelected: false,
            maxDuration: 14,
            maxMarbles: 50
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDayPickerClick = this.handleDayPickerClick.bind(this);
        this.handleDayPickerMouseOver = this.handleDayPickerMouseOver.bind(this);
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleDurationValue = this.handleDurationValue.bind(this);
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
        this.setState({
            isCategorySelected: true
        });
    }

    handleDayPickerClass(value) {
        const { ludoCreateForm, currentHoverValue, isDurationSelected } = this.state;
        const { checkpoint } = ludoCreateForm;
        const index = checkpoint.indexOf(value);

        if (index != -1) {
            return ` ludo-create-information-day-picker__button--checkpoint`;
        } else {
            return ` ludo-create-information-day-picker__button--duration`;
        };
    }

    handleDayPickerClick(event) {
        if (!this.state.isDurationSelected) { // initial
            this.setState({
                isDurationSelected: true
            });
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
        if (!this.state.isDurationSelected) {
            const { ludoCreateForm } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: Number(event.target.value),
                        checkpoint: [Number(event.target.value)]
                    })
                );
                this.setState({
                    currentHoverValue: Number(event.target.value)
                });
            } else {
                this.setState(
                    Object.assign(ludoCreateForm, {
                        duration: 3,
                        checkpoint: [3]
                    })
                );
                this.setState({
                    currentHoverValue: 3
                });
            }
        }
    }

    handleDurationValue(value) {
        const { ludoCreateForm } = this.state;
        if (value >= 4) {
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: value,
                    checkpoint: [value]
                })
            );
            this.setState({
                currentHoverValue: value
            });
        } else {
            this.setState(
                Object.assign(ludoCreateForm, {
                    duration: 3,
                    checkpoint: [3]
                })
            );
            this.setState({
                currentHoverValue: 3
            });
        }
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
        this.setState({
            isMarblesSelected: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { isCategorySelected, isDurationSelected, isMarblesSelected, ludoCreateForm } = this.state;
        if (isCategorySelected && isDurationSelected && isMarblesSelected && ludoCreateForm.title != '' && ludoCreateForm.tags != '' && ludoCreateForm.introduction != '') {
            let { checkpoint } = ludoCreateForm;
            checkpoint = checkpoint.sort((a, b) => { return a - b });
            axios.post('/apis/ludo', ludoCreateForm)
            .then(response => {
                if (response.data.status == '200') {
                    const { ludo_id } = response.data;
                    axios.get(`/apis/ludo/${ludo_id}`)
                    .then(response => {
                        if (response.data.status == '200') {
                            const { getBasicUserData, handleIsUpdatingProfile, updateCurrentFormValue } = this.props;
                            getBasicUserData();
                            handleIsUpdatingProfile(true);
                            updateCurrentFormValue(response.data.ludo);
                            browserHistory.push(`/opened-for-starter/${ludo_id}`);
                        } else {
                            console.log('get after create post message from server: ', response.data.message);
                        }
                    })
                    .catch(error => {
                        console.log('get after create post error', error);
                        console.log('message from server: ', response.data.message);
                    });
                } else {
                    console.log('create post message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.log('create post error', error);
                console.log('create post message from server: ', response.data.message);
            });
            
        } else if (!isCategorySelected) {
            window.alert(`You haven't select the category.`);
        } else if (ludoCreateForm.title == '') {
            window.alert(`You haven't fill in the title.`);
        } else if (ludoCreateForm.tags == '') {
            window.alert(`You haven't fill in the hash tags.`);
        } else if (ludoCreateForm.introduction == '') {
            window.alert(`You haven't fill in the introduction.`);
        } else if (!isMarblesSelected) {
            window.alert(`You haven't select the marble number.`);
        } else if (!isDurationSelected) {
            window.alert(`You haven't select the duration.`);
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
        const { category, currentHoverValue, ludoCreateForm, isDurationSelected, maxDuration } = this.state;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i <= currentHoverValue) {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input className={`ludo-create-information-day-picker__button${this.handleDayPickerClass(i)}`} type="button" value={i} key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= ludoCreateForm.duration && isDurationSelected)
                            }
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input className={`ludo-create-information-day-picker__button${this.handleDayPickerClass(i)}`} type="button" value={i} key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= ludoCreateForm.duration && isDurationSelected)
                            }
                        />
                    );
                }
            } else {
                if (i == 7) {
                    dayPickerButtons.push(
                        <input className={`ludo-create-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= ludoCreateForm.duration && isDurationSelected)
                            }
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input className={`ludo-create-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            onClick={this.handleDayPickerClick} 
                            onMouseOver={this.handleDayPickerMouseOver} 
                            disabled={
                                (i < 3 && !isDurationSelected)
                                || (i >= ludoCreateForm.duration && isDurationSelected)
                            }
                        />
                    );
                }
            }
        }
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="ludo-create-information-container">
                    <div className="ludo-create-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.handleIconChange()} />
                        </div>
                        <div className="top-right-container">
                            <div className="dropdown-list-container">
                                <span className="category-label">種類:</span>
                                <DropdownList 
                                    className="dropdown-list"
                                    data={category}
                                    onChange={this.handleCategoryChange}
                                    // defaultValue={'select a category'}
                                    defaultValue={'選擇一個種類'}
                                />
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">標題:</span>
                                <input className="text-field" type="text"
                                    // placeholder="Title"
                                    placeholder="輸入想要的標題"
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">#標籤:</span>
                                <input className="text-field" type="text"
                                    // placeholder="#hashtag"
                                    placeholder="輸入想要的#標籤"
                                    onChange={this.handleTagsChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ludo-create-information-bottom-container">
                        <div className="text-label">
                            彈珠數:<span className="text-label--marble-number">{ludoCreateForm.marbles}</span>
                        </div>
                        <div className="ludo-create-information-slider--marbles">
                            <RcSlider max={50} min={1} 
                                value={ludoCreateForm.marbles}
                                onChange={this.handleMarblesChange}
                            />
                        </div>
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-create-information-day-picker">
                            {dayPickerButtons}
                            <div className="ludo-create-information-slider--duration">
                                <RcSlider 
                                    max={maxDuration} min={3} 
                                    defaultValue={3} value={ludoCreateForm.duration}
                                    onChange={this.handleDurationValue}
                                />
                            </div>
                        </div>
                        <div className="text-label">介紹:</div>
                        <div className="text-field-container">
                            <textarea 
                                className="text-field--introduction" 
                                // placeholder="Introduction" 
                                placeholder="詳細的說明(最多140字)"
                                onChange={this.handleIntroductionChange}
                                maxLength="140"
                            />
                        </div>
                        <button className="ludo-create-information-submit-button" type="submit">
                            開始
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};