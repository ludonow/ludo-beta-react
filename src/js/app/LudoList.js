import React from 'react';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];
import marbleIcon from '../../images/marble.png';

const categoryClassArray = [' others', ' lifestyle', ' read', ' exercise', ' study', ' new_skill', ' unmentionables', ' others'];

const masonryOptions = {
    itemSelector: ".form-item",
    columnWidth: 230,
    fitWidth: true
};

export default class LudoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flippedKey: [],
            isLastestCardFlip: false
        };
        this.handleCardLink = this.handleCardLink.bind(this);
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
        this.showTheOtherFace = this.showTheOtherFace.bind(this);
    }

    handleCardStage(stage) {
        if (stage == 1) {
            return `card-bottom__stage--opened`;
        } else {
            return `card-bottom__stage--closed`;
        }
    }

    handleCardBackClass(category_id) {
        return categoryClassArray[category_id];
    }

    handleCardBottomGoClass(category_id) {
        return categoryClassArray[category_id];
    }

    handleCardFrontTopClass(category_id) {
        return categoryClassArray[category_id];
    }

    handleCategoryIcon(category_id) {
        return iconArray[category_id];
    }

    handleCardLink(event) {
        const indexString = event.currentTarget.id.slice(3);
        if (indexString == '') {  // the latest create card
            const { currentFormValue } = this.props;
            const { ludo_id } = currentFormValue; 
            browserHistory.push(`/opened-for-starter/${ludo_id}`);
            return;
        } else {
            const cardIndex = Number(indexString);
            const specificCardData = this.props.ludoList[cardIndex];
            const { stage, player_id, starter_id } = specificCardData;
            const { currentUserId, getCurrentLudoData } = this.props;
            const { category_id, checkpoint, duration, introduction, ludo_id, marbles, tags, title } = specificCardData;
            const ludoForm = { category_id, checkpoint, duration, introduction, marbles, tags, title };
            getCurrentLudoData(ludo_id);
            if (stage == 1) {
                if(currentUserId == starter_id) {
                    browserHistory.push(`/opened-for-starter/${ludo_id}`);
                } else {
                    browserHistory.push(`/opened-for-bystander/${ludo_id}`);
                }
            } else {
                if(currentUserId == starter_id || currentUserId == player_id) {
                    browserHistory.push(`/active-for-player/${ludo_id}`);
                } else {
                    browserHistory.push(`/active-for-bystander/${ludo_id}`);
                }
            }
        }
    }

    showBack(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index != -1);
        if (!isElementInArray) {
            this.setState({
                flippedKey: flippedKey.concat([cardIndex])
            });
        }
    }

    showFront(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index != -1);
        if (isElementInArray) {
            flippedKey.splice(index, 1);
            this.setState({
                flippedKey
            });
        }
    }

    showTheOtherFace() {
        const { isLastestCardFlip } = this.state;
        this.setState({
            isLastestCardFlip: !isLastestCardFlip
        });
    }

    render() {
        const { isLastestCardFlip } = this.state;
        const { currentFormValue, shouldProfileUpdate, ludoList } = this.props;
        return (
                <Masonry options={masonryOptions}>
                    {
                        shouldProfileUpdate ?
                            <div className={`form-item`} key={`new-card`}>
                                <div 
                                    className={`form-card card-front ${isLastestCardFlip ? "" : "card-flip"}`}
                                    onClick={this.showTheOtherFace}
                                >
                                    <div className={`card-top ${this.handleCardFrontTopClass(currentFormValue.category_id)}`}>
                                        <div className="title">{currentFormValue.title}</div>
                                        <div className="duration">{currentFormValue.duration} days</div>
                                        <div className="card-marble">
                                            <img src={marbleIcon} className="card-marble__icon" />
                                            <span className="card-marble__number">{currentFormValue.marbles}</span>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <img className="card-bottom__category-icon" src={this.handleCategoryIcon(currentFormValue.category_id)} />
                                        <div className={`card-bottom__stage ${this.handleCardStage(currentFormValue.stage)}`} />
                                    </div>
                                </div>
                                <div 
                                    className={`form-card card-back ${isLastestCardFlip ? "card-flip" : ""} ${this.handleCardBackClass(currentFormValue.category_id)}`}
                                    onClick={this.showTheOtherFace}
                                >
                                    <div className={this.handleCardBackClass(currentFormValue.category_id)}>
                                        <div className="card-introduction">
                                            {String(currentFormValue.introduction).substring(0, 20) + ' ...'}
                                        </div>
                                        <div className="card-hashtags">
                                            {currentFormValue.tags}
                                        </div>
                                    </div>
                                    <div className={`card-bottom ${this.handleCardBottomGoClass(currentFormValue.category_id)}`}>
                                        <div className={`card-bottom__triangle ${this.handleCardBottomGoClass(currentFormValue.category_id)}`}>
                                            <div className={`card-bottom__text ${this.handleCardBottomGoClass(currentFormValue.category_id)}`}
                                                onClick={this.handleCardLink} id={`go`}
                                            >
                                                go
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null
                    }
                    {
                        ludoList.map( (data, index) => {
                            const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                            const buttonClickHandler = isThisCardFlipped ? this.showFront : this.showBack;
                            return (
                                <div className={`form-item`} key={`card-${index}`}>
                                    <div 
                                        className={`form-card card-front ${isThisCardFlipped ? "" : "card-flip"}`}
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
                                        className={`form-card card-back ${isThisCardFlipped ? "card-flip" : ""} ${this.handleCardBackClass(data.category_id)}`}
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
                                        <div className={`card-bottom ${this.handleCardBottomGoClass(data.category_id)}`}>
                                            <div className={`card-bottom__triangle ${this.handleCardBottomGoClass(data.category_id)}`}>
                                                <div className={`card-bottom__text ${this.handleCardBottomGoClass(data.category_id)}`}
                                                    onClick={this.handleCardLink} id={`go-${index}`}
                                                >
                                                    go
                                                </div>
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