import React from 'react';
import styled from 'styled-components';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import { grey700 } from 'material-ui/styles/colors';

/**
 * hacky usage of styled-component to use react-tap-event-plugin
 * ref: https://github.com/styled-components/styled-components/issues/527#issuecomment-281931998
 */
export const A = (props) => (
    <a {...props} />
);

const CancelIconPadding = `padding: 1px;`;

const CancelIconWrapper = styled(A)`
    ${CancelIconPadding}
`;

export const CancelIconPlaceHolder = styled.div`
    width: 15px;
    height: 15px;
    ${CancelIconPadding}
`;

export const CancelIconButton = ({ handleSearchingTextClear }) => (
    <CancelIconWrapper onTouchTap={handleSearchingTextClear}>
        <CancelIcon
            color={grey700}
            style={{height: '15px', width: '15px'}}
        />
    </CancelIconWrapper>
);

export const SearchBar = styled.div`
    background-color: #999999;
    border-radius: 50px;
    display: inline-flex;

    & > img {
        position: relative;
        padding: 5px 10px;
        width: 20px;
        height: 20px;
    }

    & input {
        width: 140px;
        border: none;
        outline: none;
        background-color: #999999;
        caret-color: white;
        color: white;
        font-size: 12px;
        font-family: "Microsoft JhengHei";
    }

    input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    input:focus::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;
