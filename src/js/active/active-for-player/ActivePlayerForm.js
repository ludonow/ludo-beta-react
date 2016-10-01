import React from 'react';
import { browserHistory } from 'react-router';
import axios from '../../axios-config';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import TagsInput from 'react-tagsinput';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

import uploadIcon from '../../../images/active/upload-icon.png';

export default class ActivePlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // category: ['others', 'lifestyle', 'read', 'exercise', 'study', 'new skill', 'unmentionalbles', 'others'],
            category: ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它'],
            files: [],
            imageLocation: '',
            isImageLightBoxOpen: false,
            isImageUploaded: false,
            isReportButtonClickable: false,
            isReportTextBlank: true,
            maxDuration: 14,
            maxMarbles: 50,
            reportTags: [],
            reportText: '',
            timeLineMarks: {},
            uploadImageIndex: 0
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        // this.moveNext = this.moveNext.bind(this);
        // this.movePrev = this.movePrev.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isReportButtonClickable) {
            this.setState({
                isReportButtonClickable: true
            });
            // console.log('componentWillReceiveProps getTimeLineMarks');   // debug
            this.getTimeLineMarks(nextProps);
        }
    }

    componentWillUnmount() {
        // console.log('ActivePlayerForm componentWillUnmount');   // debug
        this.props.clearCurrentFormValue();
    }

    getTimeLineMarks(nextProps) {
        // console.log('ActivePlayerForm getTimeLineMarks nextProps', nextProps);   // debug
        const { state } = this;
        const currentFormValue = nextProps.router_currentFormValue;
        const { checkpoint, duration } = currentFormValue;

        const { timeLineMarks } = state;
        const durationTimeMarks = {};
        for (let i = 1; i <= duration; i++) {
            if (checkpoint.indexOf(i) != -1) {
                durationTimeMarks[i] = {
                    style: {
                        color: 'white'
                    },
                    label: i
                };
            } else {
                durationTimeMarks[i] = i;
            }
            
        }
        this.setState({
            timeLineMarks: durationTimeMarks
        });
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

    handleImageEnlarge() {
        this.setState({
            isImageLightBoxOpen: true
        });
    }

    handleImageRemove(event) {
        event.preventDefault();
        // const imageIndex = Number(event.currentTarget.value);  // For multiple picture upload
        this.setState({
            files: [],
            isImageUploaded: false
        });
    }

    handleReportTextChange(event) {
        if (event.target.value) {
            this.setState({
                reportText: event.target.value,
                isReportTextBlank: false
            });
        } else {
            this.setState({
                isReportTextBlank: true
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // TODO: Use notification confirming report
        this.setState({
            isReportButtonClickable: false
        });
        const isSureToReport = window.confirm(`Are you sure to report?`);
        if (isSureToReport) {
            const { ludo_id }= this.props.params;
            const { currentUserId } = this.props;
            const currentFormValue = this.props.router_currentFormValue;
            let whoIsUser = '';
            (currentFormValue.starter_id == currentUserId) ? whoIsUser = 'starter_check' : whoIsUser = 'player_check'
            const ludoReportPost = {
                'ludo_id': ludo_id,
                'player': whoIsUser,
                'content': this.state.reportText,
                'image_location': this.state.imageLocation
            };
            // console.log('ludoTextReportPost', ludoReportPost);
            console.log('ActivePlayerForm before report post');
            axios.post('apis/report', ludoReportPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.props.handleShouldProfileUpdate(true);
                    this.props.handleShouldReportUpdate(true);
                    this.setState({
                        isImageUploaded: false,
                        reportText: ''
                    });
                    console.log('ActivePlayerForm Report after report post response.data: ', response.data);
                } else {
                    window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
                    console.log('ActivePlayerForm Report else message from server: ', response.data.message);
                    console.log('ActivePlayerForm Report else error from server: ', response.data.err);
                    this.setState({
                        isReportButtonClickable: true
                    });
                }
            })
            .catch(error => {
                window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
                console.log('ActivePlayerForm Report error', error);
                this.setState({
                    isReportButtonClickable: true
                });
            });
        } else {
            this.setState({
                isReportButtonClickable: true
            });
        }
    }

    handleTagsChange(reportTags) {
        this.setState({
            reportTags
        });
    }

    onDrop(files) {
        console.log('onDrop files', files);
        if (files.length == 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const { ludoId }= this.props.params;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            // console.log('imgPost file', imgPost.get('file'));
            console.log('before post image');
            axios.post('/apis/report-image', imgPost)
            .then(response => {
                if (response.data.status == '200') {
                    // window.alert(`image upload success!`);
                    // console.log('image upload response.data: ', response.data);
                    this.setState({
                        imageLocation: response.data.location
                    });
                    // TODO: shouldComponentUpdate false when successfully upload an image
                } else {
                    console.log('image upload message from server: ', response.data.message);
                    console.log('image upload error from server: ', response.data.err);
                }
            })
            .catch(error => {
                console.log('image upload error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    closeLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    // moveNext() {
    //     const { state } = this;
    //     this.setState(
    //         Object.assign(state, {
    //             uploadImageIndex: (state.uploadImageIndex + 1) % state.files.length
    //         })
    //     );
    // }

    // movePrev() {
    //     const { state } = this;
    //     this.setState(
    //         Object.assign(state, {
    //             uploadImageIndex: (state.uploadImageIndex + state.files.length - 1) % state.files.length
    //         })
    //     );
    // }

    render() {
        // const { currentFormValue } = this.props;
        const currentFormValue = this.props.router_currentFormValue;
        const { ludoDetailInformation, category, files, 
            isImageLightBoxOpen, isImageUploaded, isReportButtonClickable, isReportTextBlank, 
            maxDuration, maxMarbles, timeLineMarks, uploadImageIndex 
        } = this.state;
        const { category_id, checkpoint, duration, introduction, reportText, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        return (
            <div className="form--report">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container report-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={iconArray[category_id]} />
                        </div>
                        <div className="top-right-container">
                            <div className="text-field-container">
                                <span className="text-field-label">種類:</span>
                                <span className="text-field-value">
                                    {category[category_id]}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">標題:</span>
                                <span className="text-field-value">
                                    {title}
                                </span>
                            </div>
                            <div className="label-and-slider">
                                <div className="text-label">
                                    彈珠數:<span className="text-label--marble-number">{marbles}</span>
                                </div>
                                <div className="ludo-detail-information-slider--marbles">
                                    <RcSlider max={maxMarbles} value={marbles} disabled={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="report-form-bottom-container report-form-bottom-container--player">
                        <div className="introduction-and-duration">
                            <div className="label-and-introduction--player">
                                <div className="text-label">介紹:</div>
                                <div className="introduction-and-tags--player">
                                    <div className="introduction">
                                        {introduction}
                                    </div>
                                    <div className="text-field--hashtag">
                                        <div className="react-tagsinput">
                                            <span className="react-tagsinput-span">
                                                {
                                                    tags.length ?
                                                    tags.map((tagString, index) => {
                                                        return (
                                                            <span className="react-tagsinput-tag" key={`tag-${index}`}>
                                                                {tagString}
                                                            </span>
                                                        );
                                                    })
                                                    : null
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="time-line-container--player">
                                <div className="text-label">持續期間:</div>
                                <div className="report-time-line-container">
                                    <div className="report-time-line">
                                    <RcSlider className="time-line" disabled={true} vertical={true} dots included={false}
                                        max={duration} min={1} value={checkpoint} range={checkpoint.length}
                                        marks={timeLineMarks}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="upload-container">
                                <div className="upload-picture-button-container">
                                    <DropZone 
                                        className="upload-picture-button"
                                        maxSize={2000000}
                                        onDrop={this.onDrop}
                                        onClick={this.onDrop}
                                        accept={"image/png", "image/pjepg", "image/jpeg"}
                                    >
                                        <img className="upload-picture-button__icon" src={uploadIcon}/>
                                    </DropZone>
                                </div>
                                <div className="upload-content-and-tags">
                                    <textarea 
                                        className="upload-text-container"
                                        // placeholder="Report here"
                                        placeholder="輸入要回報的內容，140字為限"
                                        rows="6"
                                        maxLength="140"
                                        value={isReportTextBlank ? '' : this.state.reportText}
                                        onChange={this.handleReportTextChange}
                                    />
                                    {
                                        isImageUploaded ?
                                            <div className="upload-preview">
                                                {/* <span className="upload-preview__text">正要上傳的圖片: </span> */}
                                                <div className="upload-preview__image-container">
                                                    <img className="upload-preview__image" 
                                                        src={files[uploadImageIndex].preview}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                    <div className="upload-preview-instruction-container">
                                                        <button 
                                                            className="upload-preview-instruction__remove"
                                                            onClick={this.handleImageRemove} 
                                                            value="0"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        : null
                                    }
                                    <div className="upload-report-tags-container">
                                        <TagsInput
                                            value={this.state.reportTags} 
                                            onChange={this.handleTagsChange}
                                            inputProps={{maxLength: 30, placeholder:"標籤"}}
                                        />
                                    </div>
                                </div>
                            </div>
                    </div>
                        <button className="report-submit-button report-submit-button--report" type="submit" 
                            disabled={isReportTextBlank && !isImageUploaded && !isReportButtonClickable}
                        >
                            回報
                        </button>
                </form>
                {
                    isImageLightBoxOpen ? 
                        <Lightbox 
                            className="lighbox-target"
                            mainSrc={files[uploadImageIndex].preview}
                            // nextSrc={files.length == 1 ? null : files[(uploadImageIndex + 1) % files.length].preview}
                            // prevSrc={files.length == 1 ? null : files[(uploadImageIndex + files.length - 1) % files.length].preview}
                            onCloseRequest={this.closeLightbox}
                            // onMovePrevRequest={this.movePrev}
                            // onMoveNextRequest={this.moveNext}
                        />
                    : null
                }
            </div>
        );
    }
};
                    // {
                    //     files.length > 0 ? 
                    //         <div className="upload-instruction">
                    //             Ready to upload 
                    //             <span className="number">{files.length}</span>
                    //             image
                    //             {files.length > 1 ? <span>s</span> : null}
                    //         </div>
                    //     : null
                    // }

                            // <div className="upload-picture-button-container">
                            //     <span className="upload-hint-text">140字為限(#tag不在此限)</span>
                            //     <DropZone 
                            //         className="upload-picture-button"
                            //         maxSize={2000000}
                            //         onDrop={this.onDrop}
                            //         onClick={this.onDrop}
                            //         accept={"image/png", "image/pjepg", "image/jpeg"}
                            //     >
                            //         <img className="upload-picture-button__icon" src={uploadIcon}/>
                            //     </DropZone>
                            // </div>