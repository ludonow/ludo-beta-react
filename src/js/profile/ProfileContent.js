import React from 'react';
import axios from 'axios';
// import avatar_photo from '../../images/profile/profile-content/profile.png';
// import pie_chart_blue from '../../images/profile/profile-content/pie_chart_blue.png';
// import pie_chart_yellow from '../../images/profile/profile-content/pie_chart_yellow.png';
// import pie_chart_red from '../../images/profile/profile-content/pie_chart_red.png';

export default class ProfileContent extends React.Component {
    constructor() {
        super();
        this.state = { 
            avatar_photo: {},
            pie_chart_blue: {},
            pie_chart_red: {},
            pie_chart_yellow: {}
        }
    }

    componentDidMount() {
        this.getImages();
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }

    getImages() {
        const _this = this;

        this.serverRequest = axios.get('data/ProfileContent.json')
            .then(function (response) {
                _this.setState({
                    avatar_photo: response.data.avatar_photo,
                    pie_chart_blue: response.data.pie_chart_blue,
                    pie_chart_red: response.data.pie_chart_red,
                    pie_chart_yellow: response.data.pie_chart_yellow
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        const { avatar_photo, pie_chart_blue, pie_chart_red, pie_chart_yellow } = this.state;
        return (
            <div className="profile-content">
                <div className="profile-content-information">
                    <div className="profile-content-information-avatar">
                        <div className="profile-content-information-avatar__photo">
                            <img src={avatar_photo} />
                        </div>
                    </div>
                    <div className="profile-content-information-tag-div">
                        <div className="profile-content-information-tag">
                            <div className="profile-content-information-tag__element">name</div>
                            <div className="profile-content-information-tag__element">birth</div>
                            <div className="profile-content-information-tag__element">language</div>
                            <div className="profile-content-information-tag__element">habit</div>
                        </div>
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
