import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withEither } from '../../../components/higher-order-components';
import ReportList, { ReportListWrapper } from './ReportList';
import BasicInfo from '../BasicInfo';

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
    width: 70vw;
`;

const ReportTime = styled.div`
    font-size: 12px;
    margin-top: 52px;
    margin-left: 20px;
`;

const Wrapper = styled.div`
    padding: 30px 0;
    text-align: center;
`;

// rendering condition function
const isStageOfCardReady = (props) => props.isStageOfCardReady;

// child comopnents
const NoOpponent = () => (
    <ReportListWrapper>
        <NoOpponentDescription>
            對手尋找中！
        </NoOpponentDescription>
    </ReportListWrapper>
);

const PlayerReportListWithNoOpponent = withEither(isStageOfCardReady, NoOpponent)(ReportList);

const DesktopReportPage = ({
    currentUserId,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportDialogOpenWithData,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleShouldReportUpdate,
    isStageOfCardReady,
    ludoId,
    pathName,
    playerReportList,
    router_currentFormValue,
    starterReportList,
    userPhotoUrl,
}) => {
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
            <BasicInfo
                duration={duration}
                title={title}
                renderedInterval={renderedInterval}
            />
            <ReportColumnList>
                <ReportList
                    commentsNick={comments_nick}
                    currentLudoId={ludoId}
                    currentUserId={currentUserId}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleImageLightboxOpen={handleImageLightboxOpen}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isMyReport={router_currentFormValue.starter_id === currentUserId}
                    label="starter"
                    pathName={pathName}
                    reportList={starterReportList}
                    reportUserId={starter_id}
                    userPhotoUrl={userPhotoUrl}
                />
                <PlayerReportListWithNoOpponent
                    commentsNick={comments_nick}
                    currentLudoId={ludoId}
                    currentUserId={currentUserId}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleImageLightboxOpen={handleImageLightboxOpen}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isMyReport={router_currentFormValue.player_id === currentUserId}
                    isStageOfCardReady={isStageOfCardReady}
                    label="player"
                    pathName={pathName}
                    reportList={playerReportList}
                    reportUserId={player_id}
                    userPhotoUrl={userPhotoUrl}
                />
            </ReportColumnList>
        </Wrapper>
    );
}

DesktopReportPage.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isStageOfCardReady: PropTypes.bool.isRequired,
    ludoId: PropTypes.string.isRequired,
    pathName: PropTypes.string.isRequired,
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
