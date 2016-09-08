import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import axios from 'axios';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

import uploadIcon from '../../images/active/upload-icon.png';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://ludotest.rzbyc5phqb.ap-southeast-1.elasticbeanstalk.com";

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
            isImageLightBoxOpen: false,
            isImageUploaded: false,
            isIntroductionBlank: true,
            maxDuration: 14,
            maxMarbles: 50,
            files: [],
            uploadImageIndex: 0
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleIconChange = this.handleIconChange.bind(this);
        this.handleIntroductionChange = this.handleIntroductionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.movePrev = this.movePrev.bind(this);
    }

    handleDayPickerClass(value) {
        const { ludoDetailInformation } = this.state;
        const { checkpoint } = ludoDetailInformation;
        const index = checkpoint.indexOf(value);

        if (index != -1) {
            return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--checkpoint`;
        } else {
            return `ludo-detail-information-day-picker__button ludo-detail-information-day-picker__button--duration`;
        };
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
        if (event.target.value) {
            const { ludoDetailInformation } = this.state;
            this.setState(
                Object.assign(ludoDetailInformation, {
                    introduction: event.target.value,
                    isIntroductionBlank: false
                })
            );
        } else {
            const { ludoDetailInformation } = this.state;
            this.setState(
                Object.assign(ludoDetailInformation, {
                    isIntroductionBlank: true
                })
            );
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const isConfirmReport = window.confirm(`Are you sure to report?`);
        if (isConfirmReport) {
            const { ludoDetailInformation } = this.state;
            const { introduction } = ludoDetailInformation;
            axios.post('/apis/ludo', ludoDetailInformation)
            .then(function (response) {
                if (response.data.status != 'err') {
                    window.alert(`Sucessfully Report`);
                } else {
                    console.log('response', response.data.status);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
        }
    }

    onDrop(files) {
        console.log('Received files: ', files);
        const state = this.state;
        this.setState(
            Object.assign(state, {
                files,
                isImageUploaded: true,
                isImageLightBoxOpen: true
            })
        );
    }

    closeLightbox() {
        const state = this.state;
        this.setState(
            Object.assign(state, {
                isImageLightBoxOpen: false
            })
        );
    }

    moveNext() {
        const state = this.state;
        this.setState(
            Object.assign(state, {
                uploadImageIndex: (state.uploadImageIndex + 1) % state.files.length
            })
        );
    }

    movePrev() {
        const state = this.state;
        this.setState(
            Object.assign(state, {
                uploadImageIndex: (state.uploadImageIndex + state.files.length - 1) % state.files.length
            })
        );
    }

    render() {
        const { ludoDetailInformation, category, files, isIntroductionBlank, isImageLightBoxOpen, isImageUploaded, maxDuration } = this.state;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i == 7) {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        disabled={i >= ludoDetailInformation.duration}
                    />, <br key="br" /> 
                );
            } else {
                dayPickerButtons.push(
                    <input className={this.handleDayPickerClass(i)} type="button" value={i} key={`button-${i}`}
                        disabled={i >= ludoDetailInformation.duration}
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
                                    defaultValue="lifestyle"
                                    disabled={true}
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   Title" 
                                />
                            </div>
                            <div className="ludo-detail-information-fields__field ludo-detail-information-fields__field--text-field">
                                <input className="ludo-detail-information-field__text-field" type="text" placeholder="   #hashtag" 
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
                            <DropZone onDrop={this.onDrop}
                                className="ludo-detail-information-upload-picture-button"
                            >
                                <img className="ludo-detail-information-upload-picture-button__icon" src={uploadIcon}/>
                            </DropZone>
                        </div>
                        <button className="ludo-detail-information-submit-button" type="submit" 
                            disabled={(isIntroductionBlank && !isImageUploaded)
                                || isImageLightBoxOpen }
                            >
                            Report
                        </button>
                    </div>
                </form>
                {
                    isImageLightBoxOpen > 0 ? 
                        <Lightbox 
                            className="lighbox-target"
                            mainSrc={files[this.state.uploadImageIndex].preview}
                            nextSrc={files[(this.state.uploadImageIndex + 1) % files.length].preview}
                            prevSrc={files[(this.state.uploadImageIndex + files.length - 1) % files.length].preview}

                            onCloseRequest={this.closeLightbox}
                            onMovePrevRequest={this.movePrev}
                            onMoveNextRequest={this.moveNext}
                        />
                    : null
                }
            </div>
        );
    }
};