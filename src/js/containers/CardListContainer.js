import React, { Component } from 'react';
import styled from 'styled-components';

import Card from '../components/Card';

const EmptyTextWrapper = styled.div`
    color: white;
    font-size: 16px;
    margin-top: 10px;
`;

class CardListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flippedKey: [],
            isInfiniteLoading: false,
            lastEvaluatedKey: {},
            ludoList: [],
        };
        this.handleCardStage = this.handleCardStage.bind(this);
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
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
            this.setState({ flippedKey: flippedKey.concat([cardIndex]) })
        }
    }

    showFront(event) {
        const cardIndex = Number(event.currentTarget.id);
        const { flippedKey } = this.state;
        const index = flippedKey.indexOf(cardIndex);
        const isElementInArray = (index !== -1);
        if (isElementInArray) {
            flippedKey.splice(index, 1);
            this.setState({ flippedKey });
        }
    }

    render() {
        const {
            keyPrefix,
            ludoList,
            search,
        } = this.props;

        const queryTarget = (search.includes('stage=0')) ? '模板' : '卡片';

        return (
            <div>
                {
                    ludoList.length > 0 ?
                        ludoList.map((singleLudoObject, index) => {
                            const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                            const handleClick = isThisCardFlipped ? this.showFront : this.showBack;
                            return (
                                <Card
                                    handleCardStage={this.handleCardStage}
                                    handleClick={handleClick}
                                    index={index}
                                    isThisCardFlipped={isThisCardFlipped}
                                    key={`${keyPrefix}-${index}`}
                                    singleLudoObject={singleLudoObject}
                                />
                            );
                        })
                    :
                        <EmptyTextWrapper>
                            目前沒有{queryTarget}喔，創建一個吧！
                        </EmptyTextWrapper>
                }
            </div>
        );
    }
}

CardListContainer.defaultProps = {
    search: ''
};

export default CardListContainer;
