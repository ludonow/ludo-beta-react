import React, { Component } from 'react';
import PropTypes from 'prop-types';
import processString from 'react-process-string';
import styled from 'styled-components';
import LightBox from 'react-image-lightbox';
import ReactPlayer from 'react-player';

import axios from '../../axios-config';
import { labelList } from '../../assets/reportInterval'; 
import { withEither, withMaybe } from '../../components/higher-order-components/index';
import LudoStageArray from '../../../data/LudoStageArray.json';
import ReportList, { ReportListWrapper } from './ReportList';

const panelWidth = window.innerWidth * 0.7;

const CardTitle = styled.div`
    font-size: 20px;
`;

const CardDays = styled.div`
    display: inline-flex;
    font-size: 15px;
    padding-top: 15px;
`;

const NoOpponentDescription = styled.div`
    align-items: center;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.0));
    color: #ffffff;
    display: inline-flex;
    font-size: 22.5px;
    font-weight: 500;
    height: 291px;
    justify-content: center;
    letter-spacing: 14.5px;
    line-height: 1.22;
    text-align: center;
    width: 100%;
`;

const ReportColumnList = styled.div`
    align-items: flex-start;
    display: inline-flex;
    justify-content: center;
    margin-top: 15px;
    width: ${props => props.width}px;
`;

const ReportCycle = styled.div`
    align-items: center;
    background-color: #ff5757;
    border: solid 1px #ff5757;
    border-radius:20px;
    color: #ffffff;
    display: inline-flex;
    font-size: 12px;
    font-weight: bold;
    height: 26px;
    justify-content: center;
    line-height: 1.21;
    margin-left: 14px;
    text-align: center;
    width: 79px;
`;

const ReportTime = styled.div`
    font-size: 12px;
    margin-top: 52px;
    margin-left: 20px;
`;

const Wrapper = styled.div`
    display: inline;
    text-align: center;
`;

// rendering condition function
const isStageOfCardReady = (props) => props.isStageOfCardReady;
const nullConditionFn = (props) => !props.isOpen;

// child comopnents
const LightBoxWithNullCondition = withMaybe(nullConditionFn)(LightBox);

const NoOpponent = ({
    panelWidth,
}) => (
    <ReportListWrapper width={panelWidth/2}>
        <NoOpponentDescription>
            對手尋找中！
        </NoOpponentDescription>
    </ReportListWrapper>
);

const PlayerReportListWithNoOpponent = withEither(isStageOfCardReady, NoOpponent)(ReportList);

class DesktopReportPage extends Component {
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
        this.handleEditImageReportClick = this.handleEditImageReportClick.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageLightboxClose = this.handleImageLightboxClose.bind(this);
        this.handleImageLightboxOpen = this.handleImageLightboxOpen.bind(this);
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
        this.props.handleShouldReportUpdate(true);
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
                            console.error('DesktopReportPage handleFinishReportEditText report put else response from server: ', response);
                            window.alert(`文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                        }
                    })
                    .catch((error) => {
                        console.error('DesktopReportPage handleFinishReportEditText report put error', error);
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
            const { ludoId }= this.props;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            axios.post('/apis/report-image', imgPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.setState({
                        image_location: response.data.location
                    });
                } else {
                    console.error('DesktopReportPage handleImageDrop response from server: ', response);
                    console.error('DesktopReportPage handleImageDrop message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.error('DesktopReportPage handleImageDrop error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    handleImageLightboxClose() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    handleImageLightboxOpen(event) {
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
                    console.error('DesktopReportPage handleImageReportModifyConfirmClick report put else response from server: ', response);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                }
            })
            .catch( error => {
                console.error('DesktopReportPage handleImageReportModifyConfirmClick report put error', error);
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
            console.error('DesktopReportPage handleReportDenounce report_id does not exist');
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
        const {
            anchorEl,
            avatarStyle,
            enlargeImageLocation,
            files,
            isEditingImageReport,
            isEditingImageReportIndex,
            isEditingTextReport,
            isEditingTextReportIndex,
            isEditingWhichPlayerReportIndex,
            isEditingWhichStarterReportIndex,
            isEditReportButtonClickable,
            isImageLightBoxOpen,
            isImageUploaded,
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
            playerReportList,
            starterReportList,
            whoIsUser,
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

        const {
            currentUserId,
            handleDenounceBoxOpen,
            handleShouldReportUpdate,
            isStageOfCardReady,
            ludoId,
            router_currentFormValue,
            userPhotoUrl,
        } = this.props;

        const {
            comments_nick,
            duration,
            player_id,
            starter_id,
            title,
        } = router_currentFormValue;

        const renderedInterval = router_currentFormValue.interval ? Number(router_currentFormValue.interval) : 1;

        return (
            <Wrapper>
                <CardTitle>{title}</CardTitle>
                <CardDays>遊戲天數：{duration}天</CardDays>
                <ReportCycle>{labelList[Number(renderedInterval)-1]}</ReportCycle>
                <ReportColumnList width={panelWidth}>
                    <ReportList
                        anchorEl={anchorEl}
                        commentsNick={comments_nick}
                        currentLudoId={ludoId}
                        currentUserId={currentUserId}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleEditTextReportClick={this.handleEditTextReportClick}
                        handleEditImageReportClick={this.handleEditImageReportClick}
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportDelete={this.handleReportDelete}
                        handleReportDenounce={this.handleReportDenounce}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleRequestClose={this.handleRequestClose}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                        isMyReport={whoIsUser === 'starter'}
                        isPopOverOfEditOpen={isPopOverOfEditOpen}
                        isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
                        label="starter"
                        panelWidth={panelWidth}
                        reportList={starterReportList}
                        reportUserId={starter_id}
                        userPhotoUrl={userPhotoUrl}
                    />
                    <PlayerReportListWithNoOpponent
                        anchorEl={anchorEl}
                        commentsNick={comments_nick}
                        currentLudoId={ludoId}
                        currentUserId={currentUserId}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleEditTextReportClick={this.handleEditTextReportClick}
                        handleEditImageReportClick={this.handleEditImageReportClick}
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportDelete={this.handleReportDelete}
                        handleReportDenounce={this.handleReportDenounce}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleRequestClose={this.handleRequestClose}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                        isMyReport={whoIsUser === 'player'}
                        isPopOverOfEditOpen={isPopOverOfEditOpen}
                        isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
                        isStageOfCardReady={isStageOfCardReady}
                        label="player"
                        panelWidth={panelWidth}
                        reportList={playerReportList}
                        reportUserId={player_id}
                        userPhotoUrl={userPhotoUrl}
                    />
                </ReportColumnList>
                <LightBoxWithNullCondition
                    isOpen={isImageLightBoxOpen}
                    mainSrc={enlargeImageLocation}
                    onCloseRequest={this.handleImageLightboxClose}
                />
            </Wrapper>
        );
    }
}

DesktopReportPage.propTypes = {
    currentLudoReportData: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleHasGotNewReport: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    hasGotNewReport: PropTypes.bool.isRequired,
    isStageOfCardReady: PropTypes.bool.isRequired,
    ludoId: PropTypes.string.isRequired,
    router_currentFormValue: PropTypes.object.isRequired,
    userPhotoUrl: PropTypes.string,
};

DesktopReportPage.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': 'a',
        'starter_id': 'b'
    }
};

export default DesktopReportPage;
