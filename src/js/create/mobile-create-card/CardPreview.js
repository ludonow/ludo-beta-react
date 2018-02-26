import React, { Component } from 'react';

import { categories, categoryClasses, categoryIcons } from '../categories.js';

const usingCategories = categories['zh'];

export default class CardPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingFrontSide: false
        };
        this.handleCardFlip = this.handleCardFlip.bind(this);
    }

    handleCardFlip() {
        const {
            isShowingFrontSide
        } = this.state;

        this.setState({
            isShowingFrontSide: !isShowingFrontSide
        });
    }

    render() {
        const {
            isShowingFrontSide
        } = this.state;

        const {
            categoryId,
            duration,
            introduction,
            tags,
            title,
        } = this.props;

        return (
            <div className="card-preview">
                <div className="grid-item">
                    <div
                        className={`card card--playground card-front ${isShowingFrontSide ? 'card-flip' : ''}`}
                        onClick={this.handleCardFlip}
                    >
                        <div 
                            className={`card-back ${categoryClasses[categoryId-1]}`}
                            onClick={this.handleCardFlip}>
                        {/* three information: star(for user to highlight this card), category, and introduction */}
                        <div className="card-information">
                            <div className ="card-category">
                                {usingCategories[categoryId-1]}
                            </div>
                            <div className="card-introduction">
                                { String(introduction).length > 20 ?
                                    String(introduction).substring(0, 20) + ' ...'
                                    : String(introduction)
                                }
                            </div>
                            <div className="card-hashtags">
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
                            </div>
                        </div>
                        {/* the circle button for GO */}
                        <div className="card-button_circle">
                            <div className="card-button_text">
                                Go
                            </div>
                        </div>
                    </div>

                    {/* stage: shows red/green rectangle that indicates this card is available or not */}
                    <div className="card-top__stage card-top__stage--1"></div>
                        <div className="card-front-info">
                            <img
                                className="category-icon"
                                src={categoryIcons[categoryId-1]}
                            />
                            <div className="title">{title}</div>
                            <div className="duration">{duration} days</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
