import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    StyledLink,
    Tab,
    TabListWrapper,
} from '../../baseStyle';
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
