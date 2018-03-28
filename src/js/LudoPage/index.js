import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import LightBox from 'react-image-lightbox';
import {
    Menu,
    MenuItem,
    Popover,
} from 'material-ui';

import axios from '../axios-config';
import { withEither, withMaybe } from '../components/higher-order-components/index';
import DesktopLudoPage from './DesktopLudoPage';
import FooterButton from './FooterButton';
import MobileLudoPage from './MobileLudoPage';
import ReportDialog from './ReportDialog';

const compareByCreatedDate = (a, b) => (
    new Date(b.CreatedAt) - new Date(a.CreatedAt)
);

const nullConditionFn = (props) => !props.isOpen;

// child comopnents
const LightBoxWithNullCondition = withMaybe(nullConditionFn)(LightBox);

class LudoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            editingForm: {
                content: '',
                image_location: '',
                report_id: '',
                video: '',
            },
            enlargeImageLocation: '',
            isDeleteButtonDisabled: false,
            isJoinButtonDisabled: false,
            isShowingDeleteButton: false,
            isImageLightBoxOpen: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false,
            isReportDialogOpen: false,
            reportList: {
                player: [],
                starter: [],
            },
        };
        this.handleFooterButtonChange = this.handleFooterButtonChange.bind(this);
        this.handleImageLightboxClose = this.handleImageLightboxClose.bind(this);
        this.handleImageLightboxOpen = this.handleImageLightboxOpen.bind(this);
        this.handlePopOverClose = this.handlePopOverClose.bind(this);
        this.handleReportDelete = this.handleReportDelete.bind(this);
        this.handleReportDenounce = this.handleReportDenounce.bind(this);
        this.handleReportDialogClose = this.handleReportDialogClose.bind(this);
        this.handleReportDialogOpen = this.handleReportDialogOpen.bind(this);
        this.handleReportDialogOpenWithData = this.handleReportDialogOpenWithData.bind(this);
        this.handleReportEditButtonTouchTap = this.handleReportEditButtonTouchTap.bind(this);
        this.handleReportEditing = this.handleReportEditing.bind(this);
        this.handleReportExpandMoreButtonTouchTap = this.handleReportExpandMoreButtonTouchTap.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningReportPage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillReceiveProps(nextProps) {
        /* classify report data by starter or player */
        if (nextProps.hasGotNewReport) {
            const {
                currentLudoReportData,
                router_currentFormValue,
            } = nextProps;

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
            const playerReportList = newPlayerReportList.sort(compareByCreatedDate);
            const starterReportList = newStarterReportList.sort(compareByCreatedDate);

            this.setState({
                reportList: {
                    player: playerReportList,
                    starter: starterReportList,
                }
            });
            this.props.handleHasGotNewReport(false);
        }
    }

    componentWillUnmount() {
        this.props.handleIsOpeningReportPage(false);
    }

    handleFooterButtonChange(event) {
        event.preventDefault();
        this.setState(
            prevState => ({
                isShowingDeleteButton: !prevState.isShowingDeleteButton, 
            })
        );
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

    handlePopOverClose() {
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleReportDelete(event) {
        event.preventDefault();
        const isSureToDelelteReport = window.confirm('你確定要刪除這則回報嗎？(刪除後不可復原)');
        if (isSureToDelelteReport) {
            const {
                anchorEl,
                reportList,
            } = this.state;
            const fileds = anchorEl.id.split('-');
            const reportUser = fileds[0];
            const arrayIndex = Number(fileds[fileds.length - 1]);
            const reportId = reportList[reportUser][arrayIndex].report_id;
            this.setState({
                isPopOverOfEditOpen: false
            });
            if (reportId) {
              const { router_currentFormValue } = this.props;
              const { ludo_id } = router_currentFormValue;
              axios.delete(`apis/report/${reportId}/${ludo_id}`)
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
        event.preventDefault();
        const {
            anchorEl,
            reportList,
        } = this.state;
        const fileds = anchorEl.id.split('-');
        const reportUser = fileds[0];
        const arrayIndex = Number(fileds[fileds.length - 1]);
        const reportId = reportList[reportUser][arrayIndex].report_id;
        if (reportId) {
            this.props.handleDenounceBoxOpen({
                currentTargetReportId: reportId,
            });
        } else {
            console.error('DesktopReportPage handleReportDenounce report_id does not exist');
        }
        this.setState({
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleReportDialogClose() {
        this.setState({ isReportDialogOpen: false });
    }

    handleReportDialogOpen() {
        this.setState({ isReportDialogOpen: true });
    }

    handleReportDialogOpenWithData(targetReportObject) {
        const { router_currentFormValue } = this.props;
        const { reportList } = this.state;
        const currentUserEditingReportList = reportList[targetReportObject.characterOfUser];
        const editingForm = currentUserEditingReportList[targetReportObject.arrayIndex];
        
        this.setState({
            editingForm,
            isReportDialogOpen: true,
        });
    }

    handleReportEditButtonTouchTap(event) {
        event.preventDefault();
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfEditOpen: true
        });
    }

    handleReportEditing(event) {
        const fields = event.currentTarget.id.split('-');
        const characterOfUser = String(fields[0]);
        const arrayIndex =  Number(fields[fields.length - 1]);
        const targetReportObject = {
            arrayIndex,
            characterOfUser,
        };

        this.handleReportDialogOpenWithData(targetReportObject);
        this.handlePopOverClose();
    }

    handleReportExpandMoreButtonTouchTap(event) {
        event.preventDefault();
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfExpandMoreOpen: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            params,
            router_ludoPageIndex,
        } = this.props;
        const ludoId = params.ludo_id;
        /* TODO: Use notification confirming join */
        if (router_ludoPageIndex === 0 || router_ludoPageIndex === 2) {
            if (!this.props.currentUserId) {
                if (window.confirm('登入後即可加入此卡片！點選「確定」後進入登入頁面。')) {
                    browserHistory.push('/login');
                }
            } else {
                const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
                if (isSureToJoin) {
                    this.setState({
                        isJoinButtonDisabled: true,
                    });
                    const currentFormValue = this.props.router_currentFormValue;
                    const joinLudoPutbody = {
                        'duration': currentFormValue.duration,
                        'marbles': currentFormValue.marbles,
                        'stage': currentFormValue.stage,
                        'type': 'match'
                    };
                    browserHistory.push({
                        pathname: `/loading/${ludoId}`,
                        state: joinLudoPutbody,
                    });
                } else {
                    this.setState({
                        isJoinButtonDisabled: false,
                    });
                }
            }
        } else if (router_ludoPageIndex === 1) {
            this.setState({
                isDeleteButtonDisabled: true
            });
            /* TODO: Use notification confirming delete ludo */
            const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
            if (isSureToDelete) {
                axios.delete(`/apis/ludo/${ludoId}`)
                .then(response => {
                    if (response.data.status == '200') {
                        const { getUserBasicData } = this.props;
                        getUserBasicData();
                        browserHistory.push('/cardList');
                    } else {
                        if (window.confirm('刪除Ludo時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isDeleteButtonDisabled: false,
                        });
                    }
                })
                .catch(error => {
                    if (window.confirm('刪除Ludo時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isDeleteButtonDisabled: false,
                    });
                });
            } else {
                this.setState({
                    isDeleteButtonDisabled: false,
                });
            }
        }
    }

    /* components/_report-form.scss */
    render() {
        const {
            currentLudoReportData,
            currentUserId,
            getUserBasicData,
            handleDenounceBoxOpen,
            handleHasGotNewReport,
            handleShouldReportUpdate,
            hasGotNewReport,
            params,
            router_currentFormValue,
            router_ludoPageIndex,
            userBasicData,
        } = this.props;

        const {
            anchorEl,
            editingForm,
            enlargeImageLocation,
            isImageLightBoxOpen,
            isJoinButtonDisabled,
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
            isReportDialogOpen,
            isShowingDeleteButton,
            reportList,
        } = this.state;

        return (
            <div>
                <MediaQuery minWidth={769}>
                    <DesktopLudoPage
                        baseUrlWithSubDomain={location.pathname.split('/').slice(0, -1).join('/')}
                        currentLudoReportData={currentLudoReportData}
                        currentTab={location.pathname.split('/').pop()}
                        currentUserId={currentUserId}
                        editingForm={editingForm}
                        getUserBasicData={getUserBasicData}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleHasGotNewReport={handleHasGotNewReport}
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportDialogOpen={this.handleReportDialogOpen}
                        handleReportDialogOpenWithData={this.handleReportDialogOpenWithData}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        hasGotNewReport={hasGotNewReport}
                        isReportDialogOpen={isReportDialogOpen}
                        ludoId={params.ludo_id}
                        reportList={reportList}
                        router_currentFormValue={router_currentFormValue}
                        router_ludoPageIndex={router_ludoPageIndex}
                        userBasicData={userBasicData}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileLudoPage
                        currentLudoReportData={currentLudoReportData}
                        currentUserId={currentUserId}
                        editingForm={editingForm}
                        getUserBasicData={getUserBasicData}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleImageLightboxOpen={this.handleImageLightboxOpen}
                        handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        ludoId={params.ludo_id}
                        reportList={reportList}
                        router_currentFormValue={router_currentFormValue}
                        userPhotoUrl={userBasicData ? userBasicData.photo : ''}
                    />
                </MediaQuery>
                <FooterButton
                    handleFooterButtonChange={this.handleFooterButtonChange}
                    handleLudoDelete={this.handleSubmit}
                    handleReportDialogOpen={this.handleReportDialogOpen}
                    handleSubmit={this.handleSubmit}
                    isJoinButtonDisabled={isJoinButtonDisabled}
                    isShowingDeleteButton={isShowingDeleteButton}
                    router_ludoPageIndex={router_ludoPageIndex}
                />
                <ReportDialog
                    currentUserId={currentUserId}
                    editingForm={editingForm}
                    handleReportDialogClose={this.handleReportDialogClose}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isReportDialogOpen={isReportDialogOpen}
                    ludoId={params.ludo_id}
                    router_currentFormValue={router_currentFormValue}
                />
                <LightBoxWithNullCondition
                    isOpen={isImageLightBoxOpen}
                    mainSrc={enlargeImageLocation}
                    onCloseRequest={this.handleImageLightboxClose}
                />
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    onRequestClose={this.handlePopOverClose}
                    open={isPopOverOfEditOpen}
                    style={{overflowY: 'hidden'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem
                            id={anchorEl.id}
                            onTouchTap={this.handleReportEditing}
                            primaryText="編輯此回報"
                        />
                        <MenuItem
                            id={anchorEl.id}
                            onTouchTap={this.handleReportDelete}
                            primaryText="刪除此回報"
                        />
                    </Menu>
                </Popover>
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    onRequestClose={this.handlePopOverClose}
                    open={isPopOverOfExpandMoreOpen}
                    style={{overflowY: 'hidden'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem
                            id={anchorEl.id}
                            innerDivStyle={{ 'fontSize': '14px' }}
                            onTouchTap={this.handleReportDenounce}
                            primaryText="檢舉此回報"
                        />
                    </Menu>
                </Popover>
            </div>
        );
    }
}

LudoPage.propTypes = {
    currentLudoReportData: PropTypes.arrayOf(
        PropTypes.shape({
            CreatedAt: PropTypes.string.isRequired,
            UpdatedAt: PropTypes.string.isRequired,
            image_location: PropTypes.string,
            ludo_id: PropTypes.string.isRequired,
            report_id: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
            user_id: PropTypes.string.isRequired
        })
    ).isRequired,
    currentUserId: PropTypes.string.isRequired,
    getUserBasicData: PropTypes.func.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleHasGotNewReport: PropTypes.func.isRequired,
    handleIsOpeningReportPage: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    hasGotNewReport: PropTypes.bool.isRequired,
    params: PropTypes.shape({
        ludo_id: PropTypes.string
    }).isRequired,
    router_currentFormValue: PropTypes.object.isRequired,
    router_ludoPageIndex: PropTypes.number.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default LudoPage;
