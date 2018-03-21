import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import LightBox from 'react-image-lightbox';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
import {
    Menu,
    MenuItem,
    Popover,
} from 'material-ui';

import { withEither, withMaybe } from '../components/higher-order-components/index';
import DesktopLudoPage from './DesktopLudoPage';
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
            isImageLightBoxOpen: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false,
            isReportDialogOpen: false,
            reportList: {
                player: [],
                starter: [],
            },
        };
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
        const isSureToDelelteReport = window.confirm('你確定要刪除這則回報嗎？(刪除後不可復原)');
        if (isSureToDelelteReport) {
            // const SPIndex = (event.currentTarget.id).slice(0, 1);
            const SPIndex = (this.state.anchorEl.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(-1));
            let report_id = null;
            if (SPIndex == 's') {
                report_id = this.state.reportList.starter[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                report_id = this.state.reportList.player[arrayIndex].report_id;
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
            report_id = this.state.reportList.starter[arrayIndex].report_id;
        } else if (SPIndex === 'p') {
            report_id = this.state.reportList.player[arrayIndex].report_id;
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

    /* components/_report-form.scss */
    render() {
        const {
            currentLudoReportData,
            currentUserId,
            getUserBasicData,
            handleDenounceBoxOpen,
            handleHasGotNewReport,
            handleShouldProfileUpdate,
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
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
            isReportDialogOpen,
            reportList,
        } = this.state;

        return (
            <div>
                <MediaQuery minWidth={769}>
                    <DesktopLudoPage
                        currentLudoReportData={currentLudoReportData}
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
                        handleShouldProfileUpdate={handleShouldProfileUpdate}
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
                <ReportDialog
                    currentUserId={currentUserId}
                    editingForm={editingForm}
                    handleReportDialogClose={this.handleReportDialogClose}
                    handleShouldProfileUpdate={handleShouldProfileUpdate}
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
    handleShouldProfileUpdate: PropTypes.func.isRequired,
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
