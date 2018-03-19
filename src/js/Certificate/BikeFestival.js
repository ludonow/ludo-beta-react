import React from 'react';
import styled from 'styled-components';

import TitleIcon from '../../images/certificate/bike-festival.png';

function formatDate(date) {
    let formattedDate = date.replace(new RegExp('-', 'g'), '/');
    return formattedDate;
}

function removeNCKU(departmentName) {
    let processedDepartmentName = departmentName;
    if (departmentName.includes('成大')) {
        processedDepartmentName = departmentName.replace('成大', '');
    }
    return processedDepartmentName;
}

const Border = styled.div`
    background-color: #f8b62d;
    border: 8px solid #405d6f;
    padding: 1cm 3.5cm;
`;

const Column = styled.div`
    margin: 0 10px;
`;

const Content = styled.div`
    position: relative;
    left: 15px;
    margin: 50px auto;
    width: 10.5cm;
`;

const Date = styled.span`
    font-family: Helvetica;
`;

const Introduction = styled.div`
    width: 8.35cm;
`;

const Label = styled.div`
    width: 2.15cm;
`;

const LogoWrapper = styled.div`
    display: inline-flex;
    margin: 20px auto;

    img {
        height: 85px;
    }
`;

const Number = styled.span`
    font-family: Helvetica;
    font-size: 28px;
    font-weight: bold;
`;

const NumberWrapper = styled.div`
    margin: 10px 0;
`;

const Row = styled.div`
    margin: 20px auto;
`;
const ContentRow = Row.extend`
    line-height: 1.1rem;
    text-align: left;
    white-space: pre-wrap;
`;
const IntroductionWrapper = ContentRow.extend`
    display: inline-flex;
    margin: 0;
    width: 100%;
`;
const StyledRow = Row.extend`
    border-bottom: 1px solid black;
    font-size: 16px;
    margin: 0;
    padding: 3px 10px;
    text-align: center;
    width: 80px;
`;

const Statistic = styled.div`
    display: inline-flex;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 28px;
    margin: 20px 0;
`;

const Unit = styled.span`
    font-size: 24px;
`;

const Wrapper = styled.div`
    color: #504639;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    height: 29.7cm;
    justify-content: center;
    overflow: auto;
    text-align: center;
    width: 21cm;
`;

const BikeFestival = ({
    currentLudoData,
    statisticData,
    userName,
}) => (
    <Wrapper>
        <Border>
            <LogoWrapper>
                <img src={TitleIcon} />
            </LogoWrapper>
            <Title>
                國立成功大學系所入門知識行動成果證明
            </Title>
            <Content>
                <ContentRow>
                    姓&emsp;&emsp;名：{userName}
                </ContentRow>
                <ContentRow>
                    系&emsp;&emsp;所：{currentLudoData.tags.length > 0 ? removeNCKU(currentLudoData.tags[0]) : '科系'}
                </ContentRow>
                <ContentRow>
                    執行時間：
                    <Date>
                        {formatDate(currentLudoData.start_day) + ' ~ ' + formatDate(currentLudoData.end_day)}
                    </Date>
                </ContentRow>
                <ContentRow>
                    模板名稱：{currentLudoData.title}
                </ContentRow>
                <IntroductionWrapper>
                    <Label>
                        模板內容：
                    </Label>
                    <Introduction>
                        {currentLudoData.introduction}
                    </Introduction>
                </IntroductionWrapper>
            </Content>
            <Statistic>
                <Column>
                    <StyledRow>
                        達成率
                    </StyledRow>
                    <NumberWrapper>
                        <Number>{Math.round(statisticData.completeRate * 10) / 10}</Number><Unit>%</Unit>
                    </NumberWrapper>
                </Column>
                <Column>
                    <StyledRow>
                        互動積分
                    </StyledRow>
                    <NumberWrapper>
                        <Number>{statisticData.interactScore}</Number>
                    </NumberWrapper>
                </Column>
                <Column>
                    <StyledRow>
                        行為間隔
                    </StyledRow>
                    <NumberWrapper>
                        <Number>{statisticData.actionInterval}</Number><Unit>天</Unit>
                    </NumberWrapper>
                </Column>
                <Column>
                    <StyledRow>
                        互動PR
                    </StyledRow>
                    <NumberWrapper>
                        <Number>{statisticData.interactPR}</Number>
                    </NumberWrapper>
                </Column>
            </Statistic>
        </Border>
    </Wrapper>
);

export default BikeFestival;
