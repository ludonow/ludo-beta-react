import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import ActivePlayerForm from './ActivePlayerForm';
import ActiveReports from '../ActiveReports';
import MobileReports from '../MobileReports';
import imageLogo from '../../../images/Ludo_logo.png';
import tagIcon from '../../../images/active/tag-icon.png';
import ReportButton from '../ReportButton';
import CommentBox from '../CommentBox';

// import ReportList from '../ReportList';

const panel_width = 609;

const CardDetailContainer = styled.div`
    .container {
        display:flex;
        justify-content: center;
        margin-bottom:100px;
    }
`;

const ReportTabs = styled.div`
    .tabs {
        align-items: center;
        justify-content: center;
        width: 609px;
        display: block;
        padding-top:23px;
    }

    .tab_list {
        display:flex;
        width :100%;
        align-items: center;
        justify-content: center;
    }
    .tab {
        /*border-bottom: 3px solid #727272;*/
        width: 85px;
        font-size: 15px;
        text-align: center;
        display: block;
        padding-bottom: 4px;
        color: #FFFFFF;
        margin:0 55px;
    }

    .selected_tab {
        border-bottom: 1.5px solid #727272;
        color: #727272;
    }

    .panel_container{
        /* display:flex; */
        width :100%;
        align-items: center;
        justify-content: center;
        /* background-color: #ffffff; */
        margin-top:29px;
    }

    .panel {
        padding-top:29px;
        width:100%;
        background-color: #ffffff;
        display:none;
        align-items: center;
        justify-content: center;
    }

    .selected_panel {
        display: flex;
    }

    .panel_report {
        background-color: transparent;
    }
`;

const CardContainer = styled.div`
    display:inline;
    text-align:center;
`;
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
	font-family: MHeiHK;
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

const CardContent = styled.div`
    width: 512.5px;
	font-family: HelveticaNeue;
	font-size: 14px;
	line-height: 1.2;
	text-align: left;
    color: #484848;
    margin-top:35px;
`;

const CardImage = styled.div`
    max-width: 512.5px;
    margin-top:42px;
`;

const CardTags = styled.div`
    margin: 22px 0;
    text-align:left;
    .ludo-tag {
        display: inline-block;
        margin: 5px;
        padding: 5px 10px;
        background-color: rgba(0,0,0,0.6);
        color: white;
        font-size: 14px;
    }
    img {
        position:relative;
        top: 10px;
        display: inline-block;
        height: 30px;
    }
`;

const ExamlpeLinkButton = styled.div`
    width: 28.5px;
	height: 101.5px;
	background-color: #5829f5;
	box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
`;

const ReportPanelWrapper = styled.div`
    display:inline;
    text-align:center;
`;

const ReportListContainer = styled.div`
    margin-top: 15px;
    width: ${props => props.width}px;
    height:291px;
    display:inline-flex;
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

const PlayerAvatar = styled.div`
    width: 43px;
	height: 43px;
	background-color: #bababa;
    border: solid 2px #707070;
    border-radius: 50%;
    margin-top:-22px;
    position:absolute;
`;
const NoReportText = styled.div`
    font-family: HelveticaNeue;
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
    width:361px;
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
    div {
        width:90%;
    }
`;

// const CommentBox = styled.div`
//     width: 90%;
// 	height: 33px;
// 	border-radius: 25px;
// 	background-color: rgba(256,256,256,0.56);
// `;
export default class ActiveForPlayer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    render() {
        return (
            <CardDetailContainer>
                <MediaQuery minWidth={768} className="container">
                    <ReportTabs>
                        <Tabs defaultIndex={0} onSelect={index => console.log(index)} className="tabs">
                            <TabList className="tab_list">
                                <Tab 
                                    className="tab" 
                                    selectedClassName="selected_tab"
                                >
                                    卡片內容
                                </Tab>
                                <Tab
                                    className="tab" 
                                    selectedClassName="selected_tab"
                                >
                                    雙人對戰
                                </Tab>
                            </TabList>
                            <div className="panel_container">
                                <TabPanel 
                                    className="panel" 
                                    selectedClassName="selected_panel"
                                >
                                    <CardContainer>
                                        <CardTitle>台灣茶道是一件很酷的事</CardTitle>
                                        <CardDays>遊戲天數：七天</CardDays>
                                        <ReportCycle>每一天回報</ReportCycle>
                                        <CardContent>
                                            關於台灣茶興起的歷史，我想可以透過簡單有趣的影片入門。觀看大約九分鐘，馬上台灣茶
    入門！

                                            看完影片後你可以截個圖或者寫下心得筆記回報，我會再往下回覆延伸閱讀，同學們起步走！
                                        </CardContent>
                                        <CardImage><img src={imageLogo} /></CardImage>
                                        <CardTags><img src={tagIcon} /><div className="ludo-tag" >喝茶</div></CardTags>
                                    </CardContainer>
                                </TabPanel>
                                <TabPanel 
                                    className="panel panel_report" 
                                    selectedClassName="selected_panel"
                                >   
                                    <ReportPanelWrapper>
                                        <CardTitle>台灣茶道是一件很酷的事</CardTitle>
                                        <CardDays>遊戲天數：七天</CardDays>
                                        <ReportTime>每一天回報</ReportTime>
                                        <ReportListContainer width={panel_width}>
                                            <ReportList width={panel_width/2}>
                                                <PlayerAvatar></PlayerAvatar>
                                                <SingleReport>
                                                    <ReportTime>2018/02/06 7:44 pm</ReportTime>
                                                    <ReportContent>
                                                        <div>根據同學的回覆，這邊要介紹一下紅茶市場的商品特性：紅茶貿易首先是東印度公司（英屬）在十八世紀將印度產地製造的紅茶輸入回大不列顛，英國將牛奶與紅茶結合後大幅度帶動畜牧業的發展，紅茶也成為貴族到平民百姓的常備飲品。而在這裡，我們所熟悉的『紅茶包』裝得並不像台灣的單品高檔茶是球狀或是完整葉子的。而是經過工業革命後，機械便能將發酵、乾燥後的紅茶葉直接切成細碎狀，在市場裡專有名詞工法叫CTC，這種以機器製造、拼配（依照不同比例調整以達到穩定產品為目的），混合碎葉與粉末等級兩種的工法。</div>
                                                    </ReportContent>
                                                    <CommentBox></CommentBox>
                                                </SingleReport>
                                                <SingleReport>測試中</SingleReport>
                                            </ReportList>
                                            <ReportList width={panel_width/2}>
                                                <PlayerAvatar></PlayerAvatar>
                                                <NoReportText>
                                                    <div>等等呢！玩家還在努力喔！</div>
                                                </NoReportText> 
                                            </ReportList>
                                            {/* <NoReportText>
                                                <div>搶先成為第一個回報的人吧！</div>
                                            </NoReportText> */}
                                        </ReportListContainer>
                                    </ReportPanelWrapper>
                                </TabPanel>
                            </div>
                        </Tabs>
                    <ExamlpeLinkButton>看範例</ExamlpeLinkButton>
                    <ReportButton url ="" label="我要回報"></ReportButton>
                    </ReportTabs>
                    
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </CardDetailContainer>
        );
    }
}

