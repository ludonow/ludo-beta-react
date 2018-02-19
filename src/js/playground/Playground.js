import React, { Component } from 'react';
import styled from 'styled-components';

import CardList from './CardList';
import PersonalCardList from './PersonalCardList';

const PlaygroundWrapper = styled.div`
`;

const Playground = (props) => (
    <PlaygroundWrapper>
        <PersonalCardList
            handlePersonalCardListClose={props.handlePersonalCardListClose}
            isPersonalCardListVisible={props.isPersonalCardListVisible}
        />
        <CardList {...props} />
    </PlaygroundWrapper>
);

export default Playground;
