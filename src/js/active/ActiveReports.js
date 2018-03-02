import React from 'react';
import axios from '../axios-config';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';
import processString from 'react-process-string';
import ReactPlayer from 'react-player'

import DropZone from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import Textarea from 'react-textarea-autosize';

import Avatar from '../components/Avatar';
import CommentBox from './CommentBox';
import ReportEditButton from './ReportEditButton';
import ReportExpandMoreButton from './ReportExpandMoreButton';

import uploadIcon from '../../images/active/upload-icon.png';


const panel_width = 900;

const CardTitle = styled.div`
    font-size:20px;
`;

const CardDays = styled.div`
    padding-top: 15px;
    font-size: 15px;
    display: inline-flex;
`;

const ReportCycle = styled.div`
    width: 79px;
	height: 26px;
	background-color: #ff5757;
    border: solid 1px #ff5757;
    border-radius:20px;
	font-size: 12px;
	font-weight: bold;
	line-height: 1.21;
	text-align: center;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left:14px;
`;

const ReportPanelWrapper = styled.div`
    display:inline;
    text-align:center;
`;

const ReportListContainer = styled.div`
    margin-top: 15px;
    width: ${props => props.width}px;
    /* height:291px; */
    display:inline-flex;
    justify-content:center;
    align-items:flex-start;
	/* background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0)); */
`;

const ReportList = styled.div`
    display: flex;
    /* align-items: center;     */
    justify-content: center;
    width: ${props => props.width}px;
    flex-wrap:wrap;
    margin:0 7px 0 7px;
`;

const NoReportText = styled.div`
	font-size: 22.5px;
	font-weight: 500;
	line-height: 1.22;
	letter-spacing: 14.5px;
	text-align: center;
    color: #ffffff;
    height:291px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width:100%;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0));
`;

const SingleReport = styled.div`
    background:white;
    margin:0 0px 28px 0px;
    display:flex;
    width:100%;
    flex-direction:column;
`;

const ReportTime = styled.div`
    font-size:12px;
    margin-top:52px;
    margin-left:20px;
`;

