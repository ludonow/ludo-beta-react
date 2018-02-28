import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import axios from '../axios-config'
import QuickStart from './QuickStart';
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';

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
        };
        this.getFilteredConditionListFromUrl = this.getFilteredConditionListFromUrl.bind(this);
        this.getIsAtTemplatePage = this.getIsAtTemplatePage.bind(this);
    }

    componentDidMount() {
        const filteredCondition = String(this.getFilteredConditionListFromUrl(this.props.location.search));
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
            const filteredCondition = String(this.getFilteredConditionListFromUrl(this.props.location.search));
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
        return search.includes('stage=0');
    }

    render() {
        const {
            ludoList,
        } = this.props;
        const {
            isAtTemplateListPage,
        } = this.state;
        return (
            <StyledCardListWrapper>
                <Masonry options={masonryOptions}>
                    <QuickStart />
                    <CardListContainer
                        isAtTemplateListPage={isAtTemplateListPage}
                        keyPrefix="card"
                        ludoList={ludoList}
                    />
                </Masonry>
            </StyledCardListWrapper>
        );
    }
}

export default CardList;
