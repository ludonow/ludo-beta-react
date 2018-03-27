import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { labelList } from '../../assets/reportInterval.js'; 

const CardDays = styled.div`
    display: inline-flex;
    font-size: 15px;
    padding-top: 15px;
`;

const CardTitle = styled.div`
    font-size: 20px;
`;

const ReportCycle = styled.div`
    align-items: center;
	background-color: #ff5757;
    border: solid 1px #ff5757;
    border-radius: 20px;
    color: #ffffff;
    display: inline-flex;
	font-family: MHeiHK;
	font-size: 12px;
	font-weight: bold;
	height: 26px;
    justify-content: center;
	line-height: 1.21;
    margin-left: 14px;
	text-align: center;
    width: 79px;
`;

const TimeInfo = styled.div`
    width: 100%;
`;

const BasicInfo = ({
    duration,
    renderedInterval,
    title,
}) => (
    <div>
        <CardTitle>
            {title}
        </CardTitle>
        <TimeInfo>
            <CardDays>
                遊戲天數：{duration}天
            </CardDays>
            <ReportCycle>
                {labelList[renderedInterval - 1]}
            </ReportCycle>
        </TimeInfo>
    </div>
);

BasicInfo.propTypes = {
    duration: PropTypes.number.isRequired,
    renderedInterval: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};

export default BasicInfo;