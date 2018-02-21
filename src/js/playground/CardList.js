import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import axios from '../axios-config'
import QuickStart from './QuickStart';
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

class CardList extends Component {
    constructor(props) {
        super(props);
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

    getFilteredConditionListFromUrl(queryUrl) {
        return queryUrl.split('?')[1];
    }

    render() {
        const {
            ludoList,
        } = this.props;
        return (
            <CardListWrapper>
                <Masonry options={masonryOptions}>
                    <QuickStart />
                    <CardListContainer
                        keyPrefix="card"
                        ludoList={ludoList}
                    />
                </Masonry>
            </CardListWrapper>
        );
    }
}

export default CardList;
