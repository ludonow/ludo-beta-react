import React from "react";
import { Circle } from 'rc-progress';

export default class HeaderRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGotData: false,
            isHoverFinishRate: false,
            isHoverWinRate: false,
            roundSuccessRate: 0,
            roundWinRate: 0
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.success_rate && !this.state.hasGotData) {
            const roundWinRate = Number(nextProps.success_rate.toFixed(1));
            const roundSuccessRate = Number(nextProps.win_rate.toFixed(1));
            this.setState({
                hasGotData: true,
                roundSuccessRate,
                roundWinRate
            });

        }
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
        const { isHoverFinishRate, isHoverWinRate, roundSuccessRate, roundWinRate } = this.state;
        return (
            <div className="header-rate-container">
                <div className="header-rate" id="1" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <Circle 
                        className="header-circle-progress-bar"
                        percent={roundSuccessRate}
                        strokeWidth="18"
                        trailWidth="18"
                        strokeColor={roundSuccessRate > 0 ? `#f77417` : `#FF0000`}
                    />
                    { 
                        isHoverFinishRate
                        ? 
                            <span className="header-circle-progress-hint header-circle-progress-hint--text">
                                達成率
                            </span>
                        : 
                            <span className="header-circle-progress-hint header-circle-progress-hint--number">
                                {roundSuccessRate}%
                            </span>
                    }
                </div>
                <div className="header-rate" id="2" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                    <Circle 
                        className="header-circle-progress-bar"
                        percent={roundWinRate}
                        strokeWidth="18"
                        trailWidth="18"
                        strokeColor={roundWinRate > 0 ? `#8bc82a` : `#FF0000`}
                    />
                    { 
                        isHoverWinRate
                        ? 
                            <span className="header-circle-progress-hint header-circle-progress-hint--text">
                                勝率
                            </span>
                        : 
                            <span className="header-circle-progress-hint header-circle-progress-hint--number">
                                {roundWinRate}%
                            </span>
                    }
                </div>
            </div>
        );
    }
}