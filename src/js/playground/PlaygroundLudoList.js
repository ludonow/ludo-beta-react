import React from 'react';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';

import QuickStart from './QuickStart';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';

import marbleIcon from '../../images/marble.png';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 210,
    fitWidth: true
};

export default class PlaygroundLudoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flippedKey: []
        };
        this.handleCardLink = this.handleCardLink.bind(this);
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('PlaygroundLudoList componentWillReceiveProps');
        if(this.props.ludoList.length != nextProps.ludoList.length || this.props.isgettingLatestData) {
            console.log('PlaygroundLudoList componentWillReceiveProps getLatestLudoList');
            // this.props.getLatestLudoList();
        }
    }

    handleCardStage(stage) {
        const ludo_stage = Number(stage); 
        if (ludo_stage == 1) {
            return `card-bottom__stage--opened`;
        } else {
            return `card-bottom__stage--closed`;
        }
    }

    handleCardBackClass(category_id) {
        const id = Number(category_id); 
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
        const id = Number(category_id); 
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
        const id = Number(category_id); 
        switch (category_id) {
            case 1:
                return ` lifestyle`;
            case 2:
                return ` read`;
            case 3:
                return ` exercise`;
            case 4:
                return ` study`;
            case 5:
                return ` new_skill`;
            case 6:
                return ` unmentionables`;
            case 7:
                return ` others`;
            default:
                return ` lifestyle`;
        }
    }

    handleCategoryIcon(category_id) {
        const id = Number(category_id); 
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

    handleCardLink(event) {
        const cardIndex = Number(event.currentTarget.id.slice(3));
        const specificCardData = this.props.ludoList[cardIndex];
        const { stage, player_id, starter_id } = specificCardData;
        const { currentUserId, updateCurrentFormValue, getCurrentLudoData, handleIsgettingLatestData } = this.props;
        const { category_id, checkpoint, duration, introduction, ludo_id, marbles, tags, title } = specificCardData;
        const ludoForm = { category_id, checkpoint, duration, introduction, marbles, tags, title };
        handleIsgettingLatestData(false);
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

    showBack(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index != -1);
        if (!isElementInArray) {
            this.setState({
                flippedKey: flippedKey.concat([cardIndex])
            })
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

    render() {
        return (
            <div className="main-container">
                <Masonry
                    options={masonryOptions} >
                    <QuickStart />
                    { 
                        this.props.ludoList.map( (data, index) => {
                            const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                            const buttonClickHandler = isThisCardFlipped ? this.showFront : this.showBack;
                            return (
                                <div className={`grid-item`} key={`card-${index}`}>
                                    <div 
                                        className={`card card-front${isThisCardFlipped ? "" : " card-flip"}`}
                                        id={index}
                                        onClick={buttonClickHandler}
                                    >
                                        <div className={`card-top${this.handleCardFrontTopClass(data.category_id)}`}>
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
                                        className={`card card-back${isThisCardFlipped ? " card-flip" : ""} ${this.handleCardBackClass(data.category_id)}`}
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
            </div>
        );
    }
}