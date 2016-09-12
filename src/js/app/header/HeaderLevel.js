import React from "react";
// import axios from 'axios';
import config from '../../axios-config';

export default class HeaderLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            level: 0
        };
    }

    componentDidMount() {
        this.getLevel();
    }

    getLevel() {
        const _this = this;

        this.serverRequest = config.get('data/LevelData.json')
            .then(function (response) {
                _this.setState({
                    level: response.data.value
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return ( 
            <div className="header-level">
                <div className="header-level-number">
                    {this.state.level}
                </div>
                <div className="header-level-text">
                    LEVEL
                </div>
            </div>
        );
    }
};