import React from 'react';
import { Radar } from 'react-chartjs-2';

export default class ProfileStatistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            radarData: {
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0],
                        fillColor: 'rgba(220,220,220,0.2)',
                        label: '有參與的Ludo',
                        pointColor: 'rgba(220,220,220,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        strokeColor: 'rgba(220,220,220,1)'
                    }
                ],
                labels: ['生活作息', '閱讀', '運動', '教科書', '新技能', '不可被提起', '其它']
            },
            willLudoIndex: 0,
            ludoingIndex: 1,
            didLudoIndex: 2,
            totalCategoryNumber: 7,
            isRadarChartDataLatest: false
        };
    }

    componentWillReceiveProps() {
        // console.log('ProfileContent componentWillReceiveProps userProfileData', this.props.userProfileData);  // debug
        const { isLoggedIn, userProfileData } = this.props;
        if(isLoggedIn && userProfileData.ludo_file && !this.state.isRadarChartDataLatest) {
            const { willLudoIndex, totalCategoryNumber } = this.state;
            // const { data } =  this.state.radarData.datasets[willLudoIndex];
            const { ludo_file } = userProfileData;
            const willLudoArray = [];
            for (let i = 1; i <= totalCategoryNumber; i++) {
                willLudoArray.push(ludo_file[i].total_ludo);
            }
            this.setState({
                radarData: {
                    datasets: [
                        Object.assign(this.state.radarData.datasets[willLudoIndex], {
                            data: willLudoArray
                        })
                    ]
                },
                isRadarChartDataLatest: true
            });
        }
    }

    render() {
        const { radarData } = this.state;
        return (
            <div className="profile-card">
                <div className="profile-card__title">{'統計資訊'}</div>
                <Radar data={radarData} />
            </div>
        );
    }
}

/* 
 * example of radar chart in chartjs documentation 
 */
// const data = {
//     labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
//     datasets: [
//         {
//             label: "My First dataset",
//             backgroundColor: "rgba(179,181,198,0.2)",
//             borderColor: "rgba(179,181,198,1)",
//             pointBackgroundColor: "rgba(179,181,198,1)",
//             pointBorderColor: "#fff",
//             pointHoverBackgroundColor: "#fff",
//             pointHoverBorderColor: "rgba(179,181,198,1)",
//             data: [65, 59, 90, 81, 56, 55, 40]
//         },
//         {
//             label: "My Second dataset",
//             backgroundColor: "rgba(255,99,132,0.2)",
//             borderColor: "rgba(255,99,132,1)",
//             pointBackgroundColor: "rgba(255,99,132,1)",
//             pointBorderColor: "#fff",
//             pointHoverBackgroundColor: "#fff",
//             pointHoverBorderColor: "rgba(255,99,132,1)",
//             data: [28, 48, 40, 19, 96, 27, 100]
//         }
//     ]
// };