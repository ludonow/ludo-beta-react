import React from 'react';
import axios from '../axios-config';
import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import Textarea from 'react-textarea-autosize';

import uploadIcon from '../../images/active/upload-icon.png';

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enlargeImageLocation: '',
            files: [],
            imageLocation: '',
            isEditingImageReportIndex: [],
            isEditingTextReportIndex: [],
            isEditReportButtonClickable: false,
            isImageLightBoxOpen: false,
            isImageUploaded: false,
            reportTextContent: '',
            playerReportList: [],
            starterReportList: [],
            whoIsUser: ''
        };
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleImageReportEditClick = this.handleImageReportEditClick.bind(this);
        this.handleImageReportEditCancelClick = this.handleImageReportEditCancelClick.bind(this);
        this.handleImageReportModifyConfirmClick = this.handleImageReportModifyConfirmClick.bind(this);
        this.handleTextReportEditClick = this.handleTextReportEditClick.bind(this);
        this.handleReportEditText = this.handleReportEditText.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('ActiveReports componentWillReceiveProps', nextProps.hasGotNewReport);  // debug
        /* 
         * classify report data by starter or player
         */
        // if(nextProps.currentLudoReportData.length != this.props.currentLudoReportData.length || !this.props.hasGotNewReport) {
        if(nextProps.hasGotNewReport) {
            const { currentUserId } = this.props;
            let whoIsUser = '';
            if (currentUserId) {
                const currentFormValue = this.props.router_currentFormValue;
                if (currentFormValue.starter_id == currentUserId) {
                    whoIsUser = 'starter';
                } else if (currentFormValue.player_id == currentUserId) {
                    whoIsUser = 'player';
                } else {
                    whoIsUser = 'bystander';
                }
            }
            // console.log('ActiveReports componentWillReceiveProps shouldReportUpdate this', this.props);   // debug
            // console.log('ActiveReports componentWillReceiveProps shouldReportUpdate next', nextProps);   // debug
            const { starterReportList, playerReportList } = this.state;
            this.setState({
                starterReportList: [],
                playerReportList: [],
                whoIsUser
            });
            // console.log('ActiveReports componentWillReceiveProps nextProps.currentLudoReportData', nextProps.currentLudoReportData);   // debug
            const newStarterReportList = nextProps.currentLudoReportData.filter(reportObject => {
                if (reportObject.user_id == nextProps.router_currentFormValue.starter_id) {
                    return true;
                } else {
                    return false;
                }
            });
            // console.log('ActiveReports componentWillReceiveProps this.state.starterReportList', this.state.starterReportList);   // debug 
            const newPlayerReportList = nextProps.currentLudoReportData.filter( (reportObject) => {
                if (reportObject.user_id == nextProps.router_currentFormValue.player_id) {
                    return true;
                } else {
                    return false;
                }
            });
            // console.log('ActiveReports componentWillReceiveProps this.state.playerReportList', this.state.playerReportList);   // debug
            this.setState({
                starterReportList: newStarterReportList,
                playerReportList: newPlayerReportList
            });
            if (!this.state.isEditReportButtonClickable) {
                this.setState({
                    isEditReportButtonClickable: true
                });
            }
            this.props.handleHasGotNewReport(false);
        }
    }

    handleImageEnlarge(event) {
        // console.log('ActiveReports handleImageEnlarge image location', event.currentTarget.src);  // debug
        this.setState({
            enlargeImageLocation: event.currentTarget.src,
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

    handleImageReportEditClick(event) {
        event.preventDefault();
        // console.log('ActiveReports handleImageReportEditClick');   // debug
        const reportIndex = Number(event.currentTarget.id.slice(-1));
        const { isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        if(!isInEditingArray) {
            isEditingImageReportIndex.push(`${SPIndex}${String(reportIndex)}`);
        }
        // console.log('ActiveReports handleTextReportEditClick isEditingImageReportIndex', isEditingImageReportIndex);
        this.setState({
            isEditingImageReportIndex
        });
    }

    handleImageReportEditCancelClick(event) {
        event.preventDefault();
        // console.log('ActiveReports handleImageReportEditCancelClick');   // debug
        const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
        // console.log('ActiveReports handleImageReportEditCancelClick reportIndex', reportIndex);   // debug
        const { isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        // console.log('ActiveReports handleImageReportEditCancelClick isInEditingArray', isInEditingArray);   // debug
        if(isInEditingArray) {
            isEditingImageReportIndex.splice(indexAtWhatPositionInArray, 1);
            this.setState({
                isEditingImageReportIndex
            });
        } else {
            console.log('report edit index error');
        }
    }

    handleImageReportModifyConfirmClick(event) {
        event.preventDefault();
        // console.log('ActiveReports handleImageReportModifyConfirmClick');   // debug
        const reportPutBody = {
            content: '',
            image_location: this.state.image_location
        };
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        const arrayIndex = Number(event.currentTarget.id.slice(-1));
        let report_id = null;
        if (SPIndex == 's') {
            // console.log('s');   // debug
            // reportPutBody.image_location = this.state.image_location;
            reportPutBody.content = this.state.starterReportList[arrayIndex].content;
            report_id = this.state.starterReportList[arrayIndex].report_id;
        } else if (SPIndex == 'p') {
            // console.log('p');   // debug
            // reportPutBody.image_location = this.state.image_location;
            reportPutBody.content = this.state.playerReportList[arrayIndex].content;
            report_id = this.state.playerReportList[arrayIndex].report_id;
        }
        // console.log('reportPutBody', reportPutBody);   // debug
        if (report_id) {
            // console.log('report_id', report_id);   // debug
            axios.put(`/apis/report/${report_id}`, reportPutBody)
            .then( response => {
                if(response.data.status === '200') {
                    // console.log('成功編輯');   // debug
                    const { isEditingImageReportIndex } = this.state;
                    const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(SPIndex + arrayIndex);
                    const isInEditingArray = (indexAtWhatPositionInArray != -1);
                    isEditingImageReportIndex.splice(indexAtWhatPositionInArray, 1);
                    this.setState({
                        files: [],
                        image_location: '',
                        isEditingImageReportIndex,
                        isImageUploaded: false,
                        reportTextContent: '',
                    });
                    this.props.handleShouldReportUpdate(true);
                } else {
                    console.log('ActiveReports handleReportEditText report put else response from server: ', response);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                }
            })
            .catch( error => {
                console.log('ActiveReports handleReportEditText report put error', error);
                window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
            });
        }
    }

    handleTextReportEditClick(event) {
        event.preventDefault();
        // console.log('ActiveReports handleTextReportEditClick id', event.currentTarget.id);   // debug
        const reportIndex = Number(event.currentTarget.id.slice(-1));
        const { isEditingTextReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingTextReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        // console.log('ActiveReports handleTextReportEditClick isInEditingArray', isInEditingArray);   // debug
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        if(!isInEditingArray) {
            isEditingTextReportIndex.push(`${SPIndex}${String(reportIndex)}`);
        }
        // console.log('ActiveReports handleTextReportEditClick isEditingTextReportIndex', isEditingTextReportIndex);
        this.setState({
            isEditingTextReportIndex
        });
    }

    handleReportEditText(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            // console.log('ActiveReports handleReportEditText');   // debug
            const reportPutBody = {
                content: this.state.reportTextContent,
                image_location: ''
            };
            const SPIndex = (event.currentTarget.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(-1));
            let report_id = null;
            if (SPIndex == 's') {
                // console.log('s');
                // reportPutBody.content = this.state.reportTextContent;
                report_id = this.state.starterReportList[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                // console.log('p');
                // reportPutBody.content = this.state.reportTextContent;
                report_id = this.state.playerReportList[arrayIndex].report_id;
            }
            // console.log('ActiveReports handleReportEditText reportPutBody', reportPutBody);   // debug
            if (report_id) {
                // console.log('report_id', report_id);
                axios.put(`/apis/report/${report_id}`, reportPutBody)
                .then( response => {
                    if(response.data.status === '200') {
                        // console.log('成功編輯');
                        this.props.handleShouldReportUpdate(true);
                    } else {
                        console.log('ActiveReports handleReportEditText report put else response from server: ', response);
                        window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                    }
                })
                .catch( error => {
                    console.log('ActiveReports handleReportEditText report put error', error);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                });
            }
            const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
            // console.log('ActiveReports handleTextReportEditClick reportIndex', reportIndex);   // debug
            const { isEditingTextReportIndex } = this.state;
            const indexAtWhatPositionInArray = isEditingTextReportIndex.indexOf(reportIndex);
            const isInEditingArray = (indexAtWhatPositionInArray != -1);
            // console.log('ActiveReports handleTextReportEditClick isInEditingArray', isInEditingArray);   // debug
            if(isInEditingArray) {
                isEditingTextReportIndex.splice(indexAtWhatPositionInArray, 1);
                this.setState({
                    isEditingTextReportIndex
                });
            } else {
                console.log('report edit index error');
            }
        }
    }

    handleReportTextChange(event) {
        this.setState({
            reportTextContent: event.currentTarget.value
        });
        // console.log('ActiveReports handleReportTextChange reportTextContent', this.state.reportTextContent);   // debug
    }

    closeLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    onDrop(files) {
        // console.log('ActiveReports onDrop files', files);
        if (files.length == 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const { ludoId }= this.props.params;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            // console.log('imgPost file', imgPost.get('file'));
            // console.log('before post image');
            axios.post('/apis/report-image', imgPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.setState({
                        image_location: response.data.location
                    });
                    // console.log('上傳圖片成功', this.state.image_location);
                } else {
                    console.log('ActiveReports onDrop response from server: ', response);
                    console.log('ActiveReports onDrop message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.log('ActiveReports onDrop error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    render() {
        const { files, 
            isEditingImageReportIndex, isEditingTextReportIndex, isEditReportButtonClickable, isImageUploaded, whoIsUser 
        } = this.state;
        return (
            <div className="report-list">
                {
                    this.state.isImageLightBoxOpen ? 
                        <Lightbox 
                            className="lighbox-target"
                            mainSrc={this.state.enlargeImageLocation}
                            // nextSrc={files.length == 1 ? null : files[(uploadImageIndex + 1) % files.length].preview}
                            // prevSrc={files.length == 1 ? null : files[(uploadImageIndex + files.length - 1) % files.length].preview}
                            onCloseRequest={this.closeLightbox}
                            // onMovePrevRequest={this.movePrev}
                            // onMoveNextRequest={this.moveNext}
                        />
                    : null
                }
                <div className="report-list-container">
                    <div className="player-container">
                        <div className="player-photo-container">
                            <div className="player-photo-container__photo">
                            </div>
                        </div>
                        {
                            this.state.starterReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`starter-report-${index}`}>
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                    {
                                                        isEditingImageReportIndex.indexOf(`s${index}`) != -1 ?
                                                        <div>
                                                            <button
                                                                disabled={!isEditReportButtonClickable}
                                                                id={`starter-image-edit-cancel-button-${index}`}
                                                                onClick={this.handleImageReportEditCancelClick}
                                                            >
                                                                取消編輯
                                                            </button>
                                                            <DropZone 
                                                                className="upload-picture-button"
                                                                maxSize={2000000}
                                                                onDrop={this.onDrop}
                                                                onClick={this.onDrop}
                                                                accept={"image/png", "image/pjepg", "image/jpeg"}
                                                            >
                                                                <img className="upload-picture-button__icon" src={uploadIcon}/>
                                                            </DropZone>
                                                            {
                                                                isImageUploaded ?
                                                                    <div className="upload-preview">
                                                                        <span className="upload-preview__text">準備變更的圖片: </span>
                                                                        <div className="upload-preview__image-container">
                                                                            <img className="upload-preview__image" 
                                                                                onClick={this.handleImageEnlarge}
                                                                                src={files[0].preview}
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
                                                                        <button
                                                                            id={`starter-image-edit-confirm-button-${index}`}
                                                                            onClick={this.handleImageReportModifyConfirmClick}
                                                                        >
                                                                            確定變更
                                                                        </button>
                                                                    </div>
                                                                : null
                                                            }
                                                        </div>
                                                        :
                                                            whoIsUser == 'starter' ?
                                                            <button
                                                                disabled={!isEditReportButtonClickable}
                                                                id={`starter-image-edit-button-${index}`}
                                                                onClick={this.handleImageReportEditClick}
                                                            >
                                                                圖片編輯
                                                            </button>
                                                            : null
                                                    }
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                isEditingTextReportIndex.indexOf(`s${index}`) != -1 ? 
                                                <Textarea 
                                                    className="report-content__text-edit"
                                                    defaultValue={reportObject.content}
                                                    id={`s-${index}`}
                                                    minRows={2}
                                                    onChange={this.handleReportTextChange}
                                                    onKeyDown={this.handleReportEditText}
                                                />
                                                :
                                                <div className="report-content-container">
                                                    {
                                                        whoIsUser == 'starter' ?
                                                        <button
                                                            disabled={!isEditReportButtonClickable}
                                                            id={`starter-text-edit-button-${index}`}
                                                            onClick={this.handleTextReportEditClick}
                                                        >
                                                            文字編輯
                                                        </button>
                                                        : null
                                                    }
                                                    <div className="report-content report-content__text">
                                                        {reportObject.content}
                                                    </div>
                                                </div>
                                            : null
                                        }
                                        <CommentBox 
                                            oldComments={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            {...this.props} 
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="report-list-container">
                    <div className="player-container">
                        <div className="player-photo-container">
                            <div className="player-photo-container__photo">
                            </div>
                        </div>
                        {
                            this.state.playerReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`player-report-${index}`}>
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                    {
                                                        isEditingImageReportIndex.indexOf(`p${index}`) != -1 ?
                                                        <div>
                                                            <button
                                                                disabled={!isEditReportButtonClickable}
                                                                id={`player-image-edit-cancel-button-${index}`}
                                                                onClick={this.handleImageReportEditCancelClick}
                                                            >
                                                                取消編輯
                                                            </button>
                                                            <DropZone 
                                                                className="upload-picture-button"
                                                                maxSize={2000000}
                                                                onDrop={this.onDrop}
                                                                onClick={this.onDrop}
                                                                accept={"image/png", "image/pjepg", "image/jpeg"}
                                                            >
                                                                <img className="upload-picture-button__icon" src={uploadIcon}/>
                                                            </DropZone>
                                                            {
                                                                isImageUploaded ?
                                                                    <div className="upload-preview">
                                                                        <span className="upload-preview__text">準備變更的圖片: </span>
                                                                        <div className="upload-preview__image-container">
                                                                            <img className="upload-preview__image" 
                                                                                onClick={this.handleImageEnlarge}
                                                                                src={files[0].preview}
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
                                                                        <button
                                                                            id={`player-image-edit-confirm-button-${index}`}
                                                                            onClick={this.handleImageReportModifyConfirmClick}
                                                                        >
                                                                            確定變更
                                                                        </button>
                                                                    </div>
                                                                : null
                                                            }
                                                        </div>
                                                        :
                                                            whoIsUser == 'player' ?
                                                            <button
                                                                disabled={!isEditReportButtonClickable}
                                                                id={`player-image-edit-button-${index}`}
                                                                onClick={this.handleImageReportEditClick}
                                                            >
                                                                圖片編輯
                                                            </button>
                                                            : null
                                                    }
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                isEditingTextReportIndex.indexOf(`p${index}`) != -1 ?
                                                <Textarea 
                                                    className="report-content__text-edit"
                                                    minRows={2}
                                                    onChange={this.handleReportTextChange}
                                                    onKeyDown={this.handleReportEditText}
                                                    defaultValue={reportObject.content}
                                                    id={`p-${index}`}
                                                />
                                                :
                                                <div className="report-content-container">
                                                    {
                                                        whoIsUser == 'player' ?
                                                        <button
                                                            disabled={!isEditReportButtonClickable}
                                                            id={`player-text-edit-button-${index}`}
                                                            onClick={this.handleTextReportEditClick}
                                                        >
                                                            文字編輯
                                                        </button>
                                                        : null
                                                    }
                                                    <div className="report-content report-content__text">
                                                        {reportObject.content}
                                                    </div>
                                                </div>
                                            : null
                                        }
                                        <CommentBox 
                                            oldComments={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            {...this.props} 
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAfterPost: false,
            newCommentList: []
        };
        this.updateNewCommentList = this.updateNewCommentList.bind(this);
        this.updateNewCommentListAfterPost = this.updateNewCommentListAfterPost.bind(this);
    }

    updateNewCommentList(commentContent) {
        const { newCommentList } = this.state;
        const commentObject = {};
        commentObject.content = commentContent
        newCommentList.push(commentObject);
        this.setState({
            newCommentList
        });
    }

    updateNewCommentListAfterPost(updatedCommentList) {
        this.setState({
            isAfterPost: true,
            newCommentList: updatedCommentList
        });
    }

    render() {
        const { isAfterPost, newCommentList } = this.state; 
        return (
            <div className="player-report-comment-box-container">
                <CommentList
                    newCommentList={newCommentList}
                    isAfterPost={isAfterPost}
                    {...this.props} 
                />
                <CommentForm 
                    updateNewCommentList={this.updateNewCommentList}
                    updateNewCommentListAfterPost={this.updateNewCommentListAfterPost}
                    {...this.props} 
                />
            </div>
        );
    }
};

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: null
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const commentContent = event.target.value;
            this.setState({
                commentContent
            });
            this.props.updateNewCommentList(commentContent);

            const commentPost = {
                'type': 'report',
                'report_id': this.props.report_id,
                'content': commentContent
            };
            // console.log('CommentForm handleCommentSubmit commentPost', commentPost);   //debug
            axios.post('/apis/comment', commentPost)
            .then(response => {
                if(response.data.status == '200') {
                    // console.log('CommentForm updateNewCommentListAfterPost');   // debug
                    this.props.updateNewCommentListAfterPost(response.data.ludo.Attributes.comments);
                } else {
                    console.log('CommentForm post message from server: ', response.data.message);
                    console.log('CommentForm post error from server: ', response.data.err);
                }
            })
            .catch(error => {
                console.log('CommentForm post error', error);
            });

            /* clear the text area of comment form */
            event.target.value = null;
            this.setState({
                commentContent: null
            });
        }
    }

    render() {
        return (
            <div className="comment-container">
                <div className="comment-avatar-container">
                    <img className="comment__avatar" 
                        src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder"
                    />
                </div>
                <Textarea className="comment__message"
                    minRows={2} onKeyDown={this.handleCommentSubmit} placeholder="留言..."
                />
            </div>
        );
    }
}

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment-list">
                {
                    this.props.oldComments && !this.props.isAfterPost? 
                    this.props.oldComments.map( (commentObject, index) => {
                        return (
                            <div className="comment-container" key={`comment-${index}`}>
                                <div className="comment-avatar-container">
                                    <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                                </div>
                                <div className="comment__message">
                                    {commentObject.content}
                                </div>
                            </div>
                        )
                    })
                    : null
                }
                {
                    this.props.newCommentList.map( (commentObject, index) => {
                        // console.log('newCommentList');   // debug
                        return (
                            <div className="comment-container" key={`new-comment-${index}`}>
                                <div className="comment-avatar-container">
                                    <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                                </div>
                                <div className="comment__message">
                                    {commentObject.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
};
                // {
                //     this.props.oldComments ? 
                //     this.props.oldComments.map( (commentObject, index) => {
                //         return (
                //             <div className="comment-container" key={`comment-${index}`}>
                //                 <div className="comment-avatar-container">
                //                     <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                //                 </div>
                //                 <div className="comment__message">
                //                     {commentObject.content}
                //                 </div>
                //             </div>
                //         );
                //     })
                //     : null
                // }
