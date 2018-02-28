import React, { Component } from 'react';
import styled from 'styled-components';

import {
    bonusPeriodIconList,
    getBonusPeriodIndexFromPeriod,
    periodList
} from './bonusPeriod';
import { labelList } from './reportInterval';
import Button from '../components/Button';
import { CustomScrollBarCSS } from '../baseStyle';

const BackPeriodIconWrapper = styled.div`
    margin-top: 10px;

    img {
        height: 35px;
        width: 40px;
    }
`;

const FrontIconWrapper = styled.div`
    img {
        height: 100px;
    }
`;

const TemplateCardBorderTopWrapper = styled.div`
    align-items: center;
    background-color: rgba(0,0,0,0.8);
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

const TemplateInfo = styled.div`
    margin: 10px 0;
`;
const IntroWrapper = TemplateInfo.extend`
    font-size: 12px;
    line-height: 30px;
    max-height: 60px;
    /* overflow-y: auto;
    white-space: pre-wrap;

    ${CustomScrollBarCSS} */
`;

const TemplateInfoWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 200px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const TemplateCardBorderTop = ({
    bonusPeriodIndex,
    isShowingFrontSide,
}) => (
    <TemplateCardBorderTopWrapper
        isShowingFrontSide={isShowingFrontSide}
    >
        {
            periodList[bonusPeriodIndex].label
        }
    </TemplateCardBorderTopWrapper>
);

export default class CardPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bonusPeriodIndex: 4,
            isShowingFrontSide: false,
            period: 'default',
        };
        this.handleCardFlip = this.handleCardFlip.bind(this);
    }

    componentDidMount() {
        if (this.props.period && this.props.period !== this.state.period) {
            const bonusPeriodIndex = getBonusPeriodIndexFromPeriod(this.props.period);
            this.setState({
                bonusPeriodIndex,
                period: this.props.period,
            });
        }
    }

    handleCardFlip() {
        this.setState(
            prevState => ({
                isShowingFrontSide: !prevState.isShowingFrontSide,
            })
        );
    }

    render() {
        const {
            bonusPeriodIndex,
            isShowingFrontSide,
        } = this.state;

        const {
            duration,
            interval,
            introduction,
            tags,
            title,
        } = this.props;

        return (
            <Wrapper>
                <div className="grid-item">
                    <div
                        className={`card card--playground card-front ${isShowingFrontSide ? 'card-flip' : ''}`}
                        onClick={this.handleCardFlip}
                    >
                        <div className="card-back">
                            <BackPeriodIconWrapper>
                                <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                            </BackPeriodIconWrapper>
                            <TemplateInfoWrapper>
                                <IntroWrapper>
                                    { String(introduction).length > 30 ?
                                        String(introduction).substring(0, 30) + ' ...'
                                        : String(introduction)
                                    }
                                </IntroWrapper>
                                <TemplateInfo>
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
                                </TemplateInfo>
                                <TemplateInfo>
                                    <Button
                                        backgroundColor="#FF7171 !important"
                                        fontSize="14px !important"
                                        label={labelList[Number(interval)-1]}
                                        padding="5px 0 !important"
                                        width="100px !important"
                                    />
                                </TemplateInfo>
                            </TemplateInfoWrapper>
                            {/* the circle button for GO */}
                            <div className="card-button_circle">
                                <div className="card-button_text">
                                    Go
                                </div>
                            </div>
                        </div>
                        {/* stage: shows red/green rectangle that indicates this card is available or not */}
                        <TemplateCardBorderTop
                            bonusPeriodIndex={bonusPeriodIndex}
                            isShowingFrontSide={isShowingFrontSide}
                        />
                        <div className="card-front-info">
                            <FrontIconWrapper>
                                <img src={bonusPeriodIconList[bonusPeriodIndex]} />
                            </FrontIconWrapper>
                            <div className="title">{title}</div>
                            <div className="duration">{duration}天</div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}
