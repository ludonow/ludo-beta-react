import React, { Component } from 'react';
import styled from 'styled-components';

import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';

const Wrapper = styled(CardListWrapper)`
    background-color: red;
`;

class MyCardList extends Component {
    render() {
        const {
            handleShouldLudoListUpdate,
            location,
            ludoList,
        } = this.props;
        return (
            <Wrapper>
                <CardListContainer
                    keyPrefix="my-card"
                    ludoList={ludoList}
                />
            </Wrapper>
        );
    }
}

export default MyCardList;
