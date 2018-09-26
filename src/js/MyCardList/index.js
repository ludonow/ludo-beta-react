import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import axios from '../axios-config';
import { baseUrl } from '../baseurl-config';
import Button from '../components/Button';
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';
import CardListLoadingIcon from '../components/CardListLoadingIcon';

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

const tabLinkList = [
    {
        label: '等待加入',
        stage: 1,
    },
    {
        label: '正在遊戲',
        stage: 2,
    },
    {
        label: '已經結束',
        stage: 3,
    },
    {
        label: '我的模板',
        stage: 0,
    }
];

// styled components
const StyledCardListWrapper = CardListWrapper.extend`
    display: flex;
    justify-content: center;
`;

const StyledMasonry = styled(Masonry)`
    margin-bottom: 50px;
`;

const StyledLink = styled(Link)`
    color: grey;
    font-weight: bold;
    text-decoration: none;
`;

const StyledTab = styled.div`
    font-size: 16px;
    margin: 0 12px;
    padding: 0 8px 5px 8px;

    @media (max-width: 768px) {
        margin: 0;
        padding: 5px 0;
        width: 25%;
    }
`;

const StyledSelectedTab = StyledTab.extend`
    border-bottom: 1.5px solid grey;
    color: grey;
    font-weight:bold;
`;

const StyledTabList = styled.div`
    display: inline-flex;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        text-align: center;
        width: 100vw;
    }
`;

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

class MyCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAtTemplateListPage: false,
            isCardListFetched: false,
            isLoadingCardList: false,
            ludoList: [],
            search: 'dafault',
            tabIndex: 0,
        };
        this.getIsAtTemplatePage = this.getIsAtTemplatePage.bind(this);
        this.getMyCardList = this.getMyCardList.bind(this);
        this.getTabIndex = this.getTabIndex.bind(this);
        this.handleDownloadReportClick = this.handleDownloadReportClick.bind(this);
    }

    componentDidMount() {
        if (this.props.search) {
            this.setState({
                isAtTemplateListPage: this.getIsAtTemplatePage(this.props.search),
                search: this.props.search,
                tabIndex: this.getTabIndex(this.props.search),
            });
            this.getMyCardList(this.props.search);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.search !== this.state.search &&
            nextProps.search !== this.props.search
        ) {
            this.setState({
                isAtTemplateListPage: this.getIsAtTemplatePage(nextProps.search),
                search: nextProps.search,
                tabIndex: this.getTabIndex(nextProps.search),
            });
            this.getMyCardList(nextProps.search);
        }
    }

    getIsAtTemplatePage(search) {
        return search.includes('stage=0');
    }

    getMyCardList(search) {
        this.setState({
            isLoadingCardList: true,
        });
        const query = search.split('?')[1];
        const apiUrl = `/apis/ludo?${query}`;
        axios.get(apiUrl)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    isCardListFetched: true,
                    isLoadingCardList: false,
                    ludoList: response.data.ludoList.Items,
                });
            } else {
                if (window.confirm('取得我的卡片列表資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('取得我的卡片列表資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    getTabIndex(search) {
        switch (true) {
            case search.includes('stage=0'):
                return 3;
            case search.includes('stage=3'):
                return 2;
            case search.includes('stage=2'):
                return 1;
            case search.includes('stage=1'):
            default:
                return 0;
        }
    }

    handleDownloadReportClick(event) {
        event.preventDefault();
    }

    render() {
        const {
            currentUserId,
        } = this.props;

        const {
            isAtTemplateListPage,
            isCardListFetched,
            isLoadingCardList,
            ludoList,
            search,
            tabIndex,
        } = this.state;

        return (
            <Wrapper>
                <StyledTabList>
                    {
                        tabLinkList.map((tabLink, index) => {
                            if (index === tabIndex) {
                                return (
                                    <StyledSelectedTab
                                        key={`tab-link-${index}`}
                                    >
                                        {tabLink.label}
                                    </StyledSelectedTab>
                                )
                            } else {
                                return (
                                    <StyledTab
                                        key={`tab-link-${index}`}
                                    >
                                        <StyledLink to={`${baseUrl}/myCardList?stage=${tabLink.stage}&user_id=${currentUserId}`}>
                                            {tabLink.label}
                                        </StyledLink>
                                    </StyledTab>
                                )
                            }
                        })
                    }
                </StyledTabList>
                <StyledCardListWrapper>
                    <CardListLoadingIcon isLoadingCardList={isLoadingCardList} />
                    {
                        !isLoadingCardList && isCardListFetched ?
                            <StyledMasonry options={masonryOptions}>
                                <CardListContainer
                                    isAtTemplateListPage={isAtTemplateListPage}
                                    isCardListFetched={isCardListFetched}
                                    keyPrefix="my-card"
                                    ludoList={ludoList}
                                    search={search}
                                />
                            </StyledMasonry>
                        : null
                    }
                </StyledCardListWrapper>
            </Wrapper>
        );
    }
}
/*
    <Button
        backgroundColor="#585858"
        fontSize="14px"
        label="下載數據報告"
        margin="20px 0"
        padding="5px 0"
        onClick={this.handleDownloadReportClick}
    >
    </Button> 
*/

export default MyCardList;
