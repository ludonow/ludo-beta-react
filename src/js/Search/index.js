import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import axios from '../axios-config';
import Button from '../components/Button';
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper, StyledLink } from '../baseStyle';

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

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

// styled components
const ButtonWrapper = styled(StyledLink)`
    margin: 0 20px;
`;

const CenteredCardListWrapper = CardListWrapper.extend`
    margin: 0 auto;
`;

const ClassificationTabLinkList = styled.div`
    display: inline-flex;
    margin-bottom: 30px;
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
            searchResult: [],
            search: '',
            title: '',
        };
        this.getSearchResult = this.getSearchResult.bind(this);
    }

    componentDidMount() {
        if (this.props.search !== this.state.search) {
            const queryTitle = this.props.search.split('title=')[1];
            this.setState({
                search: this.props.search,
                title: queryTitle,
            });
            this.getSearchResult(this.props.search);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.search !== this.state.search &&
            nextProps.search !== this.props.search
        ) {
            const queryTitle = nextProps.search.split('title=')[1];
            this.setState({
                search: nextProps.search,
                title: queryTitle,
            });
            this.getSearchResult(nextProps.search);
        }
    }

    getSearchResult(search) {
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
                    searchResult: response.data.ludoList.Items
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
        const {
            searchResult,
            title,
        } = this.state;
        return (
            <Wrapper>
                <ClassificationTabLinkList>
                    {
                        filterInfoList.map(filterInfo => (
                            <ButtonWrapper to={`/search?stage=${filterInfo.stage}&title=${title}`}>
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
                    <Masonry options={masonryOptions}>
                        <CardListContainer
                            emptyText="搜尋不到相關的結果"
                            keyPrefix="search-result"
                            ludoList={searchResult}
                        />
                    </Masonry>
                </CenteredCardListWrapper>
            </Wrapper>
        );
    }
}

export default Search;
