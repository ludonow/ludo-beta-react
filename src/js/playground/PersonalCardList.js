import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import axios from '../axios-config';
import CardListContainer from '../containers/CardListContainer';
import UpDownToggleButton from '../components/UpDownToggleButton';
import { CardListWrapper } from '../baseStyle';

const masonryOptions = {
    columnWidth: 226,
    fitWidth: true,
    itemSelector: ".grid-item",
};

// styled components
const PersonalCardListWrapper = styled.div`
    border-bottom: 1px solid white;
    display: ${props => props.isPersonalCardListVisible ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
`;

const StyledCardListWrapper = CardListWrapper.extend`
    display: flex;
    justify-content: center;
`;

const TitleWrapper = styled.div`
    color: white;
    padding: 10px;
    text-align: center;
`;

const ToggleButtonWrapper = styled.div`
    margin: 30px auto;
`;

class PersonalCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalLudoList: [],
            search: 'dafault',
        };
        this.getPersonalLudoList = this.getPersonalLudoList.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search !== this.state.search) {
            this.setState({
                search: prevProps.search
            });
            this.getPersonalLudoList(prevProps.currentUserId, prevProps.search);
        }
    }

    getPersonalLudoList(currentUserId, search='') {
        let apiUrl = '';
        if (search) {
            const query = search.split('?')[1];
            apiUrl = `/apis/ludo?user_id=${currentUserId}&${query}`;
        } else {
            apiUrl = `/apis/ludo?user_id=${currentUserId}`;
        }
        axios.get(apiUrl)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    personalLudoList: response.data.ludoList.Items
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
            handlePersonalCardListClose,
            isPersonalCardListVisible,
        } = this.props;
        
        const {
            personalLudoList,
            search,
        } = this.state;

        const queryTarget = (search.includes('stage=0')) ? '模板' : '卡片';

        return (
            <PersonalCardListWrapper isPersonalCardListVisible={isPersonalCardListVisible}>
                <TitleWrapper>
                    我的{queryTarget}
                </TitleWrapper>
                <StyledCardListWrapper>
                    <Masonry options={masonryOptions}>
                        <CardListContainer
                            keyPrefix="personal-card"
                            ludoList={personalLudoList}
                            search={search}
                        />
                    </Masonry>
                </StyledCardListWrapper>
                <ToggleButtonWrapper>
                    <UpDownToggleButton
                        handleClick={handlePersonalCardListClose}
                        isArrowPointingDown={!isPersonalCardListVisible}
                    />
                </ToggleButtonWrapper>
            </PersonalCardListWrapper>
        );
    }
}

export default PersonalCardList;
