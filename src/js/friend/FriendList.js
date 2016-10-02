import React from 'react';
import Masonry from 'react-masonry-component';
// import axios from '../axios-config';
// import config from '../axios-fakedata-config';

const masonryOptions = {
    itemSelector: ".grid-item--friend",
    columnWidth: 185,
    fitWidth: true
};

export default class Friend extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawFriendList: []
        };
    }

    componentDidMount() {
        // this.getFriendList();
    }

    getFriendList() {
        // this.serverRequest = config.get('data/FriendData.json')
        //     .then(response => {
        //         this.setState({
        //             rawFriendList: response.data
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

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

    render() {
        this.addClass();
        return (
            <Masonry
                className="grid"
                options={masonryOptions}>
                {
                    this.state.rawFriendList.map( (data, index) => {
                        return (
                            <div className="grid-item--friend" key={index}>
                                <div className="friend-list__element">
                                    <img className="friend-list__icon" src={data.value} />
                                </div>
                            </div>
                        );
                    })
                }
            </Masonry>
        );
    }
}