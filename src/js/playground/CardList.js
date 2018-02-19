import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import axios from '../axios-config'
import QuickStart from './QuickStart';
import Card from './Card';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 226,
    fitWidth: true
};

// styled compoennts
const CardListWrapper = styled.div`
    width: 1130px;
    @media (max-width: 560px) {
        width: 226px
    }

    @media (min-width: 560px) and (max-width: 704px) {
        width: 554px;
    }

    @media (min-width: 705px) and (max-width: 944px) {
        width: 678px;
    }

    @media (min-width: 945px) and (max-width: 1174px) {
        width: 904px;
    }

    @media (min-width: 1175px) {
        width: 1130px;
    }
`;

export default class CardList extends Component {
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
        }
    }

    componentWillMount() {
        this.props.handleShouldLudoListUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleShouldLudoListUpdate(false);
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
            <CardListWrapper>
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
            </CardListWrapper>
        );
    }
}
