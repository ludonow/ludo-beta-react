import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

const masonryOptions = {
    itemSelector: ".grid-item--friend",
    columnWidth: 185,
    fitWidth: true
};

export default class Friend extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawFriendList: [],
            friendListWithCSS: []
        };
    }

    componentDidMount() {
        this.getFriendList();
    }

    getFriendList() {
        const _this = this;

        this.serverRequest = axios.get('data/FriendData.json')
            .then(function (response) {
                _this.setState({
                    rawFriendList: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });

        // this.state.friendList = this.props.data.map( (data, index) => {
        //     return (
        //         <div className="grid-item--friend" key={index}>
        //             <div className="friend-list__element">
        //                 <img className="friend-list__icon" src={data.value} />
        //             </div>
        //         </div>
        //     );
        // });
    }

    addClass() {
        this.state.friendListWithCSS = this.state.rawFriendList.map( (data, index) => {
            return (
                <div className="grid-item--friend" key={index}>
                    <div className="friend-list__element">
                        <img className="friend-list__icon" src={data.value} />
                    </div>
                </div>
            );
        });
    }

    render() {
        this.addClass();
        return (
            <Masonry
                className="grid"
                options={masonryOptions}>
                {this.state.friendListWithCSS}
            </Masonry>
        );
    }
}