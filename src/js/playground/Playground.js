import React, { Component } from 'react';
import styled from 'styled-components';

import CardList from './CardList';
import PersonalCardList from './PersonalCardList';

const PlaygroundWrapper = styled.div`
`;

class Playground extends Component {
    componentWillMount() {
        const {
            handleIsOpeningLudoListPage,
            handleShouldLudoListUpdate
        } = this.props;
        handleIsOpeningLudoListPage(true);
        handleShouldLudoListUpdate(true);
    }

    componentWillUnmount() {
        const {
            handleIsOpeningLudoListPage,
            handleShouldLudoListUpdate
        } = this.props;
        handleIsOpeningLudoListPage(false);
        handleShouldLudoListUpdate(false);
    }

    render() {
        const {
            handlePersonalCardListClose,
            isPersonalCardListVisible
        } = this.props;
        return (
            <PlaygroundWrapper>
                <PersonalCardList
                    handlePersonalCardListClose={handlePersonalCardListClose}
                    isPersonalCardListVisible={isPersonalCardListVisible}
                />
                <CardList {...this.props} />
            </PlaygroundWrapper>
        );
    }
}

export default Playground;
