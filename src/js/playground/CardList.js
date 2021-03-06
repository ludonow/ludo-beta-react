import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import axios from '../axios-config'
import QuickStart from './QuickStart';
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';
import CardListLoadingIcon from '../components/CardListLoadingIcon';

const StyledCardListWrapper = CardListWrapper.extend`
    @media (max-width: 768px) {
        margin: 0 auto;
    }
`;

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAtTemplateListPage: false,
            isDataFetched: false,
        };
        this.getFilteredConditionListFromUrl = this.getFilteredConditionListFromUrl.bind(this);
        this.getIsAtTemplatePage = this.getIsAtTemplatePage.bind(this);
    }

    componentDidMount() {
        const filteredCondition = this.getFilteredConditionListFromUrl(this.props.location.search);
        this.props.getFilteredLudoList(filteredCondition);
        this.setState({
            isAtTemplateListPage: this.getIsAtTemplatePage(filteredCondition),
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldLudoListUpdate) {
            this.props.handleShouldLudoListUpdate(false);
        }
        if (prevProps.location.search !== this.props.location.search) {
            const filteredCondition = this.getFilteredConditionListFromUrl(this.props.location.search);
            this.props.resetEvaluatedKey();
            this.props.getFilteredLudoList(filteredCondition);
            this.setState({
                isAtTemplateListPage: this.getIsAtTemplatePage(filteredCondition),
            });
        }
    }

    getFilteredConditionListFromUrl(queryUrl) {
        return queryUrl.split('?')[1];
    }

    getIsAtTemplatePage(search) {
        return String(search).includes('stage=0');
    }

    render() {
        const {
            isCardListFetched,
            isLoadingCardList,
            ludoList,
        } = this.props;
        const {
            isAtTemplateListPage,
        } = this.state;
        return (
            <StyledCardListWrapper>
                <CardListLoadingIcon isLoadingCardList={isLoadingCardList} />
                {
                    !isLoadingCardList && isCardListFetched ?
                        <Masonry options={masonryOptions}>
                            <QuickStart />
                            <CardListContainer
                                isAtTemplateListPage={isAtTemplateListPage}
                                isCardListFetched={isCardListFetched}
                                keyPrefix="card"
                                ludoList={ludoList}
                            />
                        </Masonry>
                    : null
                }
            </StyledCardListWrapper>
        );
    }
}

export default CardList;
