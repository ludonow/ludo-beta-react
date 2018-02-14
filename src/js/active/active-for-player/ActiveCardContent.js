import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import tagIcon from '../../../images/active/tag-icon.png';
import ReportButton from '../ReportButton';
import CommentBox from '../CommentBox';

const panel_width = 609;

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

export default class ActiveCardContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentFormValue = this.props.router_currentFormValue;
        const { category_id, checkpoint, duration, introduction, marbles, tags, title } = currentFormValue;
        
        return  (
            <CardContainer>
                <CardTitle>{title}</CardTitle>
                <CardDays>遊戲天數：{duration}天</CardDays>
                <ReportCycle>每一天回報</ReportCycle>
                <CardContent>{introduction}</CardContent>
                <CardImage><img /></CardImage>
                <CardTags><img src={tagIcon} />
                    {
                        tags.length ?
                            tags.map((tagString, index) => {
                                return (
                                    <div className="ludo-tag" key={`ludo-tag-${index}`}>
                                        {tagString}
                                    </div>
                                );
                            })
                        : null
                    }
                </CardTags>
            </CardContainer>
        )
    }
}