import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';

import axios from '../axios-config'
import QuickStart from './QuickStart';
import Card from './Card';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 226,
    fitWidth: true
};

export default class PlaygroundLudoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flippedKey: []
        };
        this.handleCardStage = this.handleCardStage.bind(this);
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
    }

    componentDidMount() {
        const filteredCondition = this.getFilteredConditionListFromUrl(this.props.location.search);
        this.props.getFilteredLudoList(filteredCondition);
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldLudoListUpdate) {
            this.props.handleShouldLudoListUpdate(false);
        }
        if (prevProps.location.search !== this.props.location.search) {
            const filteredCondition = this.getFilteredConditionListFromUrl(this.props.location.search);
            this.props.getFilteredLudoList(filteredCondition);
            this.props.handleNavbarToggle(false);
        }
    }

    componentWillMount() {
        this.props.handleShouldLudoListUpdate(true);
        this.props.handleNavbarToggle(false);
    }

    componentWillUnmount() {
        this.props.handleShouldLudoListUpdate(false);
        this.props.handleNavbarToggle(false);
    }

    getFilteredConditionListFromUrl(queryUrl) {
        return queryUrl.split('?')[1];
    }

    handleCardStage(stage) {
        switch (stage) {
            case 0:
                return 'card-top__stage--0';
                break;
            case 1:
                return 'card-top__stage--1';
                break;
            case 2:
                return 'card-top__stage--2';
                break;
            case 3:
                return 'card-top__stage--3';
                break;
            default:
                return 'card-top__stage--0';
                break;
        }
    }

    showBack(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index !== -1);
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
        const isElementInArray = (index !== -1);
        if (isElementInArray) {
            flippedKey.splice(index, 1);
            this.setState({
                flippedKey
            });
        }
    }

    render() {
        return (
            <Masonry options={masonryOptions}>
                <QuickStart />
                {
                    this.props.ludoList.map((singleLudoObject, index) => {
                        const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                        const handleClick = isThisCardFlipped ? this.showFront : this.showBack;
                        return (
                            <Card
                                handleCardStage={this.handleCardStage}
                                handleClick={handleClick}
                                index={index}
                                isThisCardFlipped={isThisCardFlipped}
                                key={`card-${index}`}
                                singleLudoObject={singleLudoObject}
                            />
                        );
                    })
                }
            </Masonry>
        );
    }
}
