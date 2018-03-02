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
        this.showBack = this.showBack.bind(this);
        this.showFront = this.showFront.bind(this);
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
            emptyText,
            isAtTemplateListPage,
            isCardListFetched,
            keyPrefix,
            ludoList,
            search,
        } = this.props;

        const queryTarget = (search.includes('stage=0')) ? '模板' : '卡片';
        const defaultEmptyText = `目前沒有${queryTarget}喔，點擊 ⊕ 按鈕創建一個吧！`;
        const renderedEmptyText = emptyText ? emptyText : defaultEmptyText;

        return (
            <div>
                {
                    isCardListFetched && ludoList.length > 0 ?
                        ludoList.map((singleLudoObject, index) => {
                            const isThisCardFlipped = (this.state.flippedKey.indexOf(index) != -1);
                            const handleClick = isThisCardFlipped ? this.showFront : this.showBack;
                            return (
                                <Card
                                    handleClick={handleClick}
                                    index={index}
                                    isAtTemplateListPage={isAtTemplateListPage}
                                    isThisCardFlipped={isThisCardFlipped}
                                    key={`${keyPrefix}-${index}`}
                                    singleLudoObject={singleLudoObject}
                                />
                            );
                        })
                    : null
                }
                {
                    isCardListFetched && ludoList.length === 0 ?
                        <EmptyTextWrapper>
                            {renderedEmptyText}
                        </EmptyTextWrapper>
                    : null
                }
            </div>
        );
    }
}

CardListContainer.defaultProps = {
    search: ''
};

export default CardListContainer;
