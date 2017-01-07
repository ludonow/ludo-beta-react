import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

export default class ReportEditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { index, isEditingWhichReportIndex, reportList, whichList } = this.props;
        return (
            <div>
                {/* components/_single-report.scss */}
                <div className="report-icon-button">
                    <IconButton
                        id={`${whichList}-report-expand-more-${index}`}
                        onTouchTap={this.props.handleReportExpandMoreButtonTouchTap}
                        tooltip="更多"
                    >
                        <ExpandMore />
                    </IconButton>
                </div>
                {
                    reportList[isEditingWhichReportIndex] ? 
                        <Popover
                            anchorEl={this.props.anchorEl}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            onRequestClose={this.props.onRequestClose}
                            open={this.props.isPopOverOfExpandMoreOpen}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <Menu>
                                <MenuItem
                                    id={`${whichList}-report-denounce-${isEditingWhichReportIndex}`}
                                    innerDivStyle={style}
                                    onTouchTap={this.props.handleReportDenounce}
                                    primaryText="檢舉此回報"
                                />
                            </Menu>
                        </Popover>
                    : null
                }
            </div>
        );
    }
}