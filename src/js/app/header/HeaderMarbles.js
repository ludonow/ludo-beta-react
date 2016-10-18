import React from 'react';
import Tooltip from 'material-ui/internal/Tooltip';

import marblesIcon from '../../../images/header/marbles.png';

export default class HeaderMarbles extends React.Component {
    constructor(props) {
        super(props);
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
            <div
                className="header-marbles"
                onMouseLeave={this.handleTooltipDisappear}
                onMouseOver={this.handleTooltipShow}
            >
                <img
                    className="header-marbles__icon"
                    src={marblesIcon}
                />
                <Tooltip
                    horizontalPosition="left"
                    label="彈珠數"
                    show={this.state.showTooltip}
                    style={{fontSize: 12, right: 250, top: 40, zIndex: 5}}
                    touch
                    verticalPosition="bottom"
                />
                <div className="header-marbles__number">
                    {this.props.marbles}
                </div>
            </div>
        );
    }
}