import React from "react";
import axios from '../../axios-config';

export default class HeaderLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            level: 0
        };
        this.getLevel = this.getLevel.bind(this);
    }

    // componentDidMount() {
    //     this.getLevel();
    // }

    getLevel() {
        axios.get('data/LevelData.json')
        .then(response => {
            this.setState({
                level: response.data.value
            });
        })
        .catch(error => {
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