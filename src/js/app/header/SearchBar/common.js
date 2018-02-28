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

const CancelIconPadding = `
    padding-right: 3px;
    padding-top: 1px;
`;

const CancelIconButtonWrapper = styled(A)`
    ${CancelIconPadding}
`;

const CancelIconWrapper = styled.div`
    padding-top: ${props => props.isMoblie ? '2px': '0'};
`;

export const CancelIconPlaceHolder = styled.div`
    ${CancelIconPadding}
    height: ${props => props.height ? props.height: '15px'};
    width: ${props => props.width ? props.width: '15px'};
`;

export const CancelIconButton = ({
    handleSearchingTextClear,
    height,
    isMobile,
    width,
}) => (
    <CancelIconButtonWrapper onTouchTap={handleSearchingTextClear}>
        <CancelIconWrapper isMobile={isMobile}>
            <CancelIcon
                color={grey700}
                style={{height, width}}
            />
        </CancelIconWrapper>
    </CancelIconButtonWrapper>
);

CancelIconButton.defaultProps = {
    height: '15px',
    width: '15px',
};

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
        font-size: ${props => props.isMobile ? '16px' : '12px'};
        font-family: "Exo", "Microsoft JhengHei";
    }

    input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    input:focus::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;
