import React, { Component } from 'react';

import ReportDate from './ReportDate';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

export default class MobileReportEditButton extends Component {
    constructor(props) {
        super(props);
        this.handleImageEditingTouchTap = this.handleImageEditingTouchTap.bind(this);
        this.handleTextEditingTouchTap = this.handleTextEditingTouchTap.bind(this);
    }

    handleImageEditingTouchTap(event) {
        event.preventDefault();
        this.props.handleIsEditingImage(true);
    }

    handleTextEditingTouchTap(event) {
        event.preventDefault();
        this.props.handleIsEditingText(true);
    }

    /* components/_single-report.scss */
    render() {
        const { handleReportDelete, reportObject } = this.props;
        return (
            <div>
                <div className="mobile-report-icon-button">
                    <IconButton
                        onTouchTap={this.props.handleReportEditButtonTouchTap}
                        tooltip="編輯"
                    >
                        <ModeEdit />
                    </IconButton>
                </div>
                <Popover
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    onRequestClose={this.props.onRequestClose}
                    open={this.props.isPopOverOfEditOpen}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem
                            disabled={!reportObject.content}
                            onTouchTap={this.handleTextEditingTouchTap}
                            primaryText="編輯文字回報"
                        />
                        <MenuItem
                            disabled={!reportObject.image_location}
                            onTouchTap={this.handleImageEditingTouchTap}
                            primaryText="編輯圖片回報"
                        />
                        <MenuItem
                            onTouchTap={handleReportDelete}
                            primaryText="刪除此回報"
                        />
                    </Menu>
                </Popover>
            </div>
        );
    }
}
