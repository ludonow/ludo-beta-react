import React from 'react';
import axios from '../axios-config';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import Textarea from 'react-textarea-autosize';

import CommentBox from './CommentBox';
import DenounceBox from '../app/DenounceBox';
import ReportEditButton from './ReportEditButton';
import ReportExpandMoreButton from './ReportExpandMoreButton';

import uploadIcon from '../../images/active/upload-icon.png';

injectTapEventPlugin();

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTargetId: '',
            enlargeImageLocation: '',
            files: [],
            imageLocation: '',
            isDenounceBoxOpen: false,
            isEditingWhichPlayerReportIndex: '',
            isEditingWhichStarterReportIndex: '',
            isEditingImageReport: false,
            isEditingImageReportIndex: [],
            isEditingTextReport: false,
            isEditingTextReportIndex: [],
            isEditReportButtonClickable: false,
            isImageLightBoxOpen: false,
            isImageUploaded: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false,
            reportTextContent: '',
            playerReportList: [],
            starterReportList: [],
            whoIsUser: ''
        };
        this.handleEditImageReportClick = this.handleEditImageReportClick.bind(this);
        this.handleImageReportEditCancelClick = this.handleImageReportEditCancelClick.bind(this);
        this.handleImageReportModifyConfirmClick = this.handleImageReportModifyConfirmClick.bind(this);
        this.handleEditTextReportClick = this.handleEditTextReportClick.bind(this);
        this.handleFinishReportEditText = this.handleFinishReportEditText.bind(this);
        this.handleReportDelete = this.handleReportDelete.bind(this);
        this.handleReportDenounce = this.handleReportDenounce.bind(this);
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
        /* 
         * classify report data by starter or player
         */
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
            const { starterReportList, playerReportList } = this.state;
            this.setState({
                starterReportList: [],
                playerReportList: [],
                whoIsUser
            });
            const newStarterReportList = nextProps.currentLudoReportData.filter(reportObject => {
                if (reportObject.user_id == nextProps.router_currentFormValue.starter_id) {
                    return true;
                } else {
                    return false;
                }
            });
            const newPlayerReportList = nextProps.currentLudoReportData.filter( (reportObject) => {
                if (reportObject.user_id == nextProps.router_currentFormValue.player_id) {
                    return true;
                } else {
                    return false;
                }
            });
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

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    handleEditImageReportClick(event) {
        event.preventDefault();
        /* 
         *  clear the image-editing array and put user click target into image-editing array
         */
        const reportIndex = Number(event.currentTarget.id.slice(-1));
        const { isEditingImageReport, isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        if(!isInEditingArray) {
            isEditingImageReportIndex.splice(0, isEditingImageReportIndex.length);
            isEditingImageReportIndex.push(`${SPIndex}${String(reportIndex)}`);
        }
        this.setState({
            isEditingImageReport: true,
            isEditingImageReportIndex,
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleEditTextReportClick(event) {
        event.preventDefault();
        /* 
         *  put user click target into text-editing array
         */
        const reportIndex = Number(event.currentTarget.id.slice(-1));
        const { isEditingTextReport, isEditingTextReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingTextReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        if(!isInEditingArray) {
            isEditingTextReportIndex.splice(0, isEditingTextReportIndex.length);
            isEditingTextReportIndex.push(`${SPIndex}${String(reportIndex)}`);
        } 
        this.setState({
            isEditingTextReport: true,
            isEditingTextReportIndex,
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleFinishReportEditText(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            /* 
             * send put request to server to modify text report content 
             */
            if(this.state.reportTextContent) {
                const reportPutBody = {
                    content: this.state.reportTextContent,
                    image_location: ''
                };
                const SPIndex = (event.currentTarget.id).slice(0, 1);
                const arrayIndex = Number(event.currentTarget.id.slice(-1));
                let report_id = null;
                if (SPIndex == 's') {
                    report_id = this.state.starterReportList[arrayIndex].report_id;
                } else if (SPIndex == 'p') {
                    report_id = this.state.playerReportList[arrayIndex].report_id;
                }
                if (report_id) {
                    axios.put(`/apis/report/${report_id}`, reportPutBody)
                    .then( response => {
                        if(response.data.status === '200') {
                            this.props.handleShouldReportUpdate(true);
                        } else {
                            console.error('ActiveReports handleFinishReportEditText report put else response from server: ', response);
                            window.alert(`文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                        }
                    })
                    .catch( error => {
                        console.error('ActiveReports handleFinishReportEditText report put error', error);
                        window.alert(`文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                    });
                }
            }
            /* 
             * transfer the text report to the original display instead of textarea by taking the element out of editing text array
             */
            const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
            const { isEditingTextReport, isEditingTextReportIndex } = this.state;
            const indexAtWhatPositionInArray = isEditingTextReportIndex.indexOf(reportIndex);
            const isInEditingArray = (indexAtWhatPositionInArray != -1);
            if(isInEditingArray) {
                isEditingTextReportIndex.splice(indexAtWhatPositionInArray, 1);
                this.setState({
                    isEditingTextReportIndex,
                    isEditingTextReport: false
                });
            } else {
                console.error('text report edit index isInEditingArray error');
            }
        }
    }

    handleImageEnlarge = (event) => {
        this.setState({
            enlargeImageLocation: event.currentTarget.src,
            isImageLightBoxOpen: true
        });
    }

    handleImageRemove = (event) => {
        event.preventDefault();
        // const imageIndex = Number(event.currentTarget.value);  // For multiple picture upload
        this.setState({
            files: [],
            isImageUploaded: false
        });
    }

    handleImageReportEditCancelClick(event) {
        event.preventDefault();
        /* 
         *  drop the user click target out of image-editing array 
         */
        const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
        const { isEditingImageReport, isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        if(isInEditingArray) {
            isEditingImageReportIndex.splice(indexAtWhatPositionInArray, 1);
            this.setState({
                isEditingImageReport: false,
                isEditingImageReportIndex
            });
        } else {
            console.error('report edit index error');
        }
    }

    handleImageReportModifyConfirmClick(event) {
        event.preventDefault();
        const reportPutBody = {
            content: '',
            image_location: this.state.image_location
        };
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        const arrayIndex = Number(event.currentTarget.id.slice(-1));
        let report_id = null;
        if (SPIndex == 's') {
            reportPutBody.content = this.state.starterReportList[arrayIndex].content;
            report_id = this.state.starterReportList[arrayIndex].report_id;
        } else if (SPIndex == 'p') {
            reportPutBody.content = this.state.playerReportList[arrayIndex].content;
            report_id = this.state.playerReportList[arrayIndex].report_id;
        }
        if (report_id) {
            axios.put(`/apis/report/${report_id}`, reportPutBody)
            .then( response => {
                if(response.data.status === '200') {
                    /*
                     * remove the specific element in image-edit array
                     */
                    // const { isEditingImageReportIndex } = this.state;
                    // const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(SPIndex + arrayIndex);
                    // const isInEditingArray = (indexAtWhatPositionInArray != -1);
                    // isEditingImageReportIndex.splice(indexAtWhatPositionInArray, 1);
                    this.setState({
                        files: [],
                        image_location: '',
                        isEditingImageReportIndex: [],
                        isImageUploaded: false,
                        reportTextContent: '',
                    });
                    this.props.handleShouldReportUpdate(true);
                } else {
                    console.error('ActiveReports handleImageReportModifyConfirmClick report put else response from server: ', response);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                }
            })
            .catch( error => {
                console.error('ActiveReports handleImageReportModifyConfirmClick report put error', error);
                window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
            });
        }
    }

    handleReportDelete(event) {
        const isSureToDelelteReport = window.confirm('你確定要刪除這則回報嗎？(刪除後不可復原)');
        if(isSureToDelelteReport) {
            // const SPIndex = (event.currentTarget.id).slice(0, 1);
            const SPIndex = (this.state.anchorEl.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(-1));
            let report_id = null;
            if (SPIndex == 's') {
                report_id = this.state.starterReportList[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                report_id = this.state.playerReportList[arrayIndex].report_id;
            }
            this.setState({
                isPopOverOfExpandMoreOpen: false
            });
            if(report_id) {
                axios.delete(`apis/report/${report_id}`)
                .then(response => {
                    if(response.data.status === '200'){
                        this.props.handleShouldReportUpdate(true);
                    } else {
                        window.alert(`刪除回報時發生錯誤，請再次一次；若問題仍然發生，請聯絡開發團隊`);
                        console.error(' handleReportDelete else response: ', response);
                        console.error(' handleReportDelete else message: ', response.data.message);
                    }
                })
                .catch(error => {
                    window.alert(`刪除回報時發生錯誤，請再次一次；若問題仍然發生，請聯絡開發團隊`);
                    console.error(' handleReportDelete error: ', error);
                });
            }
        }
    }

    handleReportDenounce(event) {
        const SPIndex = (this.state.anchorEl.id).slice(0, 1);
        const arrayIndex = Number(event.currentTarget.id.slice(-1));
        let report_id = null;
        if (SPIndex === 's') {
            report_id = this.state.starterReportList[arrayIndex].report_id;
        } else if (SPIndex === 'p') {
            report_id = this.state.playerReportList[arrayIndex].report_id;
        }
        this.setState({
            currentTargetId: report_id,
            isDenounceBoxOpen: true,
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleReportEditButtonTouchTap = (event) => {
        /* This prevents ghost click. */
        event.preventDefault();
        if (event.currentTarget.id.slice(0, 1) === 's') {
            const isEditingWhichStarterReportIndex = Number((event.currentTarget.id).slice(-1));
            this.setState({isEditingWhichStarterReportIndex});
        } else if (event.currentTarget.id.slice(0, 1) === 'p') {
            const isEditingWhichPlayerReportIndex = Number((event.currentTarget.id).slice(-1));
            this.setState({isEditingWhichPlayerReportIndex});
        }
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfEditOpen: true
        });
    }

    handleReportExpandMoreButtonTouchTap = (event) => {
        /* This prevents ghost click. */
        event.preventDefault();
        console.log('target', event.target);
        console.log('currentTarget', event.currentTarget);
        if (event.currentTarget.id.slice(0, 1) === 's') {
            const isEditingWhichStarterReportIndex = Number((event.currentTarget.id).slice(-1));
            this.setState({isEditingWhichStarterReportIndex});
        } else if (event.currentTarget.id.slice(0, 1) === 'p') {
            const isEditingWhichPlayerReportIndex = Number((event.currentTarget.id).slice(-1));
            this.setState({isEditingWhichPlayerReportIndex});
        }
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfExpandMoreOpen: true
        });
    }

    handleReportTextChange = (event) => {
        this.setState({reportTextContent: event.currentTarget.value});
    }

    handleRequestClose = () => {
        this.setState({
            isDenounceBoxOpen: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    closeLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    onDrop(files) {
        if (files.length == 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const { ludoId }= this.props.params;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            axios.post('/apis/report-image', imgPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.setState({
                        image_location: response.data.location
                    });
                } else {
                    console.error('ActiveReports onDrop response from server: ', response);
                    console.error('ActiveReports onDrop message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.error('ActiveReports onDrop error', error);
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
            isEditingWhichPlayerReportIndex, isEditingWhichStarterReportIndex, 
            isEditingImageReport, isEditingImageReportIndex, isEditingTextReport, isEditingTextReportIndex, 
            isEditReportButtonClickable, isImageUploaded, starterReportList, playerReportList, whoIsUser 
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
                <DenounceBox 
                    currentTargetId={this.state.currentTargetId}
                    denounceType={1}
                    onRequestClose={this.handleRequestClose}
                    isDenounceBoxOpen={this.state.isDenounceBoxOpen}
                />
                <div className="report-list-container">
                    <div className="player-container">
                        <div className="player-photo-container">
                            {
                                whoIsUser == 'starter' && this.props.userBasicData.photo?
                                    <img className="player-photo-container__photo" src={this.props.userBasicData.photo}/>
                                :
                                    <div className="player-photo-container__photo"/>
                            }
                        </div>
                        {
                            this.state.starterReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`starter-report-${index}`}>
                                        {
                                            whoIsUser == 'starter' ?
                                                <ReportEditButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleEditTextReportClick={this.handleEditTextReportClick}
                                                    handleEditImageReportClick={this.handleEditImageReportClick}
                                                    handleReportDelete={this.handleReportDelete}
                                                    handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichStarterReportIndex}
                                                    isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                    reportList={starterReportList}
                                                    onRequestClose={this.handleRequestClose}
                                                    whichList="starter"
                                                />
                                            :
                                                <ReportExpandMoreButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleReportDenounce={this.handleReportDenounce}
                                                    handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichStarterReportIndex}
                                                    isPopOverOfExpandMoreOpen={this.state.isPopOverOfExpandMoreOpen}
                                                    reportList={starterReportList}
                                                    onRequestClose={this.handleRequestClose}
                                                    whichList="starter"
                                                />
                                        }
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                    {
                                                        isEditingImageReport && isEditingImageReportIndex.indexOf(`s${index}`) != -1 ? 
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
                                                        : null
                                                    }
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                isEditingTextReport && isEditingTextReportIndex.indexOf(`s${index}`) != -1 ?
                                                    <Textarea 
                                                        className="report-content__text-edit"
                                                        defaultValue={reportObject.content}
                                                        id={`s-${index}`}
                                                        minRows={2}
                                                        onChange={this.handleReportTextChange}
                                                        onKeyDown={this.handleFinishReportEditText}
                                                    />
                                                :
                                                    <div className="report-content-container">
                                                        <div className="report-content report-content__text">
                                                            {reportObject.content}
                                                        </div>
                                                    </div>
                                            : null
                                        }
                                        <CommentBox 
                                            oldCommentList={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            whoIsUser={whoIsUser}
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
                            {
                                whoIsUser == 'player' && this.props.userBasicData.photo ?
                                    <img className="player-photo-container__photo" src={this.props.userBasicData.photo}/>
                                :
                                    <div className="player-photo-container__photo" />
                            }
                        </div>
                        {
                            this.state.playerReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`player-report-${index}`}>
                                        {
                                            whoIsUser == 'player' ?
                                                <ReportEditButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleEditTextReportClick={this.handleEditTextReportClick}
                                                    handleEditImageReportClick={this.handleEditImageReportClick}
                                                    handleReportDelete={this.handleReportDelete}
                                                    handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                                                    isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                    reportList={playerReportList}
                                                    onRequestClose={this.handleRequestClose}
                                                    whichList="player"
                                                />
                                            :
                                                <ReportExpandMoreButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleReportDenounce={this.handleReportDenounce}
                                                    handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                                                    isPopOverOfExpandMoreOpen={this.state.isPopOverOfExpandMoreOpen}
                                                    reportList={starterReportList}
                                                    onRequestClose={this.handleRequestClose}
                                                    whichList="player"
                                                />
                                        }
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                    {
                                                        isEditingImageReport && isEditingImageReportIndex.indexOf(`p${index}`) != -1 ? 
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
                                                        : null
                                                    }
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                isEditingTextReport && isEditingTextReportIndex.indexOf(`p${index}`) != -1 ? 
                                                    <Textarea 
                                                        className="report-content__text-edit"
                                                        minRows={2}
                                                        onChange={this.handleReportTextChange}
                                                        onKeyDown={this.handleFinishReportEditText}
                                                        defaultValue={reportObject.content}
                                                        id={`p-${index}`}
                                                    />
                                                :
                                                    <div className="report-content-container">
                                                        <div className="report-content report-content__text">
                                                            {reportObject.content}
                                                        </div>
                                                    </div>
                                            : null
                                        }
                                        <CommentBox 
                                            oldCommentList={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            whoIsUser={whoIsUser}
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

ActiveReports.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};