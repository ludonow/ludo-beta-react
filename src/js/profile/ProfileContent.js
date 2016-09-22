import React from 'react';
import axios from '../axios-config';
import { Radar } from 'react-chartjs';

const data = {
    "datasets": [
        {
            "data": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
            "fillColor": "rgba(220,220,220,0.2)",
            "label": "My First dataset",
            "pointColor": "rgba(220,220,220,1)",
            "pointHighlightFill": "#fff",
            "pointHighlightStroke": "rgba(220,220,220,1)",
            "pointStrokeColor": "#fff",
            "strokeColor": "rgba(220,220,220,1)"
        }
    ],
    "labels": ["生活作息", "閱讀", "運動", "教科書", "新技能", "不可被提起", "其它"]
};

const radar_style = {
    width: 400,
    height: 200
};

export default class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatar_photo: {},
            pie_chart_blue: {},
            pie_chart_red: {},
            pie_chart_yellow: {}
        };
    }

    render() {
        const { avatar_photo, pie_chart_blue, pie_chart_red, pie_chart_yellow } = this.state;
        const { userProfileData } = this.props;
        return (
            <div className="profile-content">
                <div className="profile-content-information">
                    <div className="profile-content-information-avatar">
                        <img className="profile-content-information-avatar__photo" src={userProfileData.photo} />
                    </div>
                    <div className="profile-content-information-tag">
                        <div className="profile-content-information-tag__element">{userProfileData.name}</div>
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
                    <Radar style={radar_style} data={data} />
                    <div className="profile-content-chart__element"><img src={pie_chart_blue} /></div>
                    <div className="profile-content-chart__element"><img src={pie_chart_yellow} /></div>
                    <div className="profile-content-chart__element"><img src={pie_chart_red} /></div>
                </div>
            </div>
        );
    }
}
