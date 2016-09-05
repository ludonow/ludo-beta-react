import React from "react";

export default class HeaderRate extends React.Component {
    getFinishRate() {
        return (
            <div className="header-finish-rate">
                <svg width="50px" height="90%">
                    <circle 
                        className="header-rate__circle header-finish-rate__circle" 
                        cx="50%" cy="50%" r="18px" strokeDasharray="251.33" strokeDashoffset="0">
                    </circle>
                    <text className="header-finish-rate__text" x="15%" y="45%"></text>
                    <text className="header-rate__number header-finish-rate__number" x="30%" y="66%"></text>
                </svg>
            </div>
        );
    }

    getWinRate() {
        return (
            <div className="header-win-rate">
                <svg width="60px" height="90%">
                    <circle 
                        className="header-rate__circle header-win-rate__circle" 
                        cx="50%" cy="50%" r="18px" strokeDasharray="251.33" strokeDashoffset="0">
                    </circle>
                    <text className="header-win-rate__text" x="32%" y="45%"></text>
                    <text className="header-rate__number header-win-rate__number" x="30%" y="66%"></text>
                </svg>
            </div>
        );
    }

    render() {
        return (
            <div className="header-rate">
                {this.getFinishRate()}
                {this.getWinRate()}
            </div>
        );
    }
}