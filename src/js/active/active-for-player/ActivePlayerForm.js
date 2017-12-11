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

import introductionIcon from '../../../images/active/introduction-icon.png';
import tagIcon from '../../../images/active/tag-icon.png';
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
        this.handleCloseLightbox = this.handleCloseLightbox.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router_currentFormValue } = nextProps;
        if (router_currentFormValue && !this.state.isReportButtonClickable) {
            this.setState({
                isReportButtonClickable: true
            });
            this.getTimeLineMarks(nextProps);
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentFormValue();
    }

    getTimeLineMarks(nextProps) {
        const { state } = this;
        const currentFormValue = nextProps.router_currentFormValue;
        const { duration } = currentFormValue;

        const { timeLineMarks } = state;
        const durationTimeMarks = {};
        durationTimeMarks[duration] = duration;
        this.setState({
            timeLineMarks: durationTimeMarks
        });
    }

    handleCloseLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    handleImageDrop(files) {
        if (files.length === 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const { ludoId }= this.props.params;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            axios.post('/apis/report-image', imgPost)
            .then((response) => {
                if (response.data.status == '200') {
                    this.setState({
                        imageLocation: response.data.location
                    });
                    // TODO: shouldComponentUpdate false when successfully upload an image
                } else {
                    console.error('image upload message from server: ', response.data.message);
                    console.error('image upload error from server: ', response.data.err);
                }
            })
            .catch((error) => {
                console.error('image upload error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    handleImageEnlarge() {
        this.setState({
            isImageLightBoxOpen: true
        });
    }

    handleImageRemove(event) {
        event.preventDefault();
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
        // TODO: Use material-ui dialog confirming report
        if (this.state.reportText || this.state.isImageUploaded) {
            this.setState({
                isReportButtonClickable: false
            });
            // const isSureToReport = window.confirm('Are you sure to report?');
            const isSureToReport = window.confirm('確定要回報嗎？');
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
                    'image_location': this.state.imageLocation,
                    'tags': this.state.reportTags
                };
                axios.post('apis/report', ludoReportPost)
                .then((response) => {
                    if (response.data.status === '200') {
                        this.props.handleShouldProfileUpdate(true);
                        this.props.handleShouldReportUpdate(true);
                        this.setState({
                            files: [],
                            isImageUploaded: false,
                            reportTags: [],
                            reportText: ''
                        });
                    } else {
                        window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
                        console.error('ActivePlayerForm Report else message from server: ', response.data.message);
                        if (response.data.err) {
                            console.error('ActivePlayerForm Report else error from server: ', response.data.err);
                        }
                        this.setState({
                            isReportButtonClickable: true
                        });
                    }
                })
                .catch((error) => {
                    window.alert('回報時發生錯誤，請重試一次；若問題還是發生，請聯絡開發人員');
                    console.error('ActivePlayerForm Report error', error);
                    this.setState({
                        isReportButtonClickable: true
                    });
                });
            } else {
                this.setState({
                    isReportButtonClickable: true
                });
            }
        } else {
            window.alert('你尚未輸入回報內容或上傳圖片');
        }
    }

    handleTagsChange(reportTags) {
        this.setState({
            reportTags
        });
    }

    render() {
        const currentFormValue = this.props.router_currentFormValue;
        const { ludoDetailInformation, category, files,
            isImageLightBoxOpen, isImageUploaded, isReportButtonClickable, isReportTextBlank,
            maxDuration, maxMarbles, reportText, timeLineMarks, uploadImageIndex
        } = this.state;
        const { category_id, checkpoint, duration, introduction, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        return (
            /* components/_report-form.scss */
            <div className="form--report">
                {/* components/_ludo-detail-information.scss */}
                <form
                    className="ludo-detail-information-container report-information-container"
                    onSubmit={this.handleSubmit}
                >
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img
                                className="category-icon"
                                src={iconArray[category_id]}
                            />
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
                            {/* components/_marbles.scss */}
                            <div className="label-and-slider">
                                <div className="text-label">
                                    遊戲天數:
                                </div>
                                <div className="horizotal-slider duration">
                                    {duration}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* components/_report-form.scss */}
                    <div className="report-form-bottom-container--player">
                        <div className="introduction-and-tags--player">
                            <div className="label-and-introduction--player">
                                <div className="image-label"><img src={introductionIcon} /></div>
                                <div className="introduction--player">
                                    {introduction}
                                </div>
                                {/* components/_tags.scss */}
                                <div className="ludo-tags">
                                    <div className="tag-icon">
                                        <img src={tagIcon} />
                                    </div>
                                    {
                                        tags.length ?
                                            tags.map((tagString, index) => {
                                                return (
                                                    <span className="ludo-tag" key={`ludo-tag-${index}`}>
                                                        {tagString}
                                                    </span>
                                                );
                                            })
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="upload-container">
                            <div className="upload-content-and-tags">
                                <textarea
                                    className="upload-text-container"
                                    maxLength="300"
                                    onChange={this.handleReportTextChange}
                                    // placeholder="Report here"
                                    placeholder="分享你養成習慣的心得以及圖片吧！"
                                    rows="6"
                                    value={isReportTextBlank ? '' : this.state.reportText}
                                />
                                {/*<div className="upload-report-tags-container">
                                    <TagsInput
                                        inputProps={{maxLength: 30, placeholder:"標籤"}}
                                        onChange={this.handleTagsChange}
                                        value={this.state.reportTags}
                                    />
                                </div>*/}
                            </div>
                            <div className="upload-picture-button-container">
                                <DropZone
                                    accept={"image/*"}
                                    className="upload-picture-button"
                                    maxSize={10*1024*1024}
                                    onClick={this.handleImageDrop}
                                    onDrop={this.handleImageDrop}
                                >
                                    <img className="upload-picture-button__icon" src={uploadIcon}/>
                                </DropZone>
                            </div>
                        </div>
                    </div>
                    {
                        isImageUploaded ?
                            <div className="upload-preview">
                                <div className="upload-preview__image-container">
                                    <img
                                        className="upload-preview__image"
                                        onClick={this.handleImageEnlarge}
                                        src={files[uploadImageIndex].preview}
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
                    {/* components/_submit-button.scss */}
                    <div className="submit-button-container">
                        <button
                            className="report-submit-button report-submit-button--report"
                            disabled={isReportTextBlank && !isImageUploaded || !isReportButtonClickable}
                            type="submit"
                        >
                            發佈
                        </button>
                    </div>
                </form>
                {
                    isImageLightBoxOpen ?
                        <Lightbox
                            mainSrc={files[uploadImageIndex].preview}
                            onCloseRequest={this.handleCloseLightbox}
                        />
                    : null
                }
            </div>
        );
    }
};
