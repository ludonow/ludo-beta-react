import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { baseUrl } from '../baseurl-config';
import {
    bonusPeriodIconList,
    getBonusPeriodIndexFromPeriod,
    periodList
} from './bonusPeriod';

export const CardBackBackgroundColorList = [
    '#FFFF9F',
    '#FFEB50',
    '#FFA53C',
    '#409EC1',
    '#98D643',
];

export const CardBorderInfoList = [
    {
        backgroundColor: '#000000',
        label: '模板',
    },
    {
        backgroundColor: '#63C16A',
        label: '等待對手',
    },
    {
        backgroundColor: '#FF5050',
        label: '進行中',
    },
    {
        backgroundColor: '#838383',
        label: '已結束',
    },
];

export const BackPeriodIconWrapper = styled.div`
    padding-top: 10px;

    img {
        height: 35px;
        width: 40px;
    }
`;

export const CardBackWrapper = styled.div`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
`;

const CardBorderTopWrapper = styled.div`
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,0.8)'};
    color: white;
    display: flex;
    font-size: 12px;
    height: 25px;
    justify-content: center;
    position: absolute;
    top: 0;
    opacity: ${props => props.isShowingFrontSide ? '100': '0'};
    width: 100%;
`;

export const FrontIconWrapper = styled.div`
    img {
        height: 100px;
    }
`;

const TemplateCardBorderTopWrapper = styled.div`
    align-items: center;
    background-color: ${props => props.isAtTemplatePage ? '#63C16A' : 'rgba(0,0,0,0.8)'};
    color: white;
    display: flex;
    font-size: 12px;
    height: 25px;
    justify-content: center;
    position: absolute;
    top: 0;
    opacity: ${props => props.isShowingFrontSide ? '0': '100'};
    width: 100%;
`;

export const CardBorderTop = ({
    bonusPeriodIndex,
    isShowingFrontSide,
    stage,
}) => (
    <CardBorderTopWrapper
        backgroundColor={CardBorderInfoList[stage].backgroundColor}
        isShowingFrontSide={isShowingFrontSide}
    >
        {
            stage === 0 ?
                periodList[bonusPeriodIndex].label
            :
                CardBorderInfoList[stage].label
        }
    </CardBorderTopWrapper>
);

export const TemplateCardBorderTop = ({
    bonusPeriodIndex,
    isAtTemplatePage,
    isShowingFrontSide,
}) => (
    <TemplateCardBorderTopWrapper
        isAtTemplatePage={isAtTemplatePage}
        isShowingFrontSide={isShowingFrontSide}
    >
        {
            isAtTemplatePage ?
                CardBorderInfoList[1].label
            :
                periodList[bonusPeriodIndex].label
        }
    </TemplateCardBorderTopWrapper>
);

/* components/_card.scss */
const Card = ({
    handleClick,
    index,
    isAtTemplateListPage,
    isThisCardFlipped,
    singleLudoObject,
}) => {
    const bonusPeriodIndex = getBonusPeriodIndexFromPeriod(singleLudoObject.period);
    return (
        <div className="grid-item">
            <div
                className={`card card--playground card-front ${isThisCardFlipped ? 'card-flip' : ''}`}
                id={index}
                onClick={handleClick}
            >
                <CardBackWrapper
                    backgroundColor={CardBackBackgroundColorList[bonusPeriodIndex]} 
                    className="card-back"
                >
                    <BackPeriodIconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </BackPeriodIconWrapper>
                    {/* three information: introduction, hashtags, and interval */}
                    <div className="card-information">
                        <div className="card-introduction">
                            { String(singleLudoObject.introduction).length > 30 ?
                                String(singleLudoObject.introduction).substring(0, 30) + ' ...'
                                : String(singleLudoObject.introduction)
                            }
                        </div>
                        <div className="card-hashtags">
                            {
                                // TODO: Use presentational component and proptypes to receive ludolist data
                                Array.isArray(singleLudoObject.tags) && singleLudoObject.tags ?
                                    singleLudoObject.tags.map((tagString, tagIndex) => {
                                        return (
                                            /* components/_tags.scss */
                                            <span
                                                className="react-tagsinput-tag--card"
                                                key={`tag-${tagIndex}`}
                                            >
                                                {tagString}
                                            </span>
                                        );
                                    })
                                : null
                            }
                        </div>
                    </div>
                    {/* the circle button for GO */}
                    <Link
                        className="card-button_circle"
                        to={isAtTemplateListPage ? `${baseUrl}/template/${singleLudoObject.ludo_id}` : `${baseUrl}/ludo/${singleLudoObject.ludo_id}`}
                    >
                        <div className="card-button_text">
                            Go
                        </div>
                    </Link>
                </CardBackWrapper>

                <div className="card-front-info">
                    <CardBorderTop
                        bonusPeriodIndex={bonusPeriodIndex}
                        isShowingFrontSide={!isThisCardFlipped}
                        stage={singleLudoObject.stage}
                    />
                    <FrontIconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </FrontIconWrapper>
                    <div className="title">{singleLudoObject.title}</div>
                    <div className="duration">{singleLudoObject.duration}天</div>
                </div>
                <div className="card-views">{singleLudoObject.views}</div>
            </div>
        </div>
    );
}

export default Card;
