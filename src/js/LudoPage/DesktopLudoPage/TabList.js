import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledLink } from '../../baseStyle';
import { baseUrl } from '../../baseurl-config';

const tabList = [
    {
        label: '卡片內容',
        url: 'card-content',
    },
    {
        label: '雙人對戰',
        url: 'report-list',
    },
];

const Tab = styled.div`
    border-bottom: ${props => props.selected ? '1.5px solid #727272' : 'none'};
    color: ${props => props.selected ? '#727272' : 'white'};
    cursor: pointer;
    font-size: 15px;
    margin: 0 55px;
    padding: 5px 12.5px;

    &:hover {
        transition: all 0.2s ease-out;
        border-bottom: 1.5px solid #727272;
        color: #727272;
    }
`;

const TabListWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    margin: 20px 0 30px 0;
    width: 100%;
`;

const TabList = ({
    currentTab,
    baseUrlWithSubDomain,
}) => (
    <TabListWrapper>
        {
            tabList.map((tabInfo, index) => (
                <StyledLink
                    key={`ludo-info-tab-${index}`}
                    to={`${baseUrl}${baseUrlWithSubDomain}/${tabInfo.url}`}
                >
                    <Tab selected={currentTab === tabInfo.url}>
                        {tabInfo.label}
                    </Tab>
                </StyledLink>
            ))
        }
    </TabListWrapper>
);

TabList.propTypes = {
    baseUrlWithSubDomain: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
};

export const withTab = (WrappedComponent) => (
    props => (
        <div>
            <TabList
                baseUrlWithSubDomain={props.baseUrlWithSubDomain}
                currentTab={props.currentTab}
            />
            <WrappedComponent {...props} />
        </div>
    )
);