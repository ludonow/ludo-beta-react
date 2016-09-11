import React from 'react';
import { Link } from "react-router";
import Masonry from 'react-masonry-component';

import OpenedFormOfBystander from './OpenedFormOfBystander';

import lifestyleIcon from '../../../images/category_icon/lifestyle.svg';
import readIcon from '../../../images/category_icon/read.svg';
import exerciseIcon from '../../../images/category_icon/exercise.png';
import studyIcon from '../../../images/category_icon/study.svg';
import newSkillIcon from '../../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../../images/category_icon/unmentionables.png';
import othersIcon from '../../../images/category_icon/others.svg';

import marbleIcon from '../../../images/marble.png';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 210,
    fitWidth: true,
    stamp: ".grid-item--ludo-detail-information"
};

export default class CreateLudoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLudoAuthentication: ``,
            flippedKey: []
        };
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
    }

    componentDidMount() {
        const { handleLudoListUpdate } = this.props;
        handleLudoListUpdate();
    }

    handleCardClick(cardIndex) {
        let index = String(cardIndex);
        const state = this.state;
        this.setState(
            Object.assign(state, {
                flippedKey: index
            })
        );
    }

    handleCardStage(stage) {
        if (stage == 1) {
            return `card-bottom__stage--opened`;
        } else {
            return `card-bottom__stage--closed`;
        }
    }

    handleCardBackClass(category_id) {
        switch (category_id) {
            case 1:
                return `lifestyle`;
            case 2:
                return `read`;
            case 3:
                return `exercise`;
            case 4:
                return `study`;
            case 5:
                return `new_skill`;
            case 6:
                return `unmentionables`;
            case 7:
                return `others`;
            default:
                return `lifestyle`;
        }
    }

    handleCardBottomGoClass(category_id) {
        switch (category_id) {
            case 1:
                return `lifestyle`;
            case 2:
                return `read`;
            case 3:
                return `exercise`;
            case 4:
                return `study`;
            case 5:
                return `new_skill`;
            case 6:
                return `unmentionables`;
            case 7:
                return `others`;
            default:
                return `lifestyle`;
        }
    }

    handleCardFrontTopClass(category_id) {
        switch (category_id) {
            case 1:
                return `lifestyle`;
            case 2:
                return `read`;
            case 3:
                return `exercise`;
            case 4:
                return `study`;
            case 5:
                return `new_skill`;
            case 6:
                return `unmentionables`;
            case 7:
                return `others`;
            default:
                return `lifestyle`;
        }
    }

    handleCategoryIcon(category_id) {
        switch (category_id) {
            case 1:
                return lifestyleIcon;
            case 2:
                return readIcon;
            case 3:
                return exerciseIcon;
            case 4:
                return studyIcon;
            case 5:
                return newSkillIcon;
            case 6:
                return unmentionablesIcon;
            case 7:
                return othersIcon;
            default:
                return lifestyleIcon;
        }
    }

    showBack(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index != -1);
        if (!isElementInArray) {
            flippedKey.push(cardIndex);
        };
        this.setState(
            Object.assign(this.state, {
                flippedKey
            })
        );

        const specificCardData = this.props.rawData[cardIndex];
        const { stage, starterId } = specificCardData;
        const { currentUserId } = this.props;
        console.log('specificCardData', specificCardData);
        if (stage == 1) {
            if(currentUserId == starterId) {
                console.log('Opened starter');
                this.setState(
                    Object.assign(this.state, {
                        currentLudoAuthentication: `opened-for-starter`
                    })
                );
            } else {
                console.log('Opened bystander');
                this.setState(
                    Object.assign(this.state, {
                        currentLudoAuthentication: `opened-for-bystander`
                    })
                );
            }
        } else {
            if(currentUserId == starterId) {
                console.log('Active player');
                this.setState(
                    Object.assign(this.state, {
                        currentLudoAuthentication: `Active`
                    })
                );
            } else {
                console.log('Active bystander');
                this.setState(
                    Object.assign(this.state, {
                        currentLudoAuthentication: `Active`
                    })
                );
            }
        }
    }

    showFront(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index != -1);
        if (isElementInArray) {
            flippedKey.splice(index, 1);
        };
        this.setState(
            Object.assign(this.state, {
                flippedKey
            })
        );
    }

    render() {
        const { currentLudoAuthentication } = this.state;
        return (
            <Masonry
                className="grid"
                options={masonryOptions} >
                <OpenedFormOfBystander {...this.props} />
                {
                    this.props.rawData.map( (data, index) => {
                        const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                        const buttonClickHandler = isThisCardFlipped ? this.showFront : this.showBack;
                        return (
                            <div className={`grid-item`} key={`card-${index}`}>
                                <div 
                                    className={`card card-front ${isThisCardFlipped ? "" : "card-flip"}`}
                                    id={index}
                                    onClick={buttonClickHandler}
                                >
                                    <div className={`card-top ${this.handleCardFrontTopClass(data.category_id)}`}>
                                        <div className="title">{data.title}</div>
                                        <div className="duration">{data.duration} days</div>
                                        <div className="card-marble">
                                            <img src={marbleIcon} className="card-marble__icon" />
                                            <span className="card-marble__number">{data.marbles}</span>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <img className="card-bottom__category-icon" src={this.handleCategoryIcon(data.category_id)} />
                                        <div className={`card-bottom__stage ${this.handleCardStage(data.stage)}`} />
                                    </div>
                                </div>
                                <div 
                                    className={`card card-back ${isThisCardFlipped ? "card-flip" : ""} ${this.handleCardBackClass(data.category_id)}`}
                                    id={index}
                                    onClick={buttonClickHandler}
                                >
                                    <div className={this.handleCardBackClass(data.category_id)}>
                                        <div className="card-introduction">
                                            {String(data.introduction).substring(0, 20) + ' ...'}
                                        </div>
                                        <div className="card-hashtags">
                                            {data.tags}
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <div className={`card-bottom__triangle ${this.handleCardBottomGoClass(data.category_id)}`}>
                                            <div className={`card-bottom__text ${this.handleCardBottomGoClass(data.category_id)}`}>go</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Masonry>
        );
    }
};