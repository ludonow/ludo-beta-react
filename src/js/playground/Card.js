import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Masonry from 'react-masonry-component';

import lifestyleIcon from '../../images/category_icon/lifestyle.svg';
import readIcon from '../../images/category_icon/read.svg';
import exerciseIcon from '../../images/category_icon/exercise.png';
import studyIcon from '../../images/category_icon/study.svg';
import newSkillIcon from '../../images/category_icon/new_skill.svg';
import unmentionablesIcon from '../../images/category_icon/unmentionables.png';
import othersIcon from '../../images/category_icon/others.svg';
const iconArray = [othersIcon, lifestyleIcon, readIcon, exerciseIcon, studyIcon, newSkillIcon, unmentionablesIcon, othersIcon];

const categoryClassArray = ['others', 'lifestyle', 'read', 'exercise', 'study', 'new_skill', 'unmentionables', 'others'];
const category = ['其它', '生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起的', '其它']
const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 226,
    fitWidth: true
};

/* components/_card.scss */
const Card = ({
    handleCardStage,
    handleClick,
    index,
    isThisCardFlipped,
    singleLudoObject
}) => (
    <div className="grid-item">
        <div
            className={`card card--playground card-front ${isThisCardFlipped ? 'card-flip' : ''}`}
            id={index}
            onClick={handleClick}
        >
            <div 
                className={`card-back ${categoryClassArray[singleLudoObject.category_id]}`}
                id={index}
                onClick={handleClick}>
            {/* three information: star(for user to highlight this card), category, and introduction*/}
            <div className="card-information">
                <div className="card-star"></div>
                <div className ="card-category">
                    {category[singleLudoObject.category_id]}
                </div>
                <div className="card-introduction">
                    { String(singleLudoObject.introduction).length > 20 ?
                        String(singleLudoObject.introduction).substring(0, 20) + ' ...'
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
                to={`/ludo/${singleLudoObject.ludo_id}`}
            >
                <div className="card-button_text">
                    Go
                </div>
            </Link>
        </div>

        {/* stage: shows red/green rectangle that indicates this card is available or not */}
        <div className={`card-top__stage ${handleCardStage(singleLudoObject.stage)}`} ></div>
            <div className="card-front-info">
                <div className="card-star"></div>
                <img className="category-icon"
                    src={iconArray[singleLudoObject.category_id]}
                />
                <div className="title">{singleLudoObject.title}</div>
                <div className="duration">{singleLudoObject.duration} days</div>
            </div>
            <div className="card-views">{singleLudoObject.views}</div>
        </div>
    </div>
);

export default Card;
