import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import DropZone from 'react-dropzone';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

export default class ActiveFormOfPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoDetailInformation: {
                category_id: 1,
                marbles: 1,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            },
            category: ['lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            currentHoverValue: 3,
            durationMarks: {},
            isDurationClick: false,
            marblesMarks: {},
            maxDuration: 14,
            maxMarbles: 50,
            files: null
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
        const { ludoDetailInformation } = this.state;
        this.setState(
            Object.assign(ludoDetailInformation, {
                category_id
            })
        );
    }

    handleDayPickerClass(value) {
        const { ludoDetailInformation, currentHoverValue, isDurationClick } = this.state;
        const { checkpoint } = ludoDetailInformation;
        const index = checkpoint.indexOf(value);

        if(value <= currentHoverValue) { // before hover and now hover
            if (index != -1) {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--checkpoint`;
            } else {
                return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--duration`;
            };
        } else { // after hover
            return `ludo-detail-information-day-picker__button`;
        };
    }

    handleDayPickerClick(event) {
        if (!this.state.isDurationClick) { // initial
            this.setState(
                Object.assign(this.state, {
                    isDurationClick: true
                })
            );
            const { ludoDetailInformation } = this.state;
            this.setState(
                Object.assign(ludoDetailInformation, {
                    duration: Number(event.target.value)
                })
            );
        } else { // finish duration setting
            const { ludoDetailInformation } = this.state;
            let { checkpoint } = ludoDetailInformation;
            const checkPointNumber = Number(event.target.value);
            const index = checkpoint.indexOf(checkPointNumber);
            if (index === -1) { // element not in array
                checkpoint.push(checkPointNumber);
            } else { // element is in array
                checkpoint.splice(index, 1);
            };
            checkpoint = checkpoint.sort((a,b) => { return a - b });
            this.setState(
                Object.assign(ludoDetailInformation, {
                    checkpoint
                })
            );
        }
    }

    handleDayPickerMouseOver(event) {
        if (!this.state.isDurationClick) {
            const { ludoDetailInformation } = this.state;
            if (Number(event.target.value) >= 4) {
                this.setState(
                    Object.assign(ludoDetailInformation, {
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
                    Object.assign(ludoDetailInformation, {
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

    handleDurationValue(value) {
        const { ludoDetailInformation } = this.state;
        if (value >= 4) {
            this.setState(
                Object.assign(ludoDetailInformation, {
                    duration: value,
                    checkpoint: [value]
                })
            );
            this.setState(
                Object.assign(this.state, {
                    currentHoverValue: value
                })
            );
        } else {
            this.setState(
                Object.assign(ludoDetailInformation, {
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

    handleIconChange() {
        const { ludoDetailInformation } = this.state;
        const { category_id } = ludoDetailInformation;
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
        const { ludoDetailInformation } = this.state;
        this.setState(
            Object.assign(ludoDetailInformation, {
                introduction: event.target.value
            })
        );
    }

    handleMarblesChange(marbles) {
        const { ludoDetailInformation } = this.state;
        this.setState(
            Object.assign(ludoDetailInformation, {
                marbles
            })
        );
    }

    handlePictureUpload(files) {
        console.log('Received files: ', files);
        const { state } = this.state;
        this.setState(
            Object.assign({
                files
            })
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const { ludoDetailInformation } = this.state;
        const { introduction } = ludoDetailInformation;
        // axios.post(url + '/apis/ludo', JSON.stringify(ludoDetailInformation, null, 2))
        // .then(function (response) {
        //     console.log('response', response.data.status);
        // })
        // .catch(function (error) {
        //     console.log('error', error);
        // });

        setTimeout(() => {  // simulate server latency
            window.alert(`Report ${introduction}`);
        }, 200)
    }

    handleTitleChange(event) {
        const { ludoDetailInformation } = this.state;
        this.setState(
            Object.assign(ludoDetailInformation, {
                title: event.target.value
            })
        );
    }

    handleTagsChange(event) {
        const { ludoDetailInformation } = this.state;
        this.setState(
            Object.assign(ludoDetailInformation, {
                tags: event.target.value
            })
        );
    }

    render() {
        const { ludoDetailInformation, category, files, isDurationClick, maxDuration } = this.state;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i == 7) {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        onClick={this.handleDayPickerClick} 
                        onMouseOver={this.handleDayPickerMouseOver} 
                        disabled={
                            (i < 3 && !isDurationClick)
                            || (i >= ludoDetailInformation.duration && isDurationClick)
                        }
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

            <div className="grid-item--ludo-detail-information">
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
                                    value={ludoDetailInformation.marbles}
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
                                max={maxDuration}
                                value={ludoDetailInformation.duration}
                            />
                        </div>
                        <div className="ludo-detail-information-field">
                            <textarea 
                                className="ludo-detail-information-field__text-field ludo-detail-information-field__text-field--introduction" 
                                placeholder="Report here" 
                                onChange={this.handleIntroductionChange}
                            />
                            <DropZone onDrop={this.handlePictureUpload}
                                className="ludo-detail-information-upload-picture-button"
                            >
                                Pic
                            </DropZone>
                        </div>
                        {
                            this.state.files ? 
                            <div>
                                <h2>Uploading {files.length} files...</h2>
                                <div>this.state.files.map((file) => <img src={file.preview} />)</div>
                            </div> 
                            : null
                        }
                        <button className="ludo-detail-information-submit-button" type="submit">
                            Report
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};