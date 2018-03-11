import React from 'react';
import styled from 'styled-components';

import LoadingIcon from '../../images/loading.svg';

const LoadingIconWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const CardListLoadingIcon = ({
    isLoadingCardList,
}) => (
    <div>
        {
            isLoadingCardList ?
                <LoadingIconWrapper>
                    <img src={LoadingIcon} />
                </LoadingIconWrapper>
            : null
        }
    </div>
);

export default CardListLoadingIcon;
