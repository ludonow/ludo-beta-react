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
    columnWidth: 226,
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

    componentWillMount() {
        this.props.handleIsOpeningLudoListPage(true);
        this.props.handleShouldLudoListUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningLudoListPage(false);
        this.props.handleShouldLudoListUpdate(false);
    }

    handleCardStage(stage) {
        if (stage === 1) {
            return 'card-bottom__stage--opened';
        } else {
            return 'card-bottom__stage--closed';
        }
    }

    handleCardLink(event) {
        const cardIndex = Number(event.currentTarget.id.slice(3));
        const { ludo_id } = this.props.ludoList[cardIndex];
        browserHistory.push(`/ludo/${ludo_id}`);
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
                    ludoList.map((singleLudoObject, index) => {
                        const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                        const buttonClickHandler = isThisCardFlipped ? this.showFront : this.showBack;
                        return (
                            /* components/_form.scss */
                            <div
                                className="form-item"
                                key={`card-${index}`}
                            >
                                {/* form-card is defined in components/_form.scss, others are defined in components/_card.scss */}
                                <div 
                                    className={`form-card card--playground card-front${isThisCardFlipped ? '' : ' card-flip'}`}
                                    id={index}
                                    onClick={buttonClickHandler}
                                >
                                    <div className="card-top">
                                        <div className="card-star"></div>
                                        <div className="title">{singleLudoObject.title}</div>
                                        <div className="duration">{singleLudoObject.duration} days</div>
                                        <div className="card-marble">
                                            <img
                                                className="card-marble__icon"
                                                src={marbleIcon}
                                            />
                                            <span className="card-marble__number">{singleLudoObject.marbles}</span>
                                        </div>
                                    </div>
                                    <div className={`card-bottom ${categoryClassArray[singleLudoObject.category_id]}`}>
                                        <div className={`card-bottom__stage ${this.handleCardStage(singleLudoObject.stage)}`} />
                                    </div>
                                </div>
                                <div 
                                    className={`form-card card--playground card-back card-back--form-list${isThisCardFlipped ? " card-flip" : ""} ${categoryClassArray[singleLudoObject.category_id]}`}
                                    id={index}
                                    onClick={buttonClickHandler}
                                >
                                    <div className={categoryClassArray[singleLudoObject.category_id]}>
                                        <div className="card-star">
                                        </div>
                                        <div className="card-introduction">
                                            {
                                                String(singleLudoObject.introduction).length > 20 ?
                                                String(singleLudoObject.introduction).substring(0, 20) + ' ...'
                                                : String(singleLudoObject.introduction)
                                            }
                                        </div>
                                        <div className="card-hashtags">
                                            {
                                                // TODO: Use presentational component and proptypes to receive ludolist data
                                                Array.isArray(singleLudoObject.tags) && singleLudoObject.tags ?
                                                    singleLudoObject.tags.map( (tagString, tagIndex) => {
                                                        return (
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
                                    <div className={`card-bottom ${categoryClassArray[singleLudoObject.category_id]}`}>
                                        <img
                                            className="card-bottom__category-icon"
                                            src={iconArray[singleLudoObject.category_id]}
                                        />
                                        <div className={`card-bottom__triangle ${categoryClassArray[singleLudoObject.category_id]}`}>
                                            <div
                                                className={`card-bottom__text ${categoryClassArray[singleLudoObject.category_id]}`}
                                                id={`go-${index}`}
                                                onClick={this.handleCardLink}
                                            >
                                                go
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Masonry>
        );
    }
}