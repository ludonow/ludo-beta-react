import React from 'react';
import { browserHistory } from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import axios from './axios-config';

const style = {
    container: {
      position: 'absolute',
      top: "100px",
      left: "40%",
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none',
      backgroundColor: 'none',
    },
  };
  
const RefreshIndicatorExampleLoading = () => (
    <div style={style.container}>
        <RefreshIndicator
        size={100}
        left={0}
        top={0}
        loadingColor="#FF9800"
        status="loading"
        style={style.refresh}
        />
    </div>
);
export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount () {
        const { ludo_id } = this.props.params;
        const { temp_ludo_id } = this.props.params;
        const joinLudoPutbody = this.props.location.state;
        // console.log(ludo_id);
        // console.log(joinLudoPutbody);
        if (temp_ludo_id) {
            console.log("跳轉頁面"+temp_ludo_id)
            /* TODO ask pochun to create temp luod  */
            // axios.put(`/apis/ludo/temp/${temp_ludo_id}`, joinLudoPutbody)
            // .then(response => {
            //     if (response.data.status === '200') {
            //         console.log("join succeed");
            //         /* TODO: Figure out how to use same url redirect to other component */
            //         browserHistory.push(`/ludo/${ludo_id}`);
            //     } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
            //         window.alert('你的燃料用完囉！');
            //         browserHistory.push(`/ludo/${ludo_id}`);
            //     } else {
            //         console.log(response.data);
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
        if(ludo_id) {
            axios.put(`/apis/ludo/${ludo_id}`, joinLudoPutbody)
            .then(response => {
                if (response.data.status === '200') {
                    console.log("join succeed");
                    /* TODO: Figure out how to use same url redirect to other component */
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('你的燃料用完囉！');
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else {
                    console.log(response.data);
                    window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('OpenedBystanderForm join else response from server: ', response);
                    console.error('OpenedBystanderForm join else message from server: ', response.data.message);
                }
            })
            .catch(error => {
                window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('OpenedBystanderForm join put error', error);
            });
        } else {
            console.log("no ludo id")
            // browserHistory.push(`/`);
        }
    }
    
    render () {
        return (
            <RefreshIndicatorExampleLoading/>
        )
      }
};