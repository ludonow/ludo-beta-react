import React from 'react';
import styled from 'styled-components';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingIconWrapper = styled.div`
    position: relative;
    margin-left: 70px;
    margin-right: 90px;
    text-align: center;
`;

// override material-ui
const loadingStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'relative'
};

const LoadingIcon = ({
    left,
    size,
    top
}) => (
    <LoadingIconWrapper>
        <RefreshIndicator
            left={left ? left : 10}
            size={size ? size : 40}
            status="loading"
            style={loadingStyle}
            top={top ? top : 0}
        />
    </LoadingIconWrapper>
);

export default LoadingIcon;
