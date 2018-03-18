import React from 'react';
import styled from 'styled-components';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import LogoIcon from '../../images/Ludo_logo.png';

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

const chartData = [
    {
        date: '2018/01/01',
        回報次數: 2,
    },
    {
        date: '2018/01/02',
        回報次數: 5,
    },
    {
        date: '2018/01/03',
        回報次數: 7,
    },
    {
        date: '2018/01/04',
        回報次數: 6,
    },
    {
        date: '2018/01/05',
        回報次數: 9,
    },
    {
        date: '2018/01/06',
        回報次數: 0,
    },
    {
        date: '2018/01/07',
        回報次數: 1,
    },
    {
        date: '2018/01/08',
        回報次數: 3,
    },
    {
        date: '2018/01/09',
        回報次數: 4,
    },
    {
        date: '2018/01/10',
        回報次數: 8,
    },
    {
        date: '2018/01/11',
        回報次數: 10,
    },
    {
        date: '2018/01/12',
        回報次數: 11,
    },
    {
        date: '2018/01/13',
        回報次數: 8,
    },
    {
        date: '2018/01/14',
        回報次數: 7,
    },
];

const Border = styled.div`
    background-color: #f8b62d;
    border: 8px solid #405d6f;
    margin: 5px;
    padding: 0 60px;
    width: 300px;
`;

const Column = styled.div`
    margin: 0 10px;
`;

const Content = styled.div`
    margin: 30px auto;
`;

const Date = styled.span`
    font-family: Helvetica;
`;

const Diagram = styled.div`
`;

const Row = styled.div`
    margin: 10px auto;
    text-align: left;
`;
const ContentRow = Row.extend`
    margin: 10px 50px;
`;
const StyledRow = Row.extend`
    border-bottom: 1px solid black;
    margin: 0;
    padding: 3px 10px;
    text-align: center;
    width: 50px;
`;
const Introduction = Row.extend`
    line-height: 0.7rem;
    width: 300px;
`;

const ImageListWrapper = styled.div`
    display: inline-flex;
    margin: 20px auto;
`;

const Statistic = styled.div`
    display: inline-flex;
    justify-content: center;
    width: 100%;
`;

const Summary = styled.div`
    margin: 20px auto;
`;

const Title = styled.div`
    font-size: 16px;
`;

const Wrapper = styled.div`
    color: #504639;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    justify-content: center;
    overflow: auto;
    text-align: center;
`;

const BikeFestival = ({
    currentLudoData,
}) => (
    <Wrapper>
        <Border>
            <ImageListWrapper>
                <img src={LogoIcon} />
                <img src={LogoIcon} />
                <img src={LogoIcon} />
            </ImageListWrapper>
            <Title>
                國立成功大學系所入門知識行動成果證明
            </Title>
            <Content>
                <ContentRow>
                    系&emsp;&emsp;所：{removeNCKU(currentLudoData.tags[0])}
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
                <Introduction>
                    模板內容：{currentLudoData.introduction}
                </Introduction>
            </Content>
            <Statistic>
                <Column>
                    <StyledRow>
                        達成率
                    </StyledRow>
                    <Row>
                        %
                    </Row>
                </Column>
                <Column>
                    <StyledRow>
                        互動積分
                    </StyledRow>
                    <Row>
                        
                    </Row>
                </Column>
                <Column>
                    <StyledRow>
                        行為間隔
                    </StyledRow>
                    <Row>
                        天
                    </Row>
                </Column>
                <Column>
                    <StyledRow>
                        互動PR
                    </StyledRow>
                    <Row>
                        %
                    </Row>
                </Column>
            </Statistic>
            <Summary>
                這張卡片已經完成次，無間斷天習慣養成！
            </Summary>
            <Diagram>
                <BarChart
                    data={chartData}
                    height={150}
                    width={300}
                >
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="回報次數" fill="#405d6f" />
                </BarChart>
            </Diagram>
        </Border>
    </Wrapper>
);

export default BikeFestival;
