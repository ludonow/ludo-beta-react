import React from "react";
import Tooltip from 'material-ui/internal/Tooltip';

import fuelIcon from '../../../images/header/fuel.png';

export default class HeaderFuel extends React.Component {
    constructor() {
        super();
        this.state = {
            showTooltip: false
        };
        this.handleTooltipDisappear = this.handleTooltipDisappear.bind(this);
        this.handleTooltipShow = this.handleTooltipShow.bind(this);
    }

    handleTooltipDisappear() {
        this.setState({
            showTooltip: false
        });
    }

    handleTooltipShow() {
        this.setState({
            showTooltip: true
        });
    }

    render() {
        return (
            /* components/_header-fuel.scss */
            <div
                className="header-fuel"
                onMouseLeave={this.handleTooltipDisappear}
                onMouseOver={this.handleTooltipShow}
            >
                <img
                    className="header-fuel-icon"
                    src={fuelIcon}
                />
                <Tooltip
                    horizontalPosition="left"
                    label="燃料數"
                    show={this.state.showTooltip}
                    style={{fontSize: 12, right: 190, top: 40, zIndex: 5}}
                    touch
                    verticalPosition="bottom"
                />
                <div className="header-fuel-text">
                    {
                        this.props.heart ? 
                            `${this.props.heart} / 4`
                        : null
                    } 
                </div>
            </div>
        );
    }
}