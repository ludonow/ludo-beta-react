import React from 'react';
import styled from 'styled-components';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';

import Button from '../../../components/Button';

import { CancelIconButton, CancelIconPlaceHolder, SearchBar } from './common';

const ButtonPlaceholder = styled.div`
    margin-left: 5px;
    width: 40px;
`;

const DesktopSearchBarWrapper = styled.div`
    display: inline-flex;
    padding: 10px 0;
`;

const SearchBarLeftPlaceholder = styled.div`
    width: 20px;
    height: 20px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
`;

const DesktopSearchBar = ({
    handleSearchSubmitKeyUp,
    handleSearchSubmitTouchTap,
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
                onClick={handleSearchSubmitTouchTap}
                padding="0"
                width="40px"
            />
            : <ButtonPlaceholder />
        }
    </DesktopSearchBarWrapper>
);

export default DesktopSearchBar;
