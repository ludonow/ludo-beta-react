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

function compareByCreatedDate(a, b) {
    return new Date(b.CreatedAt) - new Date(a.CreatedAt);
}

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

const NoOpponent = ({ panelWidth }) => (
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
            anchorEl: {},
            enlargeImageLocation: '',
            files: [],
            isEditingWhichPlayerReportIndex: -1,
            isEditingWhichStarterReportIndex: -1,
            isImageLightBoxOpen: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false,
        };
        this.handleImageLightboxClose = this.handleImageLightboxClose.bind(this);
        this.handleImageLightboxOpen = this.handleImageLightboxOpen.bind(this);
        this.handleReportDelete = this.handleReportDelete.bind(this);
        this.handleReportDenounce = this.handleReportDenounce.bind(this);
        this.handleReportEditButtonTouchTap = this.handleReportEditButtonTouchTap.bind(this);
        this.handleReportExpandMoreButtonTouchTap = this.handleReportExpandMoreButtonTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount() {
        this.props.handleShouldReportUpdate(true);
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

    handleReportDelete(event) {
        const isSureToDelelteReport = window.confirm('你確定要刪除這則回報嗎？(刪除後不可復原)');
        if (isSureToDelelteReport) {
            // const SPIndex = (event.currentTarget.id).slice(0, 1);
            const SPIndex = (this.state.anchorEl.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(-1));
            let report_id = null;
            if (SPIndex == 's') {
                report_id = this.props.starterReportList[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                report_id = this.props.playerReportList[arrayIndex].report_id;
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
            report_id = this.props.starterReportList[arrayIndex].report_id;
        } else if (SPIndex === 'p') {
            report_id = this.props.playerReportList[arrayIndex].report_id;
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

    handleRequestClose() {
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    render() {
        const {
            anchorEl,
            enlargeImageLocation,
            files,
            isEditingWhichPlayerReportIndex,
            isEditingWhichStarterReportIndex,
            isImageLightBoxOpen,
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
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
            handleReportDialogOpenWithData,
            handleShouldReportUpdate,
            isStageOfCardReady,
            ludoId,
            playerReportList,
            router_currentFormValue,
            starterReportList,
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
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportDelete={this.handleReportDelete}
                        handleReportDenounce={this.handleReportDenounce}
                        handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleRequestClose={this.handleRequestClose}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isEditingWhichReportIndex={isEditingWhichStarterReportIndex}
                        isMyReport={router_currentFormValue.starter_id === currentUserId}
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
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportDelete={this.handleReportDelete}
                        handleReportDenounce={this.handleReportDenounce}
                        handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleRequestClose={this.handleRequestClose}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isEditingWhichReportIndex={isEditingWhichPlayerReportIndex}
                        isMyReport={router_currentFormValue.player_id === currentUserId}
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
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isStageOfCardReady: PropTypes.bool.isRequired,
    ludoId: PropTypes.string.isRequired,
    playerReportList: PropTypes.array,
    router_currentFormValue: PropTypes.object.isRequired,
    starterReportList: PropTypes.array,
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
