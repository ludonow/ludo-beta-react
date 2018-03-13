import React from 'react';
import styled from 'styled-components';

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

const Border = styled.div`
    background-color: #f8b62d;
    border: 8px solid #405d6f;
    height: 595px;
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

const Diagram = styled.div`
`;

const Row = styled.div`
    margin: 20px 0;
    text-align: left;
`;
const ContentRow = Row.extend`
    margin: 20px 50px;
`;
const Date = ContentRow.extend`
    font-family: Helvetica;
`;
const StyledRow = Row.extend`
    border-bottom: 1px solid black;
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
    margin: 50px 0;
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
                <Date>
                    執行時間：{formatDate(currentLudoData.start_day) + ' ~ ' + formatDate(currentLudoData.end_day)}
                </Date>
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
                        互動率
                    </StyledRow>
                    <Row>
                        %
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
                圖表
            </Diagram>
        </Border>
    </Wrapper>
);

export default BikeFestival;
