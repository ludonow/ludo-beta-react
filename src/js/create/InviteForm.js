import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../axios-config';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import TagsInput from 'react-tagsinput';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

export default class InviteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoCreateForm: {
                category_id: 0,
                marbles: 0,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: []
            },
            // category: [lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            currentHoverValue: 3,
            hashtags: [],
            isCategorySelected: false,
            isDurationSelected: false,
            isMarblesSelected: false,
            isSuccesfullyCreateLudo: false,
            maxDuration: 14,
            maxLengthOfIntroduction: 140,
            maxMarbles: 50,
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
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

    handleCategoryChange(selectedCategory) {
        const { category } = this.state;
        const index = category.indexOf(selectedCategory) + 1;
        this.setState({
            isCategorySelected: true,
            ludoCreateForm: Object.assign(this.state.ludoCreateForm, {
                category_id: index
            })
        });
    }

    handleDayPickerClass(value) {
        const { checkpoint } = this.state.ludoCreateForm;
        const index = checkpoint.indexOf(value);

        if (index != -1) {
            return ` ludo-create-information-day-picker__button--checkpoint`;
        } else {
            return ` ludo-create-information-day-picker__button--duration`;
        };
    }

    handleDayPickerClick(event) {
        if (!this.state.isDurationSelected) { /* the user has not selected the duration */
            this.setState({
                isDurationSelected: true,
                ludoCreateForm: Object.assign(this.state.ludoCreateForm, {
                    duration: Number(event.target.value)
                })
            });
        } else { /* the user has selected the duration */
            const { ludoCreateForm } = this.state;
            let { checkpoint } = ludoCreateForm;
            const checkPointNumber = Number(event.target.value);
            const index = checkpoint.indexOf(checkPointNumber);
            if (index === -1) { /* selected day is not in array */
                checkpoint.push(checkPointNumber);
            } else { /* selected day is in array */
                checkpoint.splice(index, 1);
            };
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
                this.setState({
                    currentHoverValue: Number(event.target.value),
                    ludoCreateForm: Object.assign(ludoCreateForm, {
                        duration: Number(event.target.value),
                        checkpoint: [Number(event.target.value)]
                    })
                });
            } else {
                this.setState({
                    currentHoverValue: 3,
                    ludoCreateForm: Object.assign(ludoCreateForm, {
                        duration: 3,
                        checkpoint: [3]
                    })
                });
            }
        }
    }

    handleDurationValue(currentSliderValue) {
        const { ludoCreateForm } = this.state;
        this.setState({
            isDurationSelected: false
        });
        if (currentSliderValue >= 4) {
            this.setState({
                currentHoverValue: currentSliderValue,
                ludoCreateForm: Object.assign(ludoCreateForm, {
                    duration: currentSliderValue,
                    checkpoint: [currentSliderValue]
                })
            });
        } else {
            this.setState({
                currentHoverValue: 3,
                ludoCreateForm: Object.assign(ludoCreateForm, {
                    duration: 3,
                    checkpoint: [3]
                })
            });
        }
    }

    handleIconChange() {
        const { category_id } = this.state.ludoCreateForm;
        return iconArray[category_id];
    }

    handleIntroductionChange(event) {
        this.setState({
            ludoCreateForm: Object.assign(this.state.ludoCreateForm, {
                introduction: event.target.value
            })
        });
        if (this.state.ludoCreateForm.introduction.match(/[\u3400-\u9FBF]/) ) {   /* there is chinese character in introduction */
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
            isMarblesSelected: true,
            ludoCreateForm: Object.assign(this.state.ludoCreateForm, {
                marbles
            })
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { isCategorySelected, isDurationSelected, isMarblesSelected, ludoCreateForm } = this.state;
        
        const ludoInvitationPost = {
            ...ludoCreateForm,
            type: 'invite',
            friend_id: this.props.params.friend_id, 
            message: 'test'
        };
        console.log('ludoInvitationPost', ludoInvitationPost);

        // if (isCategorySelected && isDurationSelected && isMarblesSelected && ludoCreateForm.title !== '' && ludoCreateForm.tags.length !== 0 && ludoCreateForm.introduction !== '') {
        //     let { checkpoint } = ludoCreateForm;
        //     checkpoint = checkpoint.sort((a, b) => { return a - b });

        //     axios.post('/apis/ludo', ludoCreateForm)
        //     .then((response) => {
        //         if (response.data.status === '200') {
        //             this.setState({
        //                 isSuccesfullyCreateLudo: true
        //             });
        //             const { ludo_id } = response.data;
        //             /* get ludo information after create ludo post */
        //             axios.get(`/apis/ludo/${ludo_id}`)
        //             .then((response) => {
        //                 if (response.data.status === '200') {
        //                     const { getUserBasicData, handleShouldProfileUpdate, updateCurrentFormValue } = this.props;
        //                     getUserBasicData();
        //                     handleShouldProfileUpdate(true);
        //                     updateCurrentFormValue(response.data.ludo);
        //                     browserHistory.push(`/ludo/${ludo_id}`);
        //                 } else {
        //                     window.alert('取得Ludo資訊時發生錯誤，請重新整理一次；若問題還是發生，請聯絡開發團隊');
        //                     console.error('get after create post response from server: ', response);
        //                     console.error('get after create post message from server: ', response.data.message);
        //                 }
        //             })
        //             .catch((error) => {
        //                 window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        //                 console.error('get after create post error', error);
        //             });
        //         } else {
        //             window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        //             console.error('create post message from server: ', response.data.message);
        //         }
        //     })
        //     .catch((error) => {
        //         window.alert('建立Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
        //         console.error('create post error', error);
        //     });
            
        // } else if (!isCategorySelected) {
        //     // window.alert('You haven\'t select the category.');
        //     window.alert('尚未選擇種類！');
        // } else if (ludoCreateForm.title === '') {
        //     // window.alert('You haven\'t fill in the title.');
        //     window.alert('尚未輸入標題！');
        // } else if (!isMarblesSelected) {
        //     // window.alert('You haven\'t select the marble number.');
        //     window.alert('尚未選擇彈珠數！');
        // } else if (!isDurationSelected) {
        //     // window.alert('You haven\'t select the duration.');
        //     window.alert('尚未選擇持續天數！');
        // } else if (ludoCreateForm.introduction === '') {
        //     // window.alert('You haven\'t fill in the introduction.');
        //     window.alert('尚未輸入介紹文字！');
        // } else if (ludoCreateForm.tags.length === 0) {
        //     // window.alert('You haven\'t fill in the hash tags.');
        //     window.alert('尚未輸入#標籤！');
        // }
    }

    handleTitleChange(event) {
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                title: event.target.value
            })
        );
    }

    handleTitleMaxLength() {
        const { title } = this.state.ludoCreateForm;
        let length = 0;
        if (title.match(/[\u3400-\u9FBF]/) ) {   /* there is chinese character in title */
            length = 19;
        } else {
            length = 60;
        }
        return length;
    }

    handleTagsChange(tags) {
        /* Add # symbol in tag field */
        const hashtags = tags.map((currentTag, index) => {
            if (currentTag.indexOf('#') !== 0) {
                currentTag = `#${currentTag}`;
            } else {
                currentTag = currentTag;
            }
            return currentTag;
        });
        this.setState({hashtags});

        /* Tags information for database */
        const { ludoCreateForm } = this.state;
        this.setState(
            Object.assign(ludoCreateForm, {
                tags
            })
        );
    }

    render() {
        const { category, currentHoverValue, ludoCreateForm, isDurationSelected, maxDuration, maxLengthOfIntroduction, maxMarbles } = this.state;
        const { hashtags, suggestions } = this.state;
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
            /* components/_ludo-create-information.scss */
            <form
                className="ludo-create-information-container"
                onSubmit={this.handleSubmit}
            >
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
                                // defaultValue={'select a category'}
                                defaultValue={'選擇一個種類'}
                                onChange={this.handleCategoryChange}
                            />
                        </div>
                        <div className="text-field-container">
                            <span className="text-field-label">標題:</span>
                            <input className="text-field" type="text"
                                // placeholder="Title"
                                placeholder="輸入想要的標題"
                                maxLength={this.handleTitleMaxLength()}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        {/* components/_marbles.scss */}
                        <div className="label-and-slider">
                            <div className="text-label">
                                {
                                    this.state.isMarblesSelected ? 
                                        <div>
                                            彈珠數:
                                            <span className="text-label--marble-number">{ludoCreateForm.marbles}</span>
                                        </div>
                                    : `選擇彈珠數` 
                                }
                            </div>
                            <div className="ludo-create-information-slider--marbles">
                                <RcSlider max={maxMarbles} min={1} 
                                    value={ludoCreateForm.marbles}
                                    onChange={this.handleMarblesChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ludo-create-information-bottom-container">
                    <div className="text-label">
                        {
                            isDurationSelected ? '選擇進度回報日' : '選擇持續期間:'
                        }
                    </div>
                    <div className="ludo-create-information-day-picker">
                        {dayPickerButtons}
                        <div className="ludo-create-information-slider--duration">
                            <RcSlider 
                                defaultValue={ludoCreateForm.duration}
                                max={maxDuration}
                                min={3} 
                                onChange={this.handleDurationValue}
                                value={ludoCreateForm.duration}
                            />
                        </div>
                    </div>
                    <div className="text-label">介紹:</div>
                    <div className="text-field-container text-field-container--introduction">
                        <textarea 
                            className="text-field--introduction" 
                            // placeholder="Introduction" 
                            placeholder={`詳細的說明(中文最多140字)`}
                            onChange={this.handleIntroductionChange}
                            maxLength={maxLengthOfIntroduction}
                        />
                        <div className="text-field--hashtag">
                            <TagsInput
                                inputProps={{maxLength: 30, placeholder:"#標籤"}}
                                onChange={this.handleTagsChange}
                                value={hashtags}
                            />
                        </div>
                    </div>
                    {/* components/_submit-button.scss */}
                    <button 
                        className="ludo-create-information-submit-button" 
                        disabled={this.state.isSuccesfullyCreateLudo}
                        type="submit" 
                    >
                        邀請
                    </button>
                </div>
            </form>
        );
    }
}