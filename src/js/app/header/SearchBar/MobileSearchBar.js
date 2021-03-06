import React from 'react';
import styled from 'styled-components';
import magnifierIcon from '../../../../images/magnifier.svg';

import { CancelIconButton, CancelIconPlaceHolder, SearchBar } from './common';

const MobileSearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 20px 0;
`;

const MobileSearchBar = ({
    handleSearchSubmitKeyUp,
    handleSearchingTextChange,
    handleSearchingTextClear,
    searchingText
}) => (
    <MobileSearchBarWrapper>
        <SearchBar isMobile={true}>
            <img src={magnifierIcon} />
            <input
                autoFocus
                maxLength={50}
                onChange={handleSearchingTextChange}
                onKeyUp={handleSearchSubmitKeyUp}
                type="text"
                value={searchingText}
            />
            {
                searchingText ?
                    <CancelIconButton
                        handleSearchingTextClear={handleSearchingTextClear}
                        height="25px"
                        isMobile={true}
                        width="25px"
                    />
                :
                    <CancelIconPlaceHolder
                        height="25px"
                        width="25px"
                    />
            }
        </SearchBar>
    </MobileSearchBarWrapper>
);

export default MobileSearchBar;
