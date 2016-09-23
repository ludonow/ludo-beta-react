import React from "react";
import { Circle } from 'rc-progress';

export default class HeaderRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHoverFinishRate: false,
            isHoverWinRate: false
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }   

    handleMouseOver(event) {
        if (event.currentTarget.id == 1) {
            this.setState({
                isHoverFinishRate: true
            });
        } 
        if (event.currentTarget.id == 2) {
            this.setState({
                isHoverWinRate: true
            });
        }
    }

    handleMouseLeave(event) {
        if (event.currentTarget.id == 1) {
            this.setState({
                isHoverFinishRate: false
            });
        } 
        if (event.currentTarget.id == 2) {
            this.setState({
                isHoverWinRate: false
            });
        }
    }

    render() {
        const { isHoverFinishRate, isHoverWinRate } = this.state;
        return (
            <div className="header-rate-container">
                <div className="header-rate" id="1" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <Circle 
                        className="header-circle-progress-bar"
                        percent={this.props.success_rate}
                        strokeWidth="18"
                        trailWidth="18"
                        strokeColor="#f77417"
                    />
                    { 
                        isHoverFinishRate
                        ? 
                            <span className="header-circle-progress-hint header-circle-progress-hint--text">
                                達成率
                            </span>
                        : 
                            <span className="header-circle-progress-hint header-circle-progress-hint--number">
                                {this.props.success_rate}%
                            </span>
                    }
                </div>
                <div className="header-rate" id="2" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <Circle 
                        className="header-circle-progress-bar"
                        percent={this.props.win_rate}
                        strokeWidth="18"
                        trailWidth="18"
                        strokeColor="#8bc82a"
                    />
                    { 
                        isHoverWinRate
                        ? 
                            <span className="header-circle-progress-hint header-circle-progress-hint--text">
                                勝率
                            </span>
                        : 
                            <span className="header-circle-progress-hint header-circle-progress-hint--number">
                                {this.props.win_rate}%
                            </span>
                    }
                </div>
            </div>
        );
    }
}