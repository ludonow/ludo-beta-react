import React, { Component } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import axios from '../axios-config'
import CardListContainer from '../containers/CardListContainer';
import { CardListWrapper } from '../baseStyle';

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

// styled components
const Wrapper = styled(CardListWrapper)`
    display: flex;
    justify-content: center;
`;

class MyCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ludoList: [],
            search: 'dafault',
        };
        this.getMyCardList = this.getMyCardList.bind(this);
    }

    componentDidMount() {
        if (this.props.search) {
            this.setState({
                search: this.props.search,
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
                search: nextProps.search,
            });
            this.getMyCardList(nextProps.search);
        }
    }

    getMyCardList(search) {
        const query = search.split('?')[1];
        const apiUrl = `/apis/ludo?${query}`;
        axios.get(apiUrl)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    ludoList: response.data.ludoList.Items
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

    render() {
        const {
            ludoList,
            search,
        } = this.state;

        return (
            <Wrapper>
                <Masonry options={masonryOptions}>
                    <CardListContainer
                        keyPrefix="my-card"
                        ludoList={ludoList}
                        search={search}
                    />
                </Masonry>
            </Wrapper>
        );
    }
}

export default MyCardList;
