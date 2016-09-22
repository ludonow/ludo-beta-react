import React from 'react';
import axios from '../axios-config';

export default class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { 
        //     radarData: {
        //         datasets: [
        //             {
        //                 data: [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
        //                 fillColor: "rgba(220,220,220,0.2)",
        //                 label: "有參與的Ludo",
        //                 pointColor: "rgba(220,220,220,1)",
        //                 pointHighlightFill: "#fff",
        //                 pointHighlightStroke: "rgba(220,220,220,1)",
        //                 pointStrokeColor: "#fff",
        //                 strokeColor: "rgba(220,220,220,1)"
        //             }
        //         ],
        //         labels: ["生活作息", "閱讀", "運動", "教科書", "新技能", "不可被提起", "其它"]
        //     },
        //     willLudoIndex: 0,
        //     ludoingIndex: 1,
        //     didLudoIndex: 2,
        //     totalCategoryNumber: 7,
        //     isRadarChartDataLatest: false
        // };
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log('ProfileContent componentWillReceiveProps userProfileData', this.props.userProfileData);  // debug
    //     const { isLoggedIn, shouldProfileUpdate, userProfileData } = this.props;
    //     if(isLoggedIn && userProfileData.ludo_file && !this.state.isRadarChartDataLatest) {
    //         const { willLudoIndex, ludoingIndex, didLudoIndex, totalCategoryNumber } = this.state;
    //         // const { data } =  this.state.radarData.datasets[willLudoIndex];
    //         const { ludo_file } = userProfileData;
    //         const willLudoArray = [];
    //         for (let i = 1; i <= totalCategoryNumber; i++) {
    //             willLudoArray.push(ludo_file[i].total_ludo)
    //         }
    //         this.setState({
    //             radarData: {
    //                 datasets: [
    //                     Object.assign(this.state.radarData.datasets[willLudoIndex], {
    //                         data: willLudoArray
    //                     })
    //                 ]
    //             },
    //             isRadarChartDataLatest: true
    //         });
    //     }
    // }

    render() {
        // const { radarData } = this.state;
        const { userProfileData } = this.props;
        return (
            <div className="profile-content">
                <div className="profile-content-information">
                    <div className="profile-content-information-avatar">
                        <img className="profile-content-information-avatar__photo" src={userProfileData.photo} />
                    </div>
                    <div className="profile-content-information-tag">
                        <div className="profile-content-information-tag__element">{userProfileData.name}</div>
                        <div className="profile-content-information-tag__element">生日</div>
                        <div className="profile-content-information-tag__element">語言</div>
                        <div className="profile-content-information-tag__element">習慣</div>
                    </div>
                </div>
                <div className="profile-content-detail">
                    <div className="profile-content-detail__element">等待他人加入的Ludo</div>
                    <div className="profile-content-detail__element">正在進行的Ludo</div>
                    <div className="profile-content-detail__element">之前參與的Ludo</div>
                    <div className="profile-content-detail__element">成就</div>
                    <div className="profile-content-detail__element">統計資訊</div>
                    <div className="profile-content-detail__element--last">顯示全部</div>
                </div>
                <div className="profile-content-chart">
                </div>
            </div>
                    // <div className="profile-content-chart__element"><img src={pie_chart_blue} /></div>
                    // <div className="profile-content-chart__element"><img src={pie_chart_yellow} /></div>
                    // <div className="profile-content-chart__element"><img src={pie_chart_red} /></div>
        );
    }
}