const ReportContent = styled.div`
    margin-top:25px;
    width:100%;
    display:flex;
    justify-content: center;
    margin-bottom:50px;
    white-space:pre-wrap;
    line-height:1.1rem;
    text-align:left;

    div {
        width:90%;
    }
    img{
        width:100%;
        display:flex;
        margin-top:20px;
    }
    .report_word {
        margin-top:20px;
    }
`;

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTargetId: '',
            enlargeImageLocation: '',
            files: [],
            imageLocation: '',
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
        this.handleCloseLightbox = this.handleCloseLightbox.bind(this);
        this.handleEditImageReportClick = this.handleEditImageReportClick.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
        this.handleImageReportEditCancelClick = this.handleImageReportEditCancelClick.bind(this);
        this.handleImageReportModifyConfirmClick = this.handleImageReportModifyConfirmClick.bind(this);
        this.handleEditTextReportClick = this.handleEditTextReportClick.bind(this);
        this.handleFinishReportEditText = this.handleFinishReportEditText.bind(this);
        this.handleReportDelete = this.handleReportDelete.bind(this);
        this.handleReportDenounce = this.handleReportDenounce.bind(this);
        this.handleReportEditButtonTouchTap = this.handleReportEditButtonTouchTap.bind(this);
        this.handleReportExpandMoreButtonTouchTap = this.handleReportExpandMoreButtonTouchTap.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    componentWillReceiveProps(nextProps) {
        /* classify report data by starter or player */
        if (nextProps.hasGotNewReport) {
            const { currentUserId, router_currentFormValue } = nextProps;
            let whoIsUser = '';
            if (currentUserId) {
                if (router_currentFormValue.starter_id == currentUserId) {
                    whoIsUser = 'starter';
                } else if (router_currentFormValue.player_id == currentUserId) {
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
            const { currentLudoReportData } = nextProps;
            const newStarterReportList = currentLudoReportData.filter((reportObject) => {
                if (reportObject.user_id === router_currentFormValue.starter_id) {
                    return true;
                } else {
                    return false;
                }
            });
            const newPlayerReportList = currentLudoReportData.filter((reportObject) => {
                if (reportObject.user_id === router_currentFormValue.player_id) {
                    return true;
                } else {
                    return false;
                }
            });

            this.setState({
                playerReportList: newPlayerReportList,
                starterReportList: newStarterReportList,
                whoIsUser
            });
            if (!this.state.isEditReportButtonClickable) {
                this.setState({
                    isEditReportButtonClickable: true
                });
            }
            this.props.handleHasGotNewReport(false);
        }
    }

    handleCloseLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    handleEditImageReportClick(event) {
        event.preventDefault();
        /* clear the image-editing array and put user click target into image-editing array */
        const reportIndex = Number(event.currentTarget.id.slice(-1));
        const { isEditingImageReport, isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        const SPIndex = (event.currentTarget.id).slice(0, 1);
        if (!isInEditingArray) {
            isEditingImageReportIndex.splice(0, isEditingImageReportIndex.length);
            isEditingImageReportIndex.push(`${SPIndex}${String(reportIndex)}`);
        }
        this.setState({
            isEditingImageReport: true,
            isEditingImageReportIndex,
            isPopOverOfEditOpen: false
        });
    }

    handleEditTextReportClick(event) {
        event.preventDefault();
        /* put user click target into text-editing array */
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
            isPopOverOfEditOpen: false
        });
    }

    handleFinishReportEditText(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            /* send put request to server to modify text report content */
            if (this.state.reportTextContent) {
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
                    .then((response) => {
                        if(response.data.status === '200') {
                            this.props.handleShouldReportUpdate(true);
                        } else {
                            console.error('ActiveReports handleFinishReportEditText report put else response from server: ', response);
                            window.alert(`文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                        }
                    })
                    .catch((error) => {
                        console.error('ActiveReports handleFinishReportEditText report put error', error);
                        window.alert(`文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                    });
                }
            }
            /* transfer the text report to the original display instead of textarea by taking the element out of editing text array */
            const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
            const { isEditingTextReport, isEditingTextReportIndex } = this.state;
            const indexAtWhatPositionInArray = isEditingTextReportIndex.indexOf(reportIndex);
            const isInEditingArray = (indexAtWhatPositionInArray != -1);
            if (isInEditingArray) {
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

    handleImageDrop(files) {
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
                    console.error('ActiveReports handleImageDrop response from server: ', response);
                    console.error('ActiveReports handleImageDrop message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.error('ActiveReports handleImageDrop error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    handleImageEnlarge(event) {
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

    handleImageReportEditCancelClick(event) {
        event.preventDefault();
        /* drop the user click target out of image-editing array */
        const reportIndex = event.currentTarget.id.slice(0,1) + event.currentTarget.id.slice(-1);
        const { isEditingImageReport, isEditingImageReportIndex } = this.state;
        const indexAtWhatPositionInArray = isEditingImageReportIndex.indexOf(reportIndex);
        const isInEditingArray = (indexAtWhatPositionInArray != -1);
        if (isInEditingArray) {
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
                    /* remove the specific element in image-edit array */
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
        if (isSureToDelelteReport) {
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
                isPopOverOfEditOpen: false
            });
            if (report_id) {
              const { router_currentFormValue } = this.props;
              const { ludo_id } = router_currentFormValue;
              axios.delete(`apis/report/${report_id}/${ludo_id}`)
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
        } else {
            console.error('handleReportDenounce SPIndex is not correct');
        }
        if (report_id) {
            this.props.handleDenounceBoxOpen({
                currentTargetReportId: report_id,
            });
        } else {
            console.error('ActiveReports handleReportDenounce report_id does not exist');
        }
        this.setState({
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleReportEditButtonTouchTap(event) {
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

    handleReportExpandMoreButtonTouchTap(event) {
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
            isPopOverOfExpandMoreOpen: true
        });
    }

    handleReportTextChange(event) {
        this.setState({reportTextContent: event.currentTarget.value});
    }

    handleRequestClose() {
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    shuffleArray(array) {
        let randomNumber, tempVariable, index;
        for (index = array.length; index; index-- ) {
            randomNumber = Math.floor(Math.random() * index);
            tempVariable = array[index - 1];
            array[index - 1] = array[randomNumber];
            array[randomNumber] = tempVariable;
        }
    }

    render() {
        const { files,
            isEditingWhichPlayerReportIndex, isEditingWhichStarterReportIndex,
            isEditingImageReport, isEditingImageReportIndex, isEditingTextReport, isEditingTextReportIndex,
            isEditReportButtonClickable, isImageUploaded, playerReportList, starterReportList, avatarStyle, whoIsUser
        } = this.state;
       
        let config = [{
            regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
                                 </span>
        }, {
            regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
                                 </span>
        }];

        const { currentUserId, router_currentFormValue, userBasicData } = this.props;
        const { comments_nick, player_id, starter_id , title, duration} = router_currentFormValue;
        return (
            <ReportPanelWrapper>
                <CardTitle>{title}</CardTitle>
                <CardDays>遊戲天數：{duration}天</CardDays>
                <ReportCycle>每一天回報</ReportCycle>
                <ReportListContainer width={panel_width}>
                    <ReportList width={panel_width/2}>
                        <Avatar
                            avatarBackgroundColorIndex={comments_nick[starter_id][1]}
                            avatarImageIndex={comments_nick[starter_id][0]}
                            isThisBelongToCurrentUser={(router_currentFormValue.starter_id == currentUserId)}
                            userPhotoUrl={userBasicData.photo}
                            usedInReport={true}
                        />
                        {
                            this.state.starterReportList.map((reportObject, index) => {
                                return (
                                    <SingleReport key={`starter-report-${index}`} >
                                        {
                                            whoIsUser === 'starter' ?
                                                <ReportEditButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleEditTextReportClick={this.handleEditTextReportClick}
                                                    handleEditImageReportClick={this.handleEditImageReportClick}
                                                    handleReportDelete={this.handleReportDelete}
                                                    handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichStarterReportIndex}
                                                    isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                    onRequestClose={this.handleRequestClose}
                                                    reportList={starterReportList}
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
                                                    onRequestClose={this.handleRequestClose}
                                                    reportList={starterReportList}
                                                    whichList="starter"
                                                />
                                        }
                                        <ReportContent>
                                            <div>
                                                <img
                                                        className="report-content report-content__image"
                                                        onClick={this.handleImageEnlarge}
                                                        src={reportObject.image_location}
                                                />
                                                { reportObject.video ? 
                                                    <ReactPlayer url={reportObject.video} 
                                                        width = "100%"  
                                                        controls = "true"
                                                        />
                                                    : null
                                                }
                                                <div className="report_word" >
                                                    {reportObject.content}
                                                </div>
                                            </div>
                                        </ReportContent>
                                        <CommentBox
                                            commentListFromDatabase={reportObject.comments}
                                            reportId={reportObject.report_id}
                                            whoIsUser={whoIsUser}
                                            {...this.props}
                                        />
                                    </SingleReport>
                                )}
                            )
                        }
                    </ReportList>
                    <ReportList width={panel_width/2}>
                        <Avatar
                            avatarBackgroundColorIndex={comments_nick[player_id][1]}
                            avatarImageIndex={comments_nick[player_id][0]}
                            isThisBelongToCurrentUser={(router_currentFormValue.player_id == currentUserId)}
                            userPhotoUrl={userBasicData.photo}
                            usedInReport={true}
                        />
                        {
                            this.state.playerReportList.map((reportObject, index) => {
                                return (
                                    <SingleReport key={`player-report-${index}`} >
                                        {
                                            whoIsUser === 'player' ?
                                                <ReportEditButton
                                                    anchorEl={this.state.anchorEl}
                                                    handleEditTextReportClick={this.handleEditTextReportClick}
                                                    handleEditImageReportClick={this.handleEditImageReportClick}
                                                    handleReportDelete={this.handleReportDelete}
                                                    handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                                                    index={index}
                                                    isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                                                    isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                    onRequestClose={this.handleRequestClose}
                                                    reportList={playerReportList}
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
                                                    onRequestClose={this.handleRequestClose}
                                                    reportList={playerReportList}
                                                    whichList="player"
                                                />
                                        }
                                        <ReportContent>
                                            <div>
                                                <img
                                                        className="report-content report-content__image"
                                                        onClick={this.handleImageEnlarge}
                                                        src={reportObject.image_location}
                                                />
                                                { reportObject.video ? 
                                                    <ReactPlayer url={reportObject.video} 
                                                        width = "100%"  
                                                        controls = "true"
                                                        />
                                                    : null
                                                }
                                                <div className="report_word" >
                                                    {reportObject.content}
                                                </div>
                                            </div>
                                        </ReportContent>
                                        <CommentBox
                                            commentListFromDatabase={reportObject.comments}
                                            reportId={reportObject.report_id}
                                            whoIsUser={whoIsUser}
                                            {...this.props}
                                        />
                                    </SingleReport>
                                )}
                            )
                        }
                    </ReportList>
                    {/* <ReportList width={panel_width/2}>
                        <NoReportText>
                            <div>等等呢！玩家還在努力喔！</div>
                        </NoReportText> 
                    </ReportList> */}
                    {/* <NoReportText>
                        <div>搶先成為第一個回報的人吧！</div>
                    </NoReportText> */}
                </ReportListContainer>
            </ReportPanelWrapper>
        );
    }
}

ActiveReports.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': 'a',
        'starter_id': 'b'
    }
}
