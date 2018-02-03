import React from 'react';
import styled from 'styled-components';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';

import Button from '../../../components/Button';

import { CancelIconButton, CancelIconPlaceHolder, SearchBar } from './common';

const DesktopSearchBarWrapper = styled.div`
    display: flex;
    margin-left: 500px;
    padding: 10px 0;
    position: relative;
`;

const SearchBarLeftPlaceholder = styled.div`
    width: 30px;
    height: 30px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
`;

const DesktopSearchBar = ({
    handleSearchSubmitKeyUp,
    handleSearchingTextChange,
    handleSearchingTextClear,
    searchingText
}) => (
    <DesktopSearchBarWrapper>
        <SearchBar>
            <SearchBarLeftPlaceholder />
            <input
                autoFocus
                maxLength={50}
                onChange={handleSearchingTextChange}
                onKeyUp={handleSearchSubmitKeyUp}
                placeholder="搜尋"
                type="text"
                value={searchingText}
            />
            {
                searchingText ?
                    <CancelIconButton handleSearchingTextClear={handleSearchingTextClear} />
                :
                    <CancelIconPlaceHolder />
            }
        </SearchBar>
        {
            searchingText ?
            <Button
                backgroundColor="#999999"
                fontSize="12px"
                label="搜尋"
                margin="0 0 0 5px"
                padding="0"
                width="40px"
            />
            : null
        }
    </DesktopSearchBarWrapper>
);

export default DesktopSearchBar;
