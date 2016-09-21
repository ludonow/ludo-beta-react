import React from 'react';
import axios from '../axios-config';

export default class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatar_photo: {},
            pie_chart_blue: {},
            pie_chart_red: {},
            pie_chart_yellow: {}
        };
        // this.getImages = this.getImages.bind(this);
    }

    componentDidMount() {
        // this.getImages();
    }

    getImages() {
    //     this.serverRequest = axios.get('data/ProfileContent.json')
    //         .then(response => {
    //             this.setState({
    //                 avatar_photo: response.data.avatar_photo,
    //                 pie_chart_blue: response.data.pie_chart_blue,
    //                 pie_chart_red: response.data.pie_chart_red,
    //                 pie_chart_yellow: response.data.pie_chart_yellow
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    }

    render() {
        const { avatar_photo, pie_chart_blue, pie_chart_red, pie_chart_yellow } = this.state;
        const { user } = this.props;
        return (
            <div className="profile-content">
                <div className="profile-content-information">
                    <div className="profile-content-information-avatar">
                        <img className="profile-content-information-avatar__photo" src={user.photo} />
                    </div>
                    <div className="profile-content-information-tag">
                        <div className="profile-content-information-tag__element">{user.name}</div>
                        <div className="profile-content-information-tag__element">birth</div>
                        <div className="profile-content-information-tag__element">language</div>
                        <div className="profile-content-information-tag__element">habit</div>
                    </div>
                </div>
                <div className="profile-content-detail">
                    <div className="profile-content-detail__element">Ludoing</div>
                    <div className="profile-content-detail__element">History</div>
                    <div className="profile-content-detail__element">Prize</div>
                    <div className="profile-content-detail__element">Statistic</div>
                    <div className="profile-content-detail__element--last">Show All</div>
                </div>
                <div className="profile-content-chart">
                    <div className="profile-content-chart__element"><img src={pie_chart_blue} /></div>
                    <div className="profile-content-chart__element"><img src={pie_chart_yellow} /></div>
                    <div className="profile-content-chart__element"><img src={pie_chart_red} /></div>
                </div>
            </div>
        );
    }
}
