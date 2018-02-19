import React, { Component } from 'react';
import styled from 'styled-components';

const CloseButton = styled.button`
    background-color: black;
`;

const PersonalCardListWrapper = styled.div`
    background-color: red;
    display: ${props => props.isPersonalCardListVisible ? 'block' : 'none'};
`;

class PersonalCardList extends Component {
    render() {
        const {
            handlePersonalCardListClose,
            isPersonalCardListVisible
        } = this.props;

        return (
            <PersonalCardListWrapper
                isPersonalCardListVisible={isPersonalCardListVisible}
            >
                PersonalCardList
                <CloseButton
                    onClick={handlePersonalCardListClose}
                />
            </PersonalCardListWrapper>
        );
    }
}

export default PersonalCardList;
