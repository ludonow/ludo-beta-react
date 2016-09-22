import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import RcSlider from 'rc-slider';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import axios from '../../axios-config';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

import uploadIcon from '../../../images/active/upload-icon.png';

export default class ActivePlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isImageLightBoxOpen: false,
            isImageUploaded: false,
            isReportTextBlank: true,
            maxDuration: 14,
            maxMarbles: 50,
            reportText: '',
            uploadImageIndex: 0
        };
        this.handleDayPickerClass = this.handleDayPickerClass.bind(this);
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        // this.moveNext = this.moveNext.bind(this);
        // this.movePrev = this.movePrev.bind(this);
    }

    componentDidMount() {
        const { ludoId }= this.props.params;
        const { getCurrentLudoData } = this.props;
        getCurrentLudoData(ludoId);
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
            default:
                return `others`;
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
            default:
                return othersIcon;
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

    handleImageEnlarge() {
        const { state } = this;
        // this.setState(
        //     Object.assign(state, {
        //         isImageLightBoxOpen: true
        //     })
        // );
        this.setState({
            isImageLightBoxOpen: true
        });
    }

    handleReportTextChange(event) {
        const { state } = this;
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
        // console.log('this.state: ', this.state);
        // console.log('this.state.reportText: ', this.state.reportText);
        // console.log('this.state.isReportTextBlank: ', this.state.isReportTextBlank);
    }

    handleSubmit(event) {
        event.preventDefault();
        // TODO: Use notification confirming report 
        const isSureToReport = window.confirm(`Are you sure to report?`);
        if (isSureToReport) {
            const { ludoId }= this.props.params;
            const { currentFormValue, currentUserId } = this.props;
            let whoIsUser = '';
            (currentFormValue.starter_id == currentUserId) ? whoIsUser = 'starter_check' : whoIsUser = 'player_check'
            const ludoReportPost = {
                'ludo_id': ludoId,
                'player': whoIsUser,
                'content': this.state.reportText,
                'img_location': ''
            };
            console.log('ludoTextReportPost', ludoReportPost);
            console.log('before post report');
            axios.post('apis/report', ludoReportPost)
            .then(response => {
                if (response.data.status == '200') {
                    this.props.handleShouldProfileUpdate(true);
                    window.alert(`Report done!`);
                    console.log('Report response.data: ', response.data);
                } else {
                    console.log('Report else message from server: ', response.data.message);
                    console.log('Report else body from server: ', response.data.ludo_id);
                }
            })
            .catch(error => {
                console.log('Report error', error);
            });
        } else {
            console.log('not sure to report');
        }
    }

    onDrop(files) {
        const { state } = this;
        this.setState({
            files,
            isImageUploaded: true
        });
        const { ludoId }= this.props.params;
        const imgPost = new FormData();
        imgPost.append('file_stream', files[0]);
        // console.log('imgPost file_stream', imgPost.get('file_stream'));
        console.log('before post image');
        axios.post('/apis/report-image', imgPost)
        .then(response => {
            if (response.data.status == '200') {
                window.alert(`image upload success!`);
                console.log('image upload response.data: ', response.data);
            } else {
                console.log('image upload message from server: ', response.data.message);
                console.log('image upload error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log('image upload error', error);
        });
    }

    closeLightbox() {
        const { state } = this;
        this.setState(
            Object.assign(state, {
                isImageLightBoxOpen: false
            })
        );
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
        const { ludoDetailInformation, category, files, isReportTextBlank, isImageLightBoxOpen, isImageUploaded, maxDuration, maxMarbles, uploadImageIndex } = this.state;
        const { currentFormValue } = this.props;
        const { category_id, duration, reportText, marbles, tags, title } = currentFormValue;
        const dayPickerButtons = [];
        for(let i = 1; i <= maxDuration; i++) {
            if (i <= duration) {
                if(i == 7) {
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
            } else {
                if(i == 7) {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />, <br key="br" /> 
                    );
                } else {
                    dayPickerButtons.push(
                        <input className={`ludo-detail-information-day-picker__button`} type="button" value={i} key={`button-${i}`}
                            disabled={true}
                        />
                    );
                }
            }

        }
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="ludo-detail-information-container">
                    <div className="ludo-detail-information-top-container">
                        <div className="category-icon-container">
                            <img className="category-icon" src={this.getCategoryIcon(category_id)} />
                        </div>
                        <div className="top-right-container">
                            <div className="text-field-container">
                                <span className="text-field-label">種類:</span>
                                <span className="text-field-value">
                                    {this.getCategory(category_id)}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">標題:</span>
                                <span className="text-field-value">
                                    {title}
                                </span>
                            </div>
                            <div className="text-field-container">
                                <span className="text-field-label">#標籤:</span>
                                <span className="text-field-value">
                                    {tags}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="ludo-detail-information-bottom-container">
                        <div className="text-label">彈珠數:<span className="text-label--marble-number">{marbles}</span></div>
                        <div className="ludo-detail-information-slider--marbles">
                            <RcSlider max={maxMarbles} value={currentFormValue.marbles} disabled={true} />
                        </div>
                        <div className="text-label">持續期間:</div>
                        <div className="ludo-detail-information-day-picker">
                            {dayPickerButtons}
                        </div>
                        <div className="ludo-detail-information-slider--duration">
                            <RcSlider 
                                max={maxDuration} value={currentFormValue.duration} disabled={true}
                            />
                        </div>
                        <div className="upload-container">
                            <div className="upload-picture-button-container">
                                <span className="upload-hint-text">140字為限(#tag不在此限)</span>
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
                            <textarea 
                                className="upload-text-container"
                                // placeholder="Report here"
                                placeholder="在此輸入要回報的文字"
                                rows="6"
                                maxLength="140"
                                onChange={this.handleReportTextChange}
                            />
                        </div>
                        {
                            isImageUploaded ?
                                <div className="upload-preview">
                                    <span className="upload-preview__text">正要上傳的圖片: </span>
                                    <img className="upload-preview__image" src={files[uploadImageIndex].preview}
                                        onClick={this.handleImageEnlarge}
                                    />
                                </div>
                            : null
                        }
                        <button className="report-submit-button" type="submit" 
                            disabled={(isReportTextBlank && !isImageUploaded)}
                        >
                            回報
                        </button>
                    </div>
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
        );
    }
};