import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import axios from '../axios-config';
import { baseUrl } from '../baseurl-config';
import Button from '../components/Button';
import CardListContainer from '../containers/CardListContainer';
import CardListLoadingIcon from '../components/CardListLoadingIcon';
import {
    CardListWrapper,
    StyledLink,
    Tab,
    TabListWrapper,
} from '../baseStyle';

const filterInfoList = [
    {
        backgroundColor: '#029943',
        label: '等待加入',
        stage: 1,
    },
    {
        backgroundColor: '#f24150',
        label: '正在遊戲',
        stage: 2,
    },
    {
        backgroundColor: '#5d5d5d',
        label: '已經結束',
        stage: 3,
    },
    {
        backgroundColor: '#a31bbc',
        label: '模板系統',
        stage: 0,
    }
];

const tabList = [
    {
        label: '標題',
        searchFilter: 'title',
    },
    {
        label: '標籤',
        searchFilter: 'tag',
    },
];

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

// styled components
const ButtonWrapper = styled(StyledLink)`
    margin: 0 20px;
    @media (max-width: 768px) {
        margin: 0;
    }
`;

const CenteredCardListWrapper = CardListWrapper.extend`
    margin: 0 auto;
    text-align: center;
`;

const ClassificationTabLinkList = styled.div`
    display: inline-flex;
    justify-content: center;
    margin-bottom: 30px;
    text-align: center;
    width: 100%;

    @media (max-width: 768px) {
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 10px;
        width: 100vw;
    }
`;

const LoadingIconWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledMasonry = styled(Masonry)`
    margin: 0 auto;
`;

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearchStage: '1',
            isAtTemplateListPage: false,
            isCardListFetched: false,
            isLoadingCardList: false,
            queryKeyword: '',
            searchResult: [],
            search: 'default',
        };
        this.getStateAfterSearchConditionChange = this.getStateAfterSearchConditionChange.bind(this);
        this.getSearchResult = this.getSearchResult.bind(this);
    }

    componentDidMount() {
        if (this.props.search !== this.state.search) {
            const newSearch = this.props.search;
            const newState = this.getStateAfterSearchConditionChange(newSearch);
            this.setState(newState);
            this.getSearchResult(newSearch);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.search !== this.state.search &&
            nextProps.search !== this.props.search
        ) {
            const newSearch = nextProps.search;
            const newState = this.getStateAfterSearchConditionChange(newSearch);
            this.setState(newState);
            this.getSearchResult(newSearch);
        }
    }

    getStateAfterSearchConditionChange(newSearch) {
        return {
            currentSearchStage: String(newSearch.split(/stage=(\d+)&/g)[1]),
            isAtTemplateListPage: newSearch.includes('stage=0'),
            search: newSearch,
            queryKeyword: String(newSearch.split(/stage=(\d+)&(\S+)=(\S+)/g)[3]),
        };
    }

    getSearchResult(search) {
        this.setState({ isLoadingCardList: true });
        let apiUrl = '';
        if (search) {
            const query = search.split('?')[1];
            apiUrl = `/apis/ludo?${query}`;
        } else {
            apiUrl = `/apis/ludo?`;
        }
        axios.get(apiUrl)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    isCardListFetched: true,
                    isLoadingCardList: false,
                    searchResult: response.data.ludoList.Items,
                });
            } else {
                if (window.confirm('取得卡片列表資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('取得卡片列表資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    render() {
        const { searchFilter } = this.props;
        const {
            currentSearchStage,
            isAtTemplateListPage,
            isCardListFetched,
            isLoadingCardList,
            queryKeyword,
            searchResult,
        } = this.state;
        return (
            <Wrapper>
                <MediaQuery minWidth={769}>
                    <TabListWrapper>
                        {
                            tabList.map((tabInfo, index) => (
                                <StyledLink
                                    key={`search-result-tab-${index}`}
                                    to={`${baseUrl}/search?stage=${currentSearchStage}&${tabInfo.searchFilter}=${queryKeyword}`}
                                >
                                    <Tab selected={searchFilter === tabInfo.searchFilter}>
                                        {tabInfo.label}
                                    </Tab>
                                </StyledLink>
                            ))
                        }
                    </TabListWrapper>
                    <ClassificationTabLinkList>
                        {
                            filterInfoList.map((filterInfo, index) => (
                                <ButtonWrapper
                                    key={`search-filter-${index}`}
                                    to={`${baseUrl}/search?stage=${filterInfo.stage}&${searchFilter}=${queryKeyword}`}
                                >
                                    <Button
                                        backgroundColor={filterInfo.backgroundColor}
                                        fontSize="16px"
                                        label={filterInfo.label}
                                        padding="5px 0"
                                    />
                                </ButtonWrapper>
                            ))
                        }
                    </ClassificationTabLinkList>
                    <CenteredCardListWrapper>
                        <CardListLoadingIcon isLoadingCardList={isLoadingCardList} />
                        {
                            !isLoadingCardList && isCardListFetched ?
                                <StyledMasonry options={masonryOptions}>
                                    <CardListContainer
                                        emptyText="搜尋不到相關的結果"
                                        isAtTemplateListPage={isAtTemplateListPage}
                                        isCardListFetched={isCardListFetched}
                                        keyPrefix="search-result"
                                        ludoList={searchResult}
                                    />
                                </StyledMasonry>
                            : null
                        }
                    </CenteredCardListWrapper>
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <ClassificationTabLinkList>
                        {
                            filterInfoList.map((filterInfo, index) => (
                                <ButtonWrapper
                                    key={`search-filter-${index}`}
                                    to={`${baseUrl}/search?stage=${filterInfo.stage}&${searchFilter}=${queryKeyword}`}
                                >
                                    <Button
                                        backgroundColor={filterInfo.backgroundColor}
                                        fontSize="16px"
                                        label={filterInfo.label}
                                        padding="5px 0"
                                        margin="0"
                                        width="80px"
                                    />
                                </ButtonWrapper>
                            ))
                        }
                    </ClassificationTabLinkList>
                    <CenteredCardListWrapper>
                        <CardListLoadingIcon isLoadingCardList={isLoadingCardList} />
                        {
                            !isLoadingCardList && isCardListFetched ?
                                <StyledMasonry options={masonryOptions}>
                                    <CardListContainer
                                        emptyText="搜尋不到相關的結果"
                                        isAtTemplateListPage={isAtTemplateListPage}
                                        isCardListFetched={isCardListFetched}
                                        keyPrefix="search-result"
                                        ludoList={searchResult}
                                    />
                                </StyledMasonry>
                            : null
                        }
                    </CenteredCardListWrapper>
                </MediaQuery>
            </Wrapper>
        );
    }
}

export default Search;
