import React from 'react';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';
import axios from 'axios';

// import ActiveForm from './ActiveFormOfByStander';
import ActiveForm from './ActiveFormOfPlayer';

const masonryOptions = {
    itemSelector: ".grid-item--ludo-report-information",
    columnWidth: 220,
    fitWidth: true,
    stamp: ".grid-item--ludo-detail-information"
};

export default class ActiveLudoList extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        this.getLudoReportInformation();
    }

    getLudoReportInformation() {
        const _this = this;

        // this.serverRequest = axios.get('/apis/ludo?stage=1')
        //     .then(function (response) {
        //         _this.setState({
        //             rawCardContent: response.data.ludoList.Items
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // this.serverRequest = axios.get('data/LudoData.json')
        //     .then(function (response) {
        //         _this.setState({
        //             rawCardContent: response.data
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
    }

    render() {
        return (
            <Masonry
                className="grid"
                options={masonryOptions} >
                <ActiveForm />
                <div className="ludo-report-infromation-container grid-item--ludo-report-information">
                    <div className="card player-container">
                        <div className="player-photo-container">
                            <div className="player-photo-container__photo">
                                player1 photo
                            </div>
                        </div>
                        <div> Report</div>
                    </div>
                </div>
                <div className="ludo-report-infromation-container grid-item--ludo-report-information">
                    <div className="card player-container">
                        <div>player2 photo</div>
                        <div>Report</div>
                    </div>
                </div>
            </Masonry>
        );
    }
}