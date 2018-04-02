import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { baseUrl } from '../baseurl-config';
import {
    bonusPeriodIconList,
    getBonusPeriodIndexFromPeriod,
    periodList
} from '../assets/bonusPeriod';
import { labelList } from '../assets/reportInterval';
import viewIcon from '../../images/eye.svg';
import Button from './Button';
import CircleButton from './CircleButton';

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
        width: 40px;
    }
`;

export const CardBackWrapper = styled.div`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
`;

const getEntryUrlOfCard = (stage, id) => {
    switch (stage) {
        case 0:
            return `${baseUrl}/template/${id}`;
        case 1:
            return `${baseUrl}/ludo/${id}/card-content`;
        case 2:
            return `${baseUrl}/ludo/${id}/report-list`;
        case 3:
            return `${baseUrl}/ludo/${id}/report-list`;
    }
}

const CardBorderTopWrapper = styled.div`
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(0,0,0,0.8)'};
    color: white;
    display: flex;
    font-size: 12px;
    height: 25px;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    opacity: ${props => props.isShowingFrontSide ? '100': '0'};
    width: 100%;
`;

const CardFrontWrapper = styled.div`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
    text-align: center;
`;

const CardWrapper = styled.div`
    border-color: ${props => props.isHistory ? '#838383' : 'rgba(0, 0, 0, 0.8)'};
`;

export const Duration = styled.div`
    margin-bottom: 15px;
`;

const EyeIconWrapper = styled.div`
    align-items: center;
    display: flex;
    margin-right: 3px;

    img {
        width: 15px;
    }
`;

export const FrontIconWrapper = styled.div`
    width: 100px;

    img {
        height: 100%;
        width: 100%;
    }
`;

const Info = styled.div`
    margin: 10px 0;
    width: 100%;
`;
const IntroWrapper = Info.extend`
    font-size: 12px;
    line-height: 30px;
`;

const InfoWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    padding: 0 20px;
`;

const LinkWrapper = styled.div`
    a.card-button_circle {
        box-shadow: ${props => props.isHistory ? '0 0 0 2px #838383' : '0 0 0 2px black'};
    }
`;

const TemplateCardBorderTopWrapper = CardBorderTopWrapper.extend`
    background-color: ${props => props.isAtTemplatePage ? '#63C16A' : 'rgba(0,0,0,0.8)'};
    opacity: ${props => props.isShowingFrontSide ? '0': '100'};
`;

export const Title = styled.div`
    font-size: 18px;
    margin: 20px;
    width: calc(100% - 40px);
`;

const ViewNumberWrapper = styled.div`
    align-items: center;
    display: flex;
`;

const ViewWrapper = styled.div`
    backface-visibility: hidden;
    bottom: 5px;
    display: inline-flex;
    font-size: 12px;
    opacity: ${props => props.isShowingFrontSide ? '100': '0'};
    position: absolute;
    right: 5px;
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
    const {
        duration,
        interval,
        introduction,
        ludo_id,
        period,
        stage,
        tags,
        title,
        views,
    } = singleLudoObject;

    const bonusPeriodIndex = getBonusPeriodIndexFromPeriod(period);
    const renderedInterval = interval ? Number(interval) : 1;
    return (
        <div className="grid-item">
            <CardWrapper
                className={`card card--playground card-front ${isThisCardFlipped ? 'card-flip' : ''}`}
                id={index}
                isHistory={stage === 3}
                onClick={handleClick}
            >
                <CardBackWrapper
                    backgroundColor={(stage === 0) ? 'white' : CardBackBackgroundColorList[bonusPeriodIndex]}
                    className="card-back"
                >
                    <BackPeriodIconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </BackPeriodIconWrapper>
                    {/* three information: introduction, hashtags, and interval */}
                    <InfoWrapper>
                        <IntroWrapper>
                            { String(introduction).length > 30 ?
                                String(introduction).substring(0, 30) + ' ...'
                                : String(introduction)
                            }
                        </IntroWrapper>
                        <Info>
                            {
                                // TODO: Use presentational component and proptypes to receive ludolist data
                                Array.isArray(tags) && tags ?
                                    tags.map((tagString, tagIndex) => {
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
                        </Info>
                        <Info>
                            <Button
                                backgroundColor="#FF7171 !important"
                                fontSize="14px !important"
                                label={labelList[renderedInterval - 1]}
                                padding="5px 0 !important"
                                width="100px !important"
                            />
                        </Info>
                    </InfoWrapper>
                    <LinkWrapper isHistory={stage === 3}>
                        <Link
                            className="card-button_circle"
                            to={getEntryUrlOfCard(stage, ludo_id)}
                        >
                            <CircleButton stage={stage} />
                        </Link>
                    </LinkWrapper>
                </CardBackWrapper>

                <CardFrontWrapper
                    backgroundColor={(stage === 2) ? CardBackBackgroundColorList[bonusPeriodIndex] : 'white'}
                    className="card-front-info"
                >
                    <CardBorderTop
                        bonusPeriodIndex={bonusPeriodIndex}
                        isShowingFrontSide={!isThisCardFlipped}
                        stage={stage}
                    />
                    <FrontIconWrapper>
                        <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                    </FrontIconWrapper>
                    <Title>{title}</Title>
                    <Duration>{duration}天</Duration>
                </CardFrontWrapper>
                <ViewWrapper isShowingFrontSide={!isThisCardFlipped}>
                    <EyeIconWrapper>
                        <img src={viewIcon} />
                    </EyeIconWrapper>
                    <ViewNumberWrapper>
                        {views}
                    </ViewNumberWrapper>
                </ViewWrapper>
            </CardWrapper>
        </div>
    );
}

export default Card;
