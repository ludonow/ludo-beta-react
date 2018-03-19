import React from 'react';
import { browserHistory } from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import axios from './axios-config';

// override material ui style
const style = {
    container: {
        alignItems: 'center',
        display: 'flex',
        height: 'calc(100vh - 100px)',
        justifyContent: 'center'
    },
    refresh: {
        backgroundColor: 'none',
        boxShadow: 'none',
        display: 'inline-block',
        position: 'relative'
    }
};

const RefreshIndicatorExampleLoading = () => (
    <div style={style.container}>
        <RefreshIndicator
            left={0}
            loadingColor="#FF9800"
            size={100}
            status="loading"
            style={style.refresh}
            top={0}
        />
    </div>
);

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { ludo_id } = this.props.params;
        const { temp_ludo_id } = this.props.params;
        const joinLudoPutbody = this.props.location.state;
        if (temp_ludo_id) {
            /* TODO ask pochun to create temp ludo */
            // axios.put(`/apis/ludo/temp/${temp_ludo_id}`, joinLudoPutbody)
            // .then(response => {
            //     if (response.data.status === '200') {
            //         /* TODO: Figure out how to use same url redirect to other component */
            //         browserHistory.push(`/ludo/${ludo_id}`);
            //     } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
            //         window.alert('你的燃料用完囉！');
            //         browserHistory.push(`/ludo/${ludo_id}`);
            //     } else {
            //         window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            //         console.error('OpenedBystanderForm join else response from server: ', response);
            //         console.error('OpenedBystanderForm join else message from server: ', response.data.message);
            //     }
            // })
            // .catch(error => {
            //     window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
            //     console.error('OpenedBystanderForm join put error', error);
            // });
        }
        if (ludo_id) {
            axios.put(`/apis/ludo/${ludo_id}`, joinLudoPutbody)
            .then(response => {
                if (response.data.status === '200') {
                    /* TODO: Figure out how to use same url redirect to other component */
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('你的燃料用完囉！');
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else {
                    if (window.confirm('加入Ludo卡片時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                }
            })
            .catch(error => {
                if (window.confirm('加入Ludo卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            });
        } else {
            // browserHistory.push('/cardList');
        }
    }

    render () {
        return (
            <RefreshIndicatorExampleLoading />
        );
    }
};